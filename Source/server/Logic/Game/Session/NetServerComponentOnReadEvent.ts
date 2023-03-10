import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { AEvent } from "../../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { MessageTypeComponent } from "../../../../client/assets/Scripts/Core/Network/MessageTypeComponent";
import { NetServerComponentOnRead } from "../../Module/Message/NetServerComponent";
import { IResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage"
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { MessageType } from "../../../../client/assets/Scripts/Core/Network/MessageType";
import { MessageDispatcherComponent } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageDispatcherComponent";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";


@EventDecorator(NetServerComponentOnRead, SceneType.Process)
class NetServerComponentOnReadEvent extends AEvent<NetServerComponentOnRead>{
    protected async run(scene: Scene, args: NetServerComponentOnRead) {
        let session = args.Session;
        let message = args.Message;
        let opcode = NetServices.inst.GetOpcode(message.constructor)
        let msgType = MessageTypeComponent.inst.getMessageType(opcode)

        if(MessageTypeComponent.inst.isExtendsIResponse(opcode)){
            session.OnResponse(message as unknown as IResponse);
            return
        }
        
        // 根据消息接口判断是不是Actor消息，不同的接口做不同的处理,比如需要转发给Chat Scene，可以做一个IChatMessage接口
        switch (msgType)
        {
            case MessageType.IActorLocationRequest: // gate session收到actor rpc消息，先向actor 发送rpc请求，再将请求结果返回客户端
            {
                // long unitId = session.GetComponent<SessionPlayerComponent>().PlayerId;
                // int rpcId = actorLocationRequest.RpcId; // 这里要保存客户端的rpcId
                // long instanceId = session.InstanceId;
                // IResponse iResponse = await ActorLocationSenderComponent.Instance.Call(unitId, actorLocationRequest);
                // iResponse.RpcId = rpcId;
                // // session可能已经断开了，所以这里需要判断
                // if (session.InstanceId == instanceId)
                // {
                //     session.Send(iResponse);
                // }
                break;
            }
            case MessageType.IActorLocationMessage:
            {
                // long unitId = session.GetComponent<SessionPlayerComponent>().PlayerId;
                // ActorLocationSenderComponent.Instance.Send(unitId, actorLocationMessage);
                break;
            }
            case MessageType.IActorRequest:  // 分发IActorRequest消息，目前没有用到，需要的自己添加
            {
                break;
            }
            case MessageType.IActorMessage:  // 分发IActorMessage消息，目前没有用到，需要的自己添加
            {
                break;
            }
            
            default:
            {
                // 非Actor消息
                MessageDispatcherComponent.inst.Handle(session, message);
                break;
            }
        }


    }
}