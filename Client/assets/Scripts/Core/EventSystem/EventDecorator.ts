import { DecoratorCollector } from "../Decorator/DecoratorCollector"
import { EventType } from "./EventType"

export function EventDecorator(eventType: new () => EventType) {
    return function (target: Function) {
        DecoratorCollector.addEvent(eventType, target as new () => any)
    }
}