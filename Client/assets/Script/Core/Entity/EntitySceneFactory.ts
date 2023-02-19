import { IdGenerater } from "../IdGenerater/IdGenerater";
import { Entity } from "./Entity";
import { Scene } from "./Scene";
import { SceneType } from "./SceneType";

export class EntitySceneFactory {
    public static createSceneWithId(id: number, instanceId: number, zone: number, sceneType: SceneType, name: string, parent: Entity = null): Scene {
        let scene = new Scene(id, instanceId, zone, sceneType, name, parent);

        return scene;
    }

    public static createScene(zone: number, sceneType: SceneType, name: string, parent: Entity = null): Scene {
        let instanceId = IdGenerater.inst.generateInstanceId();
        let scene = new Scene(zone, instanceId, zone, sceneType, name, parent);
        return scene;
    }
}