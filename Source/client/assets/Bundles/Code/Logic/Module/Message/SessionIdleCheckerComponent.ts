import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../../Scripts/Core/Network/ErrorCore";
import { TimeHelper } from "../../../../../Scripts/Core/Time/TimeHelper";
import { TimerComponent } from "../../../../../Scripts/Core/Timer/TimerComponent";
import { Session } from "./Session";

export class SessionIdleCheckerComponent extends Entity {
    public static CheckInteral = 2000;
    public static SessionTimeoutTime = 30 * 1000;
    public RepeatedTimer: number;

    awake(){
        this.RepeatedTimer = TimerComponent.inst.NewRepeatedTimer(SessionIdleCheckerComponent.CheckInteral, this.Check.bind(this));
    }

    private Check()
    {
        let session = this.getParent(Session);
        let timeNow = TimeHelper.clientNow();

        if (timeNow - session.LastRecvTime < SessionIdleCheckerComponent.SessionTimeoutTime && timeNow - session.LastSendTime < SessionIdleCheckerComponent.SessionTimeoutTime)
        {
            return;
        }

        ctLog(`长时间不发消息 销毁session: ${session.id} ${timeNow} ${session.LastRecvTime} ${session.LastSendTime} ${timeNow - session.LastRecvTime} ${timeNow - session.LastSendTime}`);
        session.Error = ErrorCore.ERR_SessionSendOrRecvTimeout;

        session.dispose();
    }

    destroy(): void {
        TimerComponent.inst.Remove(this.RepeatedTimer);
        this.RepeatedTimer = 0
    }
}