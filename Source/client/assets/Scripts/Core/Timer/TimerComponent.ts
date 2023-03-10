import { Singleton } from "../Singleton/Singleton";
import { CancellationToken } from "../Task/CancellationToken";
import { Task } from "../Task/Task";
import { TimeHelper } from "../Time/TimeHelper";

enum TimerType {
    Once,
    Repeat
}

class Timer {
    type: TimerType
    id: number
}

export class TimerComponent extends Singleton {
    public static get inst(): TimerComponent {
        return this._inst as TimerComponent
    }

    private idGenerator: number = 1000;
    private timerMap: Map<number, Timer> = new Map;

    private GetId(): number {
        return ++this.idGenerator;
    }

    public NewRepeatedTimer(time: number, callback: Function): number {
        let timer = new Timer()
        let timerId = this.GetId()

        timer.id = setInterval(callback, time)
        timer.type = TimerType.Repeat

        this.timerMap.set(timerId, timer)

        return timerId
    }

    public NewOnceTimer(timeout: number, callback: Function): number {

        let timer = new Timer()
        let timerId = this.GetId()

        timer.id = setTimeout(callback, timeout)
        timer.type = TimerType.Once

        this.timerMap.set(timerId, timer)

        return timerId
    }

    public Remove(id: number): boolean {
        let timer = this.timerMap.get(id)

        if (!timer) {
            return false
        }

        if (timer.type == TimerType.Once) {
            clearTimeout(timer.id)
        } else {
            clearInterval(timer.id)
        }

        this.timerMap.delete(id)

        return true
    }

    private GetNow(): number {
        return TimeHelper.clientFrameTime();
    }

    public async WaitAsync(time: number, cancellationToken: CancellationToken = null) {
        if (time == 0) {
            return;
        }

        let tcs = Task.create();
        let timerId = this.NewOnceTimer(time, () => {
            tcs.setResult()
        });

        let CancelAction = () => {
            if (this.Remove(timerId)) {
                tcs.setResult();
            }
        }

        try {
            cancellationToken?.Add(CancelAction);
            await tcs;
        }
        finally {
            cancellationToken?.Remove(CancelAction);
        }
    }
}