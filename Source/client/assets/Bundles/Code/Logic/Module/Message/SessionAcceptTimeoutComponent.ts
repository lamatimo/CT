import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { TimeHelper } from "../../../../../Scripts/Core/Time/TimeHelper";
import { TimerComponent } from "../../../../../Scripts/Core/Timer/TimerComponent";

export class SessionAcceptTimeoutComponent extends Entity {
    public Timer: number;

    awake() {
        this.Timer = TimerComponent.inst.NewOnceTimer(TimeHelper.serverNow() + 5000, this.timerCallback.bind(this));
    }

    private timerCallback() {
        this.parent.dispose()
    }

    destroy(): void {
        TimerComponent.inst.Remove(this.Timer);

        this.Timer = 0
    }
}