import { Singleton } from "../Singleton/Singleton";
import { Entity } from "./Entity";
import { EntitySceneFactory } from "./EntitySceneFactory";
import { Scene } from "./Scene";
import { SceneType } from "./SceneType";

export class Root extends Singleton {
    public static get inst(): Root {
        return Root._inst as Root
    }

    public get scene(): Scene {
        return this._scene
    }

    private _scene: Scene
    private readonly allEntities: Map<number, Entity> = new Map;

    awake() {
        this._scene = EntitySceneFactory.createScene(0, SceneType.Process, "Process")
    }

    destroy(): void {
    }

    public add(entity: Entity): void
    {
        this.allEntities.set(entity.instanceId, entity);
    }
    
    public remove(instanceId: number): void
    {
        this.allEntities.delete(instanceId);
    }

    public get(instanceId: number): Entity
    {
        let component = this.allEntities.get(instanceId);

        return component;
    }
}