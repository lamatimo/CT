import { Logger } from "../Log/Logger";
import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { Singleton } from "../Singleton/Singleton";

export class ObjectPool extends Singleton implements ISingletonAwake{
    private static _inst: ObjectPool;
    public static get inst(): ObjectPool {
        return ObjectPool._inst
    }

    private pool = new Map<new () => void, Array<any>>();

    @ISingletonAwakeDecorator
    awake() {
        ObjectPool._inst = this
    }

    public fetch<T>(type: new () => T): T {
        let queue = this.pool.get(type)

        if (!queue) {
            return new type();
        }

        if (queue.length === 0) {
            return new type();
        }

        return queue.shift() as T;
    }

    public recycle(obj: any): void {
        let type = obj.constructor;
        let queue = this.pool.get(type);

        if (!queue) {
            queue = [];
            this.pool.set(type, queue);
        }

        if (queue.length > 1000) {
            return;
        }

        queue.push(obj);

        Logger.inst.log(`对象池${type.name}剩余数量=${queue.length}`)
    }
}