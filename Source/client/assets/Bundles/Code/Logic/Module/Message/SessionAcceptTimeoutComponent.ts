import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { TimerComponent } from "../../../../../Scripts/Core/Timer/TimerComponent";

export class SessionAcceptTimeoutComponent extends Entity {
    public Timer: number;

    awake() {
        this.Timer = TimerComponent.inst.NewOnceTimer(5000, this.timerCallback.bind(this));
    }

    private timerCallback() {
        let parendId = this.parent.id

        ctLog(`channel=${parendId}验证超时，进行销毁`)

        this.parent.dispose()
    }

    destroy(): void {
        TimerComponent.inst.Remove(this.Timer);

        this.Timer = 0
    }
}