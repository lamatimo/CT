import { Singleton } from "../Singleton/Singleton";

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
}