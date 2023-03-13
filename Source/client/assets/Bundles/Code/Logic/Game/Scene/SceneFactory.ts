
import { EntitySceneFactory } from "../../../../../Scripts/Core/Entity/EntitySceneFactory";
import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType";
import { EventSystem } from "../../../../../Scripts/Core/EventSystem/EventSystem";
import { IdGenerater } from "../../../../../Scripts/Core/IdGenerater/IdGenerater";
import { ObjectWait } from "../../Module/ObjectWait/ObjectWait";
import { ClientSceneManagerComponent } from "../../Module/Scene/ClientSceneManagerComponent";
import { CurrentScenesComponent } from "../../Module/Scene/CurrentScenesComponent";
import { AfterCreateClientScene, AfterCreateCurrentScene } from "../EventType/EventTypes";
import { PlayerComponent } from "../Unit/PlayerComponent";

export class SceneFactory {
    public static async createClientScene(zone: number, name: string): Promise<Scene> {
        let clientScene = EntitySceneFactory.createScene(zone, SceneType.Client, name, ClientSceneManagerComponent.inst);
        clientScene.addComponent(CurrentScenesComponent);
        clientScene.addComponent(ObjectWait);
        clientScene.addComponent(PlayerComponent);

        EventSystem.inst.publishAsync(clientScene, AfterCreateClientScene.create());
        return clientScene;
    }

    public static createCurrentScene(id: number, zone: number, name: string, currentScenesComponent: CurrentScenesComponent): Scene {
        let currentScene = EntitySceneFactory.createSceneWithId(id, IdGenerater.inst.generateInstanceId(), zone, SceneType.Current, name, currentScenesComponent);
        currentScenesComponent.scene = currentScene;

        EventSystem.inst.publishAsync(currentScene, AfterCreateCurrentScene.create());
        return currentScene;
    }
}