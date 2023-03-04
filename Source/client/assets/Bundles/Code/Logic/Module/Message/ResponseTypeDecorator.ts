import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector"

export function ResponseTypeDecorator(responseType: new () => any) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.MessageResponse, target, responseType)
    }
}