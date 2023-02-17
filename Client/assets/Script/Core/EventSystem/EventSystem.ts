import { DecoratorCollector } from "../Decorator/DecoratorCollector";
import { Scene } from "../Entity/Scene";
import { Logger } from "../Log/Logger";
import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { Singleton } from "../Singleton/Singleton";
import { AEvent } from "./AEvent";
import { EventType } from "./EventType";


export class EventSystem extends Singleton implements ISingletonAwake {
    private static _inst: EventSystem;
    public static get inst(): EventSystem {
        return EventSystem._inst
    }

    private allEvent: Map<new () => EventType, Array<any>> = new Map

    @ISingletonAwakeDecorator
    awake(): void {
        EventSystem._inst = this

        this.initEvent()
    }

    private initEvent() {
        for (let [k, handlers] of DecoratorCollector.allEvent) {
            let list = []

            this.allEvent.set(k, list)

            for (let i = 0; i < handlers.length; i++) {
                list.push(new handlers[i]())
            }
        }
    }

    public async publishAsync<T extends EventType>(scene: Scene, eventType: T) {
        let list = this.allEvent.get(eventType.constructor as new () => EventType)

        if(!list){
            return
        }

        let tasks = []

        for (let i = 0; i < list.length; i++) {
            tasks.push((list[i] as AEvent<T>).handle(scene, eventType))
        }

        await Promise.all(tasks)

        eventType.dispose()
    }
}