import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Root } from "../../../../../Scripts/Core/Entity/Root";
import { EventSystem } from "../../../../../Scripts/Core/EventSystem/EventSystem";
import { EventType } from "../../../../../Scripts/Core/EventSystem/EventType";
import { IdGenerater } from "../../../../../Scripts/Core/IdGenerater/IdGenerater";
import { IPEndPoint } from "../../../../../Scripts/Core/Network/IPEndPoint";
import { NetServices } from "../../../../../Scripts/Core/Network/NetServices";
import { ServiceType } from "../../../../../Scripts/Core/Network/ServiceType";
import { WService } from "../../../../../Scripts/Core/Network/WService";
import { TimeHelper } from "../../../../../Scripts/Core/Time/TimeHelper";
import { OpcodeHelper } from "./OpcodeHelper";
import { Session } from "./Session";
import { SessionIdleCheckerComponent } from "./SessionIdleCheckerComponent";

export class NetClientComponentOnRead extends EventType {
    Session: Session;
    Message: any;
}

export class NetClientComponent extends Entity {
    ServiceId: number

    awake() {
        let service = new WService()
        service.initSender(ServiceType.Outer)

        this.ServiceId = NetServices.inst.AddService(service);
        NetServices.inst.RegisterReadCallback(this.ServiceId, this.OnRead.bind(this));
        NetServices.inst.RegisterErrorCallback(this.ServiceId, this.OnError.bind(this));
    }

    destroy(): void {
        NetServices.inst.RemoveService(this.ServiceId);
    }

    private OnRead(channelId: number, actorId: number, message: any) {
        let session = this.getChild(Session, channelId);
        if (session == null) {
            return;
        }

        session.LastRecvTime = TimeHelper.clientNow();

        OpcodeHelper.LogMsg(this.domainZone(), message);

        let event = NetClientComponentOnRead.create(NetClientComponentOnRead)
        event.Message = message
        event.Session = session

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

    public Create(address: IPEndPoint): Session {
        let session = this.addChild(Session);

        session.init(this.ServiceId)

        session.RemoteAddress = address;

        session.addComponent(SessionIdleCheckerComponent);

        NetServices.inst.CreateChannel(this.ServiceId, session.id, address);

        return session;
    }
}