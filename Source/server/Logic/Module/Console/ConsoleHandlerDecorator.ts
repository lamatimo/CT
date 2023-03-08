import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector"

export function ConsoleHandlerDecorator( mode: string) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.ConsoleHandler, target, mode)
    }
}