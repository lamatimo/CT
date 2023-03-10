import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { TimeHelper } from "../../../../../Scripts/Core/Time/TimeHelper";
import { TimeInfo } from "../../../../../Scripts/Core/Time/TimeInfo";
import { TimerComponent } from "../../../../../Scripts/Core/Timer/TimerComponent";
import { Session } from "../../Module/Message/Session";
import { C2G_Ping, G2C_Ping } from "../Generate/Message/OuterMessage";

export class PingComponent extends Entity {
    public Ping: number

    awake() {
        this.PingAsync()
    }

    private async PingAsync() {
        let session = this.getParent(Session);
        let instanceId = this.instanceId;

        while (true) {
            if (this.instanceId != instanceId) {
                return;
            }

            let time1 = TimeHelper.clientNow();
            try {
                let response = await session.Call(new C2G_Ping()) as G2C_Ping;

                if (this.instanceId != instanceId) {
                    return;
                }

                let time2 = TimeHelper.clientNow();
                this.Ping = time2 - time1;

                TimeInfo.inst.ServerMinusClientTime = response.Time + (time2 - time1) / 2 - time2;

                await TimerComponent.inst.WaitAsync(2000);
            }
            catch (e) {
                // session断开导致ping rpc报错，记录一下即可，不需要打成error
                ctLog(`ping error: ${this.id} ${e}`);
                return;
            }
        }
    }
}