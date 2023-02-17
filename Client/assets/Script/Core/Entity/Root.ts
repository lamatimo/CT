import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { ISingletonDestroy, ISingletonDestroyDecorator } from "../Singleton/ISingletonDestroy";
import { Singleton } from "../Singleton/Singleton";
import { EntitySceneFactory } from "./EntitySceneFactory";
import { Scene } from "./Scene";
import { SceneType } from "./SceneType";

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
        this._scene = EntitySceneFactory.createScene(SceneType.Process, "Process")
    }

    @ISingletonDestroyDecorator
    destroy(): void {
    }
}