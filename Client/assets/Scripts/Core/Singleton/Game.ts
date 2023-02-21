import { Task } from "../Task/Task";
import { Singleton } from "./Singleton";

export class Game {
    private static readonly singletonMap: Map<new () => Singleton, Singleton> = new Map
    private static readonly singletons: Array<Singleton> = new Array
    private static readonly destroys: Array<Singleton> = new Array
    private static readonly updates: Array<Singleton> = new Array
    private static readonly lateUpdates: Array<Singleton> = new Array
    private static frameFinishTaskQueue: Task<void>[] = new Array

    public static addSingleton<K extends Singleton>(singletonCtor: new () => K): K {
        if (Game.singletonMap.has(singletonCtor)) {
            throw new Error(`already exist singleton: ${singletonCtor.name}`);
        }

        let singleton = (singletonCtor as unknown as typeof Singleton).create();

        Game.singletonMap.set(singletonCtor, singleton)
        Game.singletons.push(singleton)

        if (singleton.awake) {
            singleton.awake()
        }

        if (singleton.destroy) {
            Game.destroys.push(singleton)
        }

        if (singleton.update) {
            Game.updates.push(singleton)
        }

        if (singleton.lateUpdate) {
            Game.lateUpdates.push(singleton)
        }

        return singleton as K
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