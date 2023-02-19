import { Entity } from '../../../../Core/Entity/Entity';
import { Scene } from '../../../../Core/Entity/Scene';

declare module '../../../../Core/Entity/Scene' {
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
