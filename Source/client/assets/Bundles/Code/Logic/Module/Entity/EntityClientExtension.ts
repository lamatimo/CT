import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { ClientSceneManagerComponent } from "../Scene/ClientSceneManagerComponent";

declare module "../../../../../Scripts/Core/Entity/Entity" {
    interface Entity {
        clientScene(): Scene;
    }
}

Entity.prototype.clientScene = function () {
    let self: Entity = this;

    return ClientSceneManagerComponent.inst.get(self.domain.id);
}