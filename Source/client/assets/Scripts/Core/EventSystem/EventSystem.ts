import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector";
import { Entity } from "../Entity/Entity";
import { Root } from "../Entity/Root";
import { Scene } from "../Entity/Scene";
import { SceneType } from "../Entity/SceneType";
import { Singleton } from "../Singleton/Singleton";
import { AEvent } from "./AEvent";
import { EventType } from "./EventType";
import { AInvokeHandler } from "./IInvoke";
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

    private allEvents: Map<new () => EventType, Array<EventInfo>> = new Map
    private allInvokes: Map<any, Map<number, any>> = new Map
    private readonly queues: Array<Array<number>> = new Array(InstanceQueueIndex.Max);

    awake(): void {
        for (let i = 0; i < this.queues.length; i++) {
            this.queues[i] = new Array;
        }

        this.initEvent()
        this.initInvoke()

        Entity.eventSystem = this
    }

    private initEvent() {
        let argsList = DecoratorCollector.inst.get(DecoratorType.Event)

        for (const args of argsList) {
            let eventTypeCtor = args[0]
            let handlerCtor = args[1]
            let sceneType = args[2]

            let list = this.allEvents.get(eventTypeCtor)

            if (!list) {
                list = new Array
                this.allEvents.set(eventTypeCtor, list)
            }

            list.push(new EventInfo(new handlerCtor(), sceneType))
        }
    }

    private initInvoke() {
        let argsList = DecoratorCollector.inst.get(DecoratorType.Invoke)

        for (const args of argsList) {
            let handlerCtor = args[0]
            let invokeType = args[1]
            let invokeArgsCtor = args[2]
            let invokeHandler = new handlerCtor()

            let map = this.allInvokes.get(invokeArgsCtor)

            if (!map) {
                map = new Map
                this.allInvokes.set(invokeArgsCtor, map)
            }

            map.set(invokeType, invokeHandler)
        }
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
        let list = this.allEvents.get(eventType.constructor as new () => EventType)

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

    public Invoke<A>(args: A): void;
    public Invoke<A, T>(retValCtor: new () => T, args: A): T;
    public Invoke<A>(type: number, args: A): void;
    public Invoke<A, T>(retValCtor: new () => T, type: number, args: A): T;
    public Invoke(...args): any{
        let invokeArgs: any;
        let type: any;

        if(args.length == 3){
            invokeArgs = args[2]
            type = args[1]
        }else if(args.length == 2){
            if(typeof args[0] == "number"){
                type = args[0]
            }else{
                type = 0
            }

            invokeArgs = args[1]
        }else if(args.length == 1){
            type = 0
            invokeArgs = args[0]
        }

        return this.innerInvoke(type, invokeArgs)
    }

    public innerInvoke<A, T>(type: number, args: A): T {
        let invokeHandlers = this.allInvokes.get(args.constructor)

        if (!invokeHandlers) {
            throw new Error(`Invoke error: ${args.constructor.name}`);
        }

        let invokeHandler = invokeHandlers.get(type)

        if (!invokeHandler) {
            throw new Error(`Invoke error: ${args.constructor.name} ${type}`);
        }

        var aInvokeHandler = invokeHandler as AInvokeHandler<A, T>;
        if (aInvokeHandler == null) {
            throw new Error(`Invoke error, not AInvokeHandler: ${args.constructor.name} ${type}`);
        }

        return aInvokeHandler.Handle(args);
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