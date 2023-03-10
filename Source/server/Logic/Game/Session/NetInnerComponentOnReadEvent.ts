import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { AEvent } from "../../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { MessageType } from "../../../../client/assets/Scripts/Core/Network/MessageType";
import { MessageTypeComponent } from "../../../../client/assets/Scripts/Core/Network/MessageTypeComponent";
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ActorHandleHelper } from "../../Module/Actor/ActorHandleHelper";
import { NetInnerComponentOnRead } from "../../Module/Message/NetInnerComponent";

@EventDecorator(NetInnerComponentOnRead, SceneType.Process)
export class NetInnerComponentOnReadEvent extends AEvent<NetInnerComponentOnRead>{
    protected async run(scene: Scene, args: NetInnerComponentOnRead) {
        try {
            let actorId = args.ActorId;
            let message = args.Message;
            let opcode = NetServices.inst.GetOpcode(message.constructor)
            let msgType = MessageTypeComponent.inst.getMessageType(opcode)

            // 收到actor消息,放入actor队列
            switch (msgType) {
                case MessageType.IActorResponse: {
                    ActorHandleHelper.HandleIActorResponse(message);
                    break;
                }
                case MessageType.IActorRequest: {
                    await ActorHandleHelper.HandleIActorRequest(actorId, message);
                    break;
                }
                case MessageType.IActorMessage: {
                    await ActorHandleHelper.HandleIActorMessage(actorId, message);
                    break;
                }
            }
        }
        catch (e) {
            ctError(`InnerMessageDispatcher error: ${args.Message.constructor.name}\n${e}`);
        }
    }
}