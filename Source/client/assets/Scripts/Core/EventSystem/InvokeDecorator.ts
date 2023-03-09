import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector"

export function InvokeDecorator(invokeArgsCtor: new (...args) => any, type: number = 0) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.Invoke, target, type, invokeArgsCtor)
    }
}