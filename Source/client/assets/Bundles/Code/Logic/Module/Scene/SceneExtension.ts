import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { CurrentScenesComponent } from "./CurrentScenesComponent";

declare module "../../../../../Scripts/Core/Entity/Scene" {
    interface Scene {
        currentScene(): Scene;
    }
}
Scene.prototype.currentScene = function () {
    return this.getComponent(CurrentScenesComponent)?.scene;
}
