import { CoroutineLockType } from "../../../../client/assets/Bundles/Code/Logic/Module/CoroutineLock/CoroutineLockType";
import { IMessage, IRequest, IResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage";
import { Session } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { CoroutineLock } from "../../../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock";
import { Root } from "../../../../client/assets/Scripts/Core/Entity/Root";
import { InstanceIdStruct } from "../../../../client/assets/Scripts/Core/IdGenerater/IdGenerater";
import { ctError, ctWarn } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { Options } from "../../../../client/assets/Scripts/Core/Options/Options";
import { NetInnerComponent } from "../Message/NetInnerComponent";
import { ActorHelper } from "./ActorHelper";
import { ActorMessageDispatcherComponent } from "./ActorMessageDispatcherComponent";
import { ActorMessageSenderComponent } from "./ActorMessageSenderComponent";
import { MailBoxComponent } from "./MailBoxComponent";
import { MailboxType } from "./MailboxType";


export class ActorHandleHelper {
    public static Reply(fromProcess: number, response: IResponse) {
        if (fromProcess == Options.inst.process) // 返回消息是同一个进程
        {
            // NetInnerComponent.Instance.HandleMessage(realActorId, response); 等同于直接调用下面这句
            ActorMessageSenderComponent.inst.HandleIActorResponse(response);
            return;
        }

        let replySession = NetInnerComponent.inst.Get(fromProcess);
        replySession.Send(response);
    }

    public static HandleIActorResponse(response: IResponse) {
        ActorMessageSenderComponent.inst.HandleIActorResponse(response);
    }

    /// <summary>
    /// 分发actor消息
    /// </summary>
    public static async HandleIActorRequest(actorId: number, iActorRequest: IRequest) {
        let instanceIdStruct = new InstanceIdStruct();

        instanceIdStruct.initArgs1(actorId)

        let fromProcess = instanceIdStruct.Process;
        instanceIdStruct.Process = Options.inst.process;
        let realActorId = instanceIdStruct.ToLong();

        let entity = Root.inst.get(realActorId);
        if (entity == null) {
            let response = ActorHelper.CreateResponse(iActorRequest, ErrorCore.ERR_NotFoundActor);
            this.Reply(fromProcess, response);
            return;
        }

        let mailBoxComponent = entity.getComponent(MailBoxComponent);
        if (mailBoxComponent == null) {
            ctWarn(`actor not found mailbox: ${entity.constructor.name} ${realActorId} ${iActorRequest}`);
            let response = ActorHelper.CreateResponse(iActorRequest, ErrorCore.ERR_NotFoundActor);
            this.Reply(fromProcess, response);
            return;
        }

        switch (mailBoxComponent.MailboxType) {
            case MailboxType.MessageDispatcher: {
                let lock = await CoroutineLock.inst.wait(CoroutineLockType.Mailbox, realActorId.toString())

                if (entity.instanceId != realActorId) {
                    let response = ActorHelper.CreateResponse(iActorRequest, ErrorCore.ERR_NotFoundActor);
                    this.Reply(fromProcess, response);
                    break;
                }
                await ActorMessageDispatcherComponent.inst.Handle(entity, fromProcess, iActorRequest);
                lock.dispose()
                break;
            }
            case MailboxType.UnOrderMessageDispatcher: {
                await ActorMessageDispatcherComponent.inst.Handle(entity, fromProcess, iActorRequest);
                break;
            }
            case MailboxType.GateSession:
            default:
                throw new Error(`no mailboxtype: ${mailBoxComponent.MailboxType} ${iActorRequest}`);
        }
    }

    /// <summary>
    /// 分发actor消息
    /// </summary>
    public static async HandleIActorMessage(actorId: number, iActorMessage: IMessage) {
        let instanceIdStruct = new InstanceIdStruct();
        instanceIdStruct.initArgs1(actorId)
        let fromProcess = instanceIdStruct.Process;
        instanceIdStruct.Process = Options.inst.process;
        let realActorId = instanceIdStruct.ToLong();

        let entity = Root.inst.get(realActorId);
        if (entity == null) {
            ctError(`not found actor: ${realActorId} ${iActorMessage}`);
            return;
        }

        let mailBoxComponent = entity.getComponent(MailBoxComponent);
        if (mailBoxComponent == null) {
            ctError(`actor not found mailbox: ${entity.constructor.name} ${realActorId} ${iActorMessage}`);
            return;
        }

        switch (mailBoxComponent.MailboxType) {
            case MailboxType.MessageDispatcher: {
                let lock = CoroutineLock.inst.wait(CoroutineLockType.Mailbox, realActorId.toString())

                if (entity.instanceId != realActorId) {
                    break;
                }
                await ActorMessageDispatcherComponent.inst.Handle(entity, fromProcess, iActorMessage);
                (await lock).dispose()
                break;
            }
            case MailboxType.UnOrderMessageDispatcher: {
                await ActorMessageDispatcherComponent.inst.Handle(entity, fromProcess, iActorMessage);
                break;
            }
            case MailboxType.GateSession: {
                if (entity instanceof Session) {
                    // 发送给客户端
                    (entity as Session).Send(iActorMessage);
                }
                break;
            }
            default:
                throw new Error(`no mailboxtype: ${mailBoxComponent.MailboxType} ${iActorMessage}`);
        }
    }
}