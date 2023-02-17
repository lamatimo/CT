import { AEvent } from "../EventSystem/AEvent";
import { EventType } from "../EventSystem/EventType";
import { Singleton } from "../Singleton/Singleton";

export class DecoratorCollector {
    private static singletonMap: Map<new () => Singleton, Set<string>> = new Map
    public static allEvent: Map<new () => EventType, Array<new () => any>> = new Map

    public static addSingletonMethod(t: new () => Singleton, methodName: string) {
        let set = this.singletonMap.get(t)

        if (null == set) {
            set = new Set

            this.singletonMap.set(t, set)
        }

        set.add(methodName)
    }

    public static singletonHas(t: new () => Singleton, methodName: string): boolean {
        let set = this.singletonMap.get(t)

        if (null == set) {
            return false
        }

        return set.has(methodName)
    }

    public static addEvent(eventType: new () => EventType, handler: new () => any) {
        let handlers = this.allEvent.get(eventType)

        if(!handlers){
            handlers = new Array

            this.allEvent.set(eventType, handlers)
        }

        handlers.push(handler)
    }
}


