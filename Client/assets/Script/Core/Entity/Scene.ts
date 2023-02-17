import { Entity } from './Entity';
import { SceneType } from './SceneType';

export class Scene extends Entity {
    public name: string
    public sceneType: SceneType

    constructor(sceneType: SceneType, name: string, parent: Entity) {
        super()

        this.name = name
        this.sceneType = sceneType
        this.parent = parent
    }
}


