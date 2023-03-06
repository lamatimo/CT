import { ObjectPool } from "../ObjectPool/ObjectPool";

export abstract class EventType {
    private isRecycle: boolean = false

    public static create<T extends EventType>(ctor: new () => T = null): T {
        let event = ObjectPool.inst.fetch(this as unknown as new () => T);

        event.isRecycle = true

        return event;
    }

    public dispose() {
        if (this.isRecycle) {
            ObjectPool.inst.recycle(this);
        }
    }
}


