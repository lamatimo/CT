import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Scene } from "../../../../../Scripts/Core/Entity/Scene";

export class ClientSceneManagerComponent extends Entity {
    public static inst: ClientSceneManagerComponent

    awake(): void {
        ClientSceneManagerComponent.inst = this
    }

    destroy(): void {
        ClientSceneManagerComponent.inst = null
    }

    public get(id: number): Scene {
        let scene = this.getChild(Scene, id);
        return scene;
    }

    public remove(id: number) {
        this.removeChild(id);
    }
}


