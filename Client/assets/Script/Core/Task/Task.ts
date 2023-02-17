import { ObjectPool } from "../ObjectPool/ObjectPool";

export class Task<T>{
    private resolveSelf;
    private taskPromise: Promise<T>

    public static create<T>(val: new () => T = null): Task<T>{
        let task = ObjectPool.inst.fetch(Task)

        task.reset()

        return task as Task<T>
    }

    public constructor() {
    }

    private reset(){
        this.taskPromise = new Promise((resolve, reject) => {
            this.resolveSelf = resolve
        })
    }

    private then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) =>
            TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) =>
            TResult2 | PromiseLike<TResult2>) | undefined | null
    ){
        return this.taskPromise.then(onfulfilled, onrejected)
    }

    private catch<TResult = never>(
        onrejected?: ((reason: any) =>
            TResult | PromiseLike<TResult>) | undefined | null
    ): Promise<T | TResult> {
        return this.taskPromise.catch(onrejected)
    }

    public setResult(val: T = null) { 
        this.resolveSelf(val)

        ObjectPool.inst.recycle(this)
    }
}