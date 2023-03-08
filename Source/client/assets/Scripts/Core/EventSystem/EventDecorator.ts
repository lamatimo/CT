import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector"
import { SceneType } from "../Entity/SceneType"
import { EventType } from "./EventType"

export function EventDecorator(eventType: new () => EventType, sceneType: SceneType) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.Event, eventType, target, sceneType)
    }
}