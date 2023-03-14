import { IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage";
import { CoroutineLockType } from "../../../../client/assets/Bundles/Code/Logic/Module/CoroutineLock/CoroutineLockType";
import { CoroutineLock } from "../../../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { TimerComponent } from "../../../../client/assets/Scripts/Core/Timer/TimerComponent";
import { ActorHelper } from "../Actor/ActorHelper";
import { ActorMessageSenderComponent } from "../Actor/ActorMessageSenderComponent";
import { ActorLocationSender } from "./ActorLocationSender";
import { LocationProxyComponent } from "./LocationProxyComponent";

export class ActorLocationSenderComponent extends Entity {
    public static inst: ActorLocationSenderComponent
    public TIMEOUT_TIME = 60 * 1000;
    public CheckTimer: number;

    awake() {
        ActorLocationSenderComponent.inst = this

        this.CheckTimer = TimerComponent.inst.NewRepeatedTimer(10 * 1000, this.Check.bind(this));
    }

    destroy(): void {
        ActorLocationSenderComponent.inst = null
        TimerComponent.inst?.Remove(this.CheckTimer);
    }

    public Check() {
        let list: number[] = []

        let timeNow = TimeHelper.serverNow();

        for (let [key, value] of this.children) {
            let actorLocationMessageSender = value as ActorLocationSender;

            if (timeNow > actorLocationMessageSender.LastSendOrRecvTime + this.TIMEOUT_TIME) {
                list.push(key);
            }
        }

        for (let id of list) {
            this.Remove(id);
        }
    }

    private GetOrCreate(id: number): ActorLocationSender {
        if (id == 0) {
            throw new Error("actor id is 0");
        }

        let actorLocationSender = this.children.get(id)
        if (actorLocationSender) {
            return actorLocationSender as ActorLocationSender;
        }

        actorLocationSender = this.addChildWithId(ActorLocationSender, id);
        return actorLocationSender as ActorLocationSender;
    }

    private Remove(id: number) {
        let actorMessageSender = this.children.get(id)
        if (!actorMessageSender) {
            return;
        }

        actorMessageSender.dispose();
    }

    public Send(entityId: number, message: IActorRequest) {
        this.Call(entityId, message)
    }

    public async Call(entityId: number, iActorRequest: IActorRequest): Promise<IActorResponse> {
        let actorLocationSender = this.GetOrCreate(entityId);

        // 先序列化好
        let rpcId = ActorMessageSenderComponent.inst.GetRpcId();
        iActorRequest.RpcId = rpcId;

        let actorLocationSenderInstanceId = actorLocationSender.instanceId;

        let lock = await CoroutineLock.inst.wait(CoroutineLockType.ActorLocationSender, entityId.toString())

        if (actorLocationSender.instanceId != actorLocationSenderInstanceId) {
            throw new Error(`actor timeout${ErrorCore.ERR_ActorTimeout}`);
        }

        // 队列中没处理的消息返回跟上个消息一样的报错
        if (actorLocationSender.Error == ErrorCore.ERR_NotFoundActor) {
            return ActorHelper.CreateResponse(iActorRequest, actorLocationSender.Error);
        }

        try {
            let callResult = await this.CallInner(actorLocationSender, rpcId, iActorRequest);
            lock.dispose()
            return callResult
        }
        catch (e) {
            this.Remove(actorLocationSender.id);
            throw new Error(e);
        }
    }

    private async CallInner(actorLocationSender: ActorLocationSender, rpcId: number, iActorRequest: IActorRequest): Promise<IActorResponse> {
        let failTimes = 0;
        let instanceId = actorLocationSender.instanceId;
        actorLocationSender.LastSendOrRecvTime = TimeHelper.serverNow();

        while (true) {
            if (actorLocationSender.ActorId == 0) {
                actorLocationSender.ActorId = await LocationProxyComponent.inst.Get(actorLocationSender.id);
                if (actorLocationSender.instanceId != instanceId) {
                    throw new Error(`ErrorCore.ERR_ActorLocationSenderTimeout2`);
                }
            }

            if (actorLocationSender.ActorId == 0) {
                actorLocationSender.Error = ErrorCore.ERR_NotFoundActor;
                return ActorHelper.CreateResponse(iActorRequest, ErrorCore.ERR_NotFoundActor);
            }
            let response = await ActorMessageSenderComponent.inst.CallWithRpcId(actorLocationSender.ActorId, rpcId, iActorRequest, false);
            if (actorLocationSender.instanceId != instanceId) {
                throw new Error(`ErrorCore.ERR_ActorLocationSenderTimeout3`);
            }

            switch (response.Error) {
                case ErrorCore.ERR_NotFoundActor: {
                    // 如果没找到Actor,重试
                    ++failTimes;
                    if (failTimes > 20) {
                        ctLog(`actor send message fail, actorid: ${actorLocationSender.id}`);
                        actorLocationSender.Error = ErrorCore.ERR_NotFoundActor;
                        // 这里不能删除actor，要让后面等待发送的消息也返回ERR_NotFoundActor，直到超时删除
                        return response;
                    }

                    // 等待0.5s再发送
                    await TimerComponent.inst.WaitAsync(500);
                    if (actorLocationSender.instanceId != instanceId) {
                        throw new Error(`ErrorCore.ERR_ActorLocationSenderTimeout4`);
                    }

                    actorLocationSender.ActorId = 0;
                    continue;
                }
                case ErrorCore.ERR_ActorTimeout:
                    {
                        throw new Error(`ErrorCore.ERR_ActorTimeout`);
                    }
            }

            if (ErrorCore.IsRpcNeedThrowException(response.Error)) {
                throw new Error(`${response.Error}`);
            }

            return response;
        }
    }
}