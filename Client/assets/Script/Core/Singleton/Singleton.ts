import { log } from "cc"
import { DecoratorCollector } from "../Decorator/DecoratorCollector"
import { ISingletonDestroy } from "./ISingletonDestroy"

export abstract class Singleton {
    private _isDisposed: boolean = false

    public get isDisposed(){
        return this._isDisposed
    }

    public dispose(): void{
        if(this._isDisposed){
            return
        }

        if (DecoratorCollector.singletonHas(this.constructor as new () => Singleton, "ISingletonDestroy")) {
            let destroy = this as unknown as ISingletonDestroy

            destroy.destroy()
        }
        
        this._isDisposed = true
    }
}