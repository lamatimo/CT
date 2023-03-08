import { Session } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Root } from "../../../../client/assets/Scripts/Core/Entity/Root";
import { EventSystem } from "../../../../client/assets/Scripts/Core/EventSystem/EventSystem";
import { EventType } from "../../../../client/assets/Scripts/Core/EventSystem/EventType";
import { IPEndPoint } from "../../../../client/assets/Scripts/Core/Network/IPEndPoint";
import { NetServices, NetworkProtocol } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ServiceType } from "../../../../client/assets/Scripts/Core/Network/ServiceType";
import { WService } from "../../../../client/assets/Scripts/Core/Network/WService";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { Tables } from "../../Game/Generate/Config/Types";

export class NetInnerComponentOnRead extends EventType {
    public ActorId: number;
    public Message: any;
}

/**
 * 用于内部通信
 */
export class NetInnerComponent extends Entity {
    public static inst: NetInnerComponent
    public ServiceId: number
    public InnerProtocol: NetworkProtocol = NetworkProtocol.Websocket

    awake() {
        NetInnerComponent.inst = this
    }

    destroy(): void {
        NetInnerComponent.inst = null

        NetServices.inst.RemoveService(this.ServiceId);
    }

    init(address: IPEndPoint) {

        switch (this.InnerProtocol) {
            case NetworkProtocol.TCP:
                {
                    // 等待实现
                    break;
                }
            case NetworkProtocol.Websocket:
                {
                    let service = new WService()

                    service.initAcceptor(address, ServiceType.Inner)

                    this.ServiceId = NetServices.inst.AddService(service);
                    break;
                }
        }

        NetServices.inst.RegisterAcceptCallback(this.ServiceId, this.OnAccept.bind(this));
        NetServices.inst.RegisterReadCallback(this.ServiceId, this.OnRead.bind(this));
        NetServices.inst.RegisterErrorCallback(this.ServiceId, this.OnError.bind(this));
    }

    private OnRead(channelId: number, actorId: number, message: any) {
        let session = this.getChild(Session, channelId);
        if (session == null) {
            return;
        }

        session.LastRecvTime = TimeHelper.clientFrameTime();

        this.HandleMessage(actorId, message);
    }

    public HandleMessage(actorId: number, message: any) {
        let event = NetInnerComponentOnRead.create(NetInnerComponentOnRead)
        event.ActorId = actorId
        event.Message = message

        EventSystem.inst.publishAsync(Root.inst.scene, event);
    }

    private OnError(channelId: number, error: number) {
        let session = this.getChild(Session, channelId);
        if (session == null) {
            return;
        }

        session.Error = error;
        session.dispose();
    }

    private OnAccept(channelId: number, ipEndPoint: IPEndPoint) {
        let session = this.addChildWithId(Session, channelId);
        session.init(this.ServiceId)
        session.RemoteAddress = ipEndPoint;
    }

    private CreateInner(channelId: number, ipEndPoint: IPEndPoint) {
        let session = this.addChildWithId(Session, channelId);
        session.init(this.ServiceId)
        session.RemoteAddress = ipEndPoint;

        NetServices.inst.CreateChannel(this.ServiceId, channelId, ipEndPoint);

        return session;
    }

    // 内网actor session，channelId是进程号
    public Get(channelId: number): Session {
        let session = this.getChild(Session, channelId);
        if (session != null) {
            return session;
        }

        let ipEndPoint = Tables.StartProcessConfigCategory.get(channelId).getInnerIPPort();
        session = this.CreateInner(channelId, ipEndPoint);
        return session;
    }
}