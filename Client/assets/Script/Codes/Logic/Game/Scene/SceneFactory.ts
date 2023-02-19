import { EntitySceneFactory } from "../../../../Core/Entity/EntitySceneFactory";
import { Scene } from "../../../../Core/Entity/Scene";
import { SceneType } from "../../../../Core/Entity/SceneType";
import { EventSystem } from "../../../../Core/EventSystem/EventSystem";
import { IdGenerater } from "../../../../Core/IdGenerater/IdGenerater";
import { ClientSceneManagerComponent } from "../../Module/Scene/ClientSceneManagerComponent";
import { CurrentScenesComponent } from "../../Module/Scene/CurrentScenesComponent";
import { AfterCreateClientScene, AfterCreateCurrentScene } from "../EventType/EventTypes";

export class SceneFactory {
    public static async createClientScene(zone: number, name: string): Promise<Scene> {
        let clientScene = EntitySceneFactory.createScene(zone, SceneType.Client, name, ClientSceneManagerComponent.inst);
        clientScene.addComponent(CurrentScenesComponent);

        EventSystem.inst.publishAsync(clientScene, new AfterCreateClientScene());
        return clientScene;
    }

    public static createCurrentScene(id: number, zone: number, name: string, currentScenesComponent: CurrentScenesComponent): Scene {
        let currentScene = EntitySceneFactory.createSceneWithId(id, IdGenerater.inst.generateInstanceId(), zone, SceneType.Current, name, currentScenesComponent);
        currentScenesComponent.scene = currentScene;

        EventSystem.inst.publishAsync(currentScene, new AfterCreateCurrentScene());
        return currentScene;
    }
}