import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Scene } from "../../../../../Scripts/Core/Entity/Scene";


declare module "../../../../../Scripts/Core/Entity/Entity" {
    interface Entity {
        clientScene(): Scene;
    }
}
Entity.prototype.clientScene = function () {
    let self: Entity = this;

    return ClientSceneManagerComponent.inst.get(self.domainZone());
}

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


