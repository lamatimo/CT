import { Scene } from "../../../../../Scripts/Core/Entity/Scene"
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType"
import { AEvent } from "../../../../../Scripts/Core/EventSystem/AEvent"
import { EventDecorator } from "../../../../../Scripts/Core/EventSystem/EventDecorator"
import { MessageTypeComponent } from "../../../../../Scripts/Core/Network/MessageTypeComponent"
import { NetServices } from "../../../../../Scripts/Core/Network/NetServices"
import { IResponse } from "../../Module/Message/IMessage"
import { MessageDispatcherComponent } from "../../Module/Message/MessageDispatcherComponent"
import { NetClientComponentOnRead } from "../../Module/Message/NetClientComponent"

@EventDecorator(NetClientComponentOnRead, SceneType.Process)
export class NetClientComponentOnReadEvent extends AEvent<NetClientComponentOnRead>{
    protected async run(scene: Scene, args: NetClientComponentOnRead) {
        let session = args.Session;
        let message = args.Message;

        let opcode = NetServices.inst.GetOpcode(message.constructor)

        if (MessageTypeComponent.inst.isExtendsIResponse(opcode)) {
            session.OnResponse(message as unknown as IResponse);
            return
        }

        // 普通消息或者是Rpc请求消息
        MessageDispatcherComponent.inst.Handle(session, message);
    }
}