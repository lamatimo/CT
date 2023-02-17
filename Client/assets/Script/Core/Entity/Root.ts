import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { ISingletonDestroy, ISingletonDestroyDecorator } from "../Singleton/ISingletonDestroy";
import { Singleton } from "../Singleton/Singleton";
import { Scene } from "./Scene";

export class Root extends Singleton implements ISingletonAwake, ISingletonDestroy{
    private static _inst: Root;
    public static get inst(): Root {
        return Root._inst
    }

    private _scene: Scene
    public get scene(): Scene {
        return this._scene
    }

    @ISingletonAwakeDecorator
    awake() {
        Root._inst = this
    }

    @ISingletonDestroyDecorator
    destroy(): void {
    }
}