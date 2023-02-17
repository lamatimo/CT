import { log } from "cc";
import { DecoratorCollector } from "../Decorator/DecoratorCollector";
import { JsHalper } from "../Helper/JsHalper";
import { Singleton } from "./Singleton";

export interface ISingletonDestroy {
    destroy(): void
}

export function ISingletonDestroyDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let decoratorName = 'ISingletonDestroy'
    let methodName = "destroy"

    if (propertyKey != methodName) {
        log(`${decoratorName} 装饰器只能用在 ${methodName} 方法`)
        return
    }

    let ctor = target.constructor

    if (!(target instanceof Singleton)) {
        log(`${decoratorName} 装饰器只能用在继承 ${Singleton.name} 的类`)
        return
    }

    DecoratorCollector.addSingletonMethod(ctor, decoratorName)
}