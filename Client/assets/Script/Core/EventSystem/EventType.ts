import { ObjectPool } from "../ObjectPool/ObjectPool";

export abstract class EventType {
    public static create<T extends EventType>() {
        let event = ObjectPool.inst.fetch(this as unknown as new () => T);

        return event;
    }

    public dispose() {
        ObjectPool.inst.recycle(this);
    }
}


