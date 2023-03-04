import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector"
import { EventType } from "./EventType"

export function EventDecorator(eventType: new () => EventType) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.Event, eventType, target)
    }
}