import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { ObjectPool } from "../../../../../Scripts/Core/ObjectPool/ObjectPool";
import { CancellationToken } from "../../../../../Scripts/Core/Task/CancellationToken";
import { Task } from "../../../../../Scripts/Core/Task/Task";

export enum WaitTypeError {
    Success = 0,
    Destroy = 1,
    Cancel = 2,
    Timeout = 3,
}

export abstract class WaitType {
    Error: number = 0
    private isRecycle: boolean = false

    public static create<T extends WaitType>(ctor: new () => T = null): T {
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

export class ObjectWait extends Entity {
    private tcss: Map<any, Task<any>> = new Map

    /**
     * 注意这里会有重入问题
     * @param ctor 
     * @param cancellationToken 
     * @returns 
     */
    public async Wait<T extends WaitType>(ctor: new () => T, cancellationToken: CancellationToken = null): Promise<T> {
        let tcs = Task.create(ctor);

        this.tcss.set(ctor, tcs);

        let CancelAction = () => {
            let obj = new ctor()
            obj.Error = WaitTypeError.Cancel
            this.Notify(obj);
        }

        let ret;

        try {
            cancellationToken?.Add(CancelAction);
            ret = await tcs;
        }
        finally {
            cancellationToken?.Remove(CancelAction);
        }
        return ret;
    }

    public Notify<T extends WaitType>(obj: T) {
        let tcs = this.tcss.get(obj.constructor)
        if (!tcs) {
            return;
        }

        this.tcss.delete(obj.constructor);
        tcs.setResult(obj)
    }
}