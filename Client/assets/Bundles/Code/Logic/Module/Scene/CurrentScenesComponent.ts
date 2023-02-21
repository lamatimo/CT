import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Scene } from "../../../../../Scripts/Core/Entity/Scene";


declare module "../../../../../Scripts/Core/Entity/Scene" {
    interface Scene {
        currentScene(): Scene;
    }
}
Scene.prototype.currentScene = function () {
    return this.getComponent(CurrentScenesComponent)?.scene;
}

export class CurrentScenesComponent extends Entity {
    public scene: Scene
}
