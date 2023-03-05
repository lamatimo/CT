import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";

export class ServerSceneManagerComponent extends Entity {
    public static inst: ServerSceneManagerComponent

    awake(): void {
        ServerSceneManagerComponent.inst = this
    }

    destroy(): void {
        ServerSceneManagerComponent.inst = null
    }

    public Get(id: number): Scene {
        let scene: Scene = this.getChild(Scene, id);
        return scene;
    }

    public Remove(id: number) {
        this.removeChild(id);
    }
}