import { Entity } from "./Entity";
import { Scene } from "./Scene";
import { SceneType } from "./SceneType";

export class EntitySceneFactory{
    public static createScene(sceneType: SceneType, name: string, parent: Entity = null){
        let scene = new Scene(sceneType, name, parent)

        return scene
    }
}