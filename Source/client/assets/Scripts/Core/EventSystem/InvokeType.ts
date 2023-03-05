import { ObjectPool } from "../ObjectPool/ObjectPool";

export abstract class InvokeType {
    public static create<T extends InvokeType>() {
        let event = ObjectPool.inst.fetch(this as unknown as new () => T);

        return event;
    }

    public dispose() {
        ObjectPool.inst.recycle(this);
    }
}