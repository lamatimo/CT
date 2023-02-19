import { EventType } from "../EventSystem/EventType";

type EventCtor = new () => EventType

export class DecoratorCollector {
    public static allEvent: Map<EventCtor, Array<new () => any>> = new Map

    public static addEvent(eventType: EventCtor, handler: new () => any) {
        let handlers = this.allEvent.get(eventType)

        if(!handlers){
            handlers = new Array

            this.allEvent.set(eventType, handlers)
        }

        handlers.push(handler)
    }
}


