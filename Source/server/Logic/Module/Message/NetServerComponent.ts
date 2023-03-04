import { OpcodeHelper } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeHelper";
import { Session } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SessionAcceptTimeoutComponent } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/SessionAcceptTimeoutComponent";
import { SessionIdleCheckerComponent } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/SessionIdleCheckerComponent";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Root } from "../../../../client/assets/Scripts/Core/Entity/Root";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { EventSystem } from "../../../../client/assets/Scripts/Core/EventSystem/EventSystem";
import { EventType } from "../../../../client/assets/Scripts/Core/EventSystem/EventType";
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ServiceType } from "../../../../client/assets/Scripts/Core/Network/ServiceType";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { WService } from "../Network/WService";

export class NetServerComponentOnRead extends EventType {
    public Session: Session;
    public Message: any;
}

export class NetServerComponent extends Entity {
    ServiceId: number

    init(address: URL) {
        let service = new WService()

        service.initAcceptor(address, ServiceType.Outer)

        this.ServiceId = NetServices.inst.AddService(service);
        NetServices.inst.RegisterAcceptCallback(this.ServiceId, this.OnAccept);
        NetServices.inst.RegisterReadCallback(this.ServiceId, this.OnRead);
        NetServices.inst.RegisterErrorCallback(this.ServiceId, this.OnError);
    }

    destroy(): void {
        NetServices.inst.RemoveService(this.ServiceId);
    }

    private OnError( channelId: number,  error: number)
    {
        let session = this.getChild(Session, channelId);
        if (session == null)
        {
            return;
        }

        session.Error = error;
        session.dispose();
    }

    // 这个channelId是由CreateAcceptChannelId生成的
    private OnAccept( channelId: number,  ipEndPoint: URL)
    {
        let session = this.addChildWithId(Session, channelId);

        session.init(this.ServiceId)
        session.RemoteAddress = ipEndPoint;

        // 挂上这个组件，5秒就会删除session，所以客户端验证完成要删除这个组件。该组件的作用就是防止外挂一直连接不发消息也不进行权限验证
        session.addComponent(SessionAcceptTimeoutComponent);
        // 客户端连接，2秒检查一次recv消息，10秒没有消息则断开
        session.addComponent(SessionIdleCheckerComponent);
    }
    
    private OnRead( channelId: number,  actorId: number,  message: any)
    {
        let session = this.getChild(Session, channelId);
        if (session == null)
        {
            return;
        }
        session.LastRecvTime = TimeHelper.clientNow();
        
        OpcodeHelper.LogMsg(this.domainZone(), message);
        
        let event: NetServerComponentOnRead = NetServerComponentOnRead.create()
        event.Message = message
        event.Session = session
        EventSystem.inst.publishAsync(Root.inst.scene, event);
    }
}