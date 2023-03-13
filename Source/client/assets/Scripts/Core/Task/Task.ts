import { ObjectPool } from "../ObjectPool/ObjectPool";

/**
 * 请不要直接new他 而是使用create方法去创建
 */
export class Task<T>{
    private resolveSelf;
    private taskPromise: Promise<T>

    public static create<T>(val: new () => T = null): Task<T>{
        let task = ObjectPool.inst.fetch(Task)

        task.reset()

        return task as Task<T>
    }

    public constructor() {
        this.reset()
    }

    private reset(){
        if(!this.taskPromise){
            this.taskPromise = new Promise((resolve, reject) => {
                this.resolveSelf = resolve
            })
        }
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

        this.taskPromise = null
        ObjectPool.inst.recycle(this)
    }
}