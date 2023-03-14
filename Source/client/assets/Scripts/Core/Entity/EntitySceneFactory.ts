import { IdGenerater } from "../IdGenerater/IdGenerater";
import { Entity } from "./Entity";
import { Scene } from "./Scene";
import { SceneType } from "./SceneType";

export class EntitySceneFactory {
    public static createSceneWithId(id: number, instanceId: number, sceneType: SceneType, name: string, parent: Entity = null): Scene {
        let scene = new Scene();
        scene.init(id, instanceId, sceneType, name, parent);
        return scene;
    }

    public static createScene(id: number, sceneType: SceneType, name: string, parent: Entity = null): Scene {
        let instanceId = IdGenerater.inst.generateInstanceId();
        let scene = new Scene();
        scene.init(id, instanceId, sceneType, name, parent);
        return scene;
    }
}