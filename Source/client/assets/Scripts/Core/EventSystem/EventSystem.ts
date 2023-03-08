import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector";
import { Entity } from "../Entity/Entity";
import { Root } from "../Entity/Root";
import { Scene } from "../Entity/Scene";
import { SceneType } from "../Entity/SceneType";
import { Singleton } from "../Singleton/Singleton";
import { AEvent } from "./AEvent";
import { EventType } from "./EventType";
import { InstanceQueueIndex } from "./InstanceQueueIndex";

export interface IEventSystem {
    registerSystem(component: Entity): void
    awakeComEvent(component: Entity): void
    destroyComEvent(component: Entity): void
}

class EventInfo {
    public eventHandler: any

    public sceneType: SceneType

    constructor(handler: any, sceneType: SceneType) {
        this.eventHandler = handler;
        this.sceneType = sceneType;
    }
}

export class EventSystem extends Singleton {
    public static get inst(): EventSystem {
        return this._inst as EventSystem
    }

    private allEvent: Map<new () => EventType, Array<EventInfo>> = new Map
    private readonly queues: Array<Array<number>> = new Array(InstanceQueueIndex.Max);

    awake(): void {
        for (let i = 0; i < this.queues.length; i++) {
            this.queues[i] = new Array;
        }

        this.initEvent()

        Entity.eventSystem = this
    }

    private initEvent() {
        let argsList = DecoratorCollector.inst.get(DecoratorType.Event)

        for (const args of argsList) {
            let eventTypeCtor = args[0]
            let handlerCtor = args[1]
            let sceneType = args[2]

            let list = this.allEvent.get(eventTypeCtor)

            if (!list) {
                list = new Array
                this.allEvent.set(eventTypeCtor, list)
            }

            list.push(new EventInfo(new handlerCtor(), sceneType))
        }

        // for (let [k, handlers] of DecoratorCollector.allEvent) {
        //     let list = []

        //     this.allEvent.set(k, list)

        //     for (let i = 0; i < handlers.length; i++) {
        //         list.push(new handlers[i]())
        //     }
        // }
    }

    public registerSystem(component: Entity): void {
        if (component.update) {
            this.queues[InstanceQueueIndex.Update].push(component.instanceId)
        }

        if (component.lateUpdate) {
            this.queues[InstanceQueueIndex.LateUpdate].push(component.instanceId)
        }
    }


    public async publishAsync<T extends EventType>(scene: Scene, eventType: T) {
        let list = this.allEvent.get(eventType.constructor as new () => EventType)

        if (!list) {
            return
        }

        let tasks = []

        for (let i = 0; i < list.length; i++) {
            let eventInfo = list[i]

            if (eventInfo.sceneType != scene.sceneType) {
                continue
            }

            tasks.push((eventInfo.eventHandler as AEvent<T>).handle(scene, eventType))
        }

        await Promise.all(tasks)

        eventType.dispose()
    }

    public awakeComEvent(component: Entity) {
        component.awake()
    }

    public destroyComEvent(component: Entity) {
        component.destroy()
    }

    update(): void {
        let queue = this.queues[InstanceQueueIndex.Update];
        let count = queue.length;

        while (count-- > 0) {
            let instanceId = queue.pop();

            let component = Root.inst.get(instanceId);

            if (component == null) {
                continue;
            }

            if (component.isDisposed) {
                continue;
            }

            queue.push(instanceId);

            component.update()
        }
    }

    lateUpdate(): void {
        let queue = this.queues[InstanceQueueIndex.LateUpdate];
        let count = queue.length;

        while (count-- > 0) {
            let instanceId = queue.pop();

            let component = Root.inst.get(instanceId);

            if (component == null) {
                continue;
            }

            if (component.isDisposed) {
                continue;
            }

            queue.push(instanceId);

            component.lateUpdate()
        }
    }
}