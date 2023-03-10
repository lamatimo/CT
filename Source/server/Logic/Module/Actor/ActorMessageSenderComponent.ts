import { IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage";
import { IMessage } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { ctError, ctLog, ctWarn } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { Options } from "../../../../client/assets/Scripts/Core/Options/Options";
import { Task } from "../../../../client/assets/Scripts/Core/Task/Task";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { TimerComponent } from "../../../../client/assets/Scripts/Core/Timer/TimerComponent";
import { NetInnerComponent, ProcessActorId } from "../Message/NetInnerComponent";
import { ActorHelper } from "./ActorHelper";
import { ActorMessageSender } from "./ActorMessageSender";

export class ActorMessageSenderComponent extends Entity {
    public readonly TIMEOUT_TIME = 40 * 1000;

    public static inst: ActorMessageSenderComponent

    public RpcId: number = 1;

    public readonly requestCallback: Map<number, ActorMessageSender> = new Map

    public TimeoutCheckTimer: number;

    public TimeoutActorMessageSenders: Array<number> = new Array;

    awake(): void {
        ActorMessageSenderComponent.inst = this
        this.TimeoutCheckTimer = TimerComponent.inst.NewRepeatedTimer(1000, this.Check.bind(this));
    }

    destroy(): void {
        TimerComponent.inst?.Remove(this.TimeoutCheckTimer);
        this.TimeoutCheckTimer = 0;
        this.TimeoutActorMessageSenders = [];
        ActorMessageSenderComponent.inst = null
    }

    private Check() {
        let timeNow = TimeHelper.serverNow();

        for (let [key, value] of this.requestCallback) {
            // 因为是顺序发送的，所以，检测到第一个不超时的就退出
            if (timeNow < value.CreateTime + this.TIMEOUT_TIME) {
                break;
            }

            this.TimeoutActorMessageSenders.push(key);
        }

        for (let i = 0; i < this.TimeoutActorMessageSenders.length; i++) {
            const rpcId = this.TimeoutActorMessageSenders[i];

            let actorMessageSender = this.requestCallback.get(rpcId);
            this.requestCallback.delete(rpcId);

            try {
                let response = ActorHelper.CreateResponse(actorMessageSender.Request, ErrorCore.ERR_ActorTimeout);

                actorMessageSender.run(response);
            }
            catch (e) {
                ctError(e);
            }
        }

        this.TimeoutActorMessageSenders = []
    }

    public Send(actorId: number, message: IMessage) {
        if (actorId == 0) {
            throw new Error(`actor id is 0: ${message}`);
        }

        let processActorId = new ProcessActorId(actorId);

        // 这里做了优化，如果发向同一个进程，则直接处理，不需要通过网络层
        // if (processActorId.Process == Options.inst.process) {
        //     ctLog(`同一进程消息，不通过网络层`)
        //     NetInnerComponent.inst.HandleMessage(actorId, message);
        //     return;
        // }

        let session = NetInnerComponent.inst.Get(processActorId.Process);
        session.SendWithId(processActorId.ActorId, message);
    }

    public GetRpcId() {
        return ++this.RpcId;
    }

    public async CallWithRpcId(actorId: number, rpcId: number, iActorRequest: IActorRequest, needException: boolean = true): Promise<IActorResponse> {
        if (actorId == 0) {
            throw new Error(`actor id is 0: ${iActorRequest}`);
        }

        let tcs: Task<IActorResponse> = Task.create();

        this.requestCallback.set(rpcId, new ActorMessageSender(actorId, iActorRequest, tcs, needException));

        this.Send(actorId, iActorRequest);

        let beginTime = TimeHelper.serverFrameTime();
        let response = await tcs;
        let endTime = TimeHelper.serverFrameTime();

        let costTime = endTime - beginTime;
        if (costTime > 200) {
            ctWarn(`actor rpc time > 200: ${costTime} ${iActorRequest}`);
        }

        return response;
    }

    public async Call(actorId: number, request: IActorRequest, needException: boolean = true): Promise<IActorResponse> {
        request.RpcId = this.GetRpcId();

        if (actorId == 0) {
            throw new Error(`actor id is 0: ${request}`);
        }

        return await this.CallWithRpcId(actorId, request.RpcId, request, needException);
    }

    public HandleIActorResponse(response: IActorResponse) {
        let actorMessageSender = this.requestCallback.get(response.RpcId)

        if (!actorMessageSender) {
            return;
        }

        this.requestCallback.delete(response.RpcId);

        actorMessageSender.run(response)
    }
}