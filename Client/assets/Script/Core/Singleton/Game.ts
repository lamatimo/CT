import { DecoratorCollector } from "../Decorator/DecoratorCollector";
import { Task } from "../Task/Task";
import { ISingletonAwake } from "./ISingletonAwake";
import { ISingletonDestroy } from "./ISingletonDestroy";
import { ISingletonLateUpdate } from "./ISingletonLateUpdate";
import { ISingletonUpdate } from "./ISingletonUpdate";
import { Singleton } from "./Singleton";

export class Game {
    private static readonly singletonMap: Map<new () => Singleton, Singleton> = new Map
    private static readonly singletons: Array<Singleton> = new Array
    private static readonly destroys: Array<ISingletonDestroy> = new Array
    private static readonly updates: Array<ISingletonUpdate> = new Array
    private static readonly lateUpdates: Array<ISingletonLateUpdate> = new Array
    private static frameFinishTaskQueue: Task<void>[] = new Array

    public static addSingleton<K extends Singleton>(singletonType: new () => K): K {
        if (Game.singletonMap.has(singletonType)) {
            throw new Error(`already exist singleton: ${singletonType.name}`);
        }

        let singleton = new singletonType()

        Game.singletonMap.set(singletonType, singleton)
        Game.singletons.push(singleton)

        if (DecoratorCollector.singletonHas(singletonType, "ISingletonAwake")) {
            (singleton as unknown as ISingletonAwake).awake()
        }

        if (DecoratorCollector.singletonHas(singletonType, "ISingletonDestroy")) {
            Game.destroys.push(singleton as unknown as ISingletonDestroy)
        }

        if (DecoratorCollector.singletonHas(singletonType, "ISingletonUpdate")) {
            Game.updates.push(singleton as unknown as ISingletonUpdate)
        }

        if (DecoratorCollector.singletonHas(singletonType, "ISingletonLateUpdate")) {
            Game.lateUpdates.push(singleton as unknown as ISingletonLateUpdate)
        }

        return singleton
    }

    public static async waitFrameFinish(): Promise<void> {
        let task = new Task<void>

        Game.frameFinishTaskQueue.push(task);

        await task;
    }

    public static update(): void {
        for (let index = 0; index < Game.updates.length; index++) {
            let update = Game.updates[index];
            let singleton = update as unknown as Singleton

            if (singleton.isDisposed) {
                continue
            }

            update.update()
        }
    }

    public static lateUpdate(): void {
        for (let index = 0; index < Game.lateUpdates.length; index++) {
            let lateUpdate = Game.lateUpdates[index];
            let singleton = lateUpdate as unknown as Singleton

            if (singleton.isDisposed) {
                continue
            }

            lateUpdate.lateUpdate()
        }
    }

    public static frameFinishUpdate(): void {
        let len = Game.frameFinishTaskQueue.length

        if (len == 0) {
            return
        }

        for (let index = 0; index < len; index++) {
            const task = Game.frameFinishTaskQueue[index]

            task.setResult()
        }

        Game.frameFinishTaskQueue = []
    }

    public static dispose() {
        for (let index = Game.singletons.length - 1; index >= 0; index--) {
            let singleton = Game.singletons[index]

            if (singleton.isDisposed) {
                continue
            }

            singleton.dispose()
        }
    }
}