import { ctLog } from '../Log/Logger';
import { Entity } from './Entity';
import { SceneType } from './SceneType';

export class Scene extends Entity {
    public name: string
    public zone: number
    public sceneType: SceneType

    public set domain(value: Entity) {
        this._domain = value
    }

    public get domain() {
        return this._domain
    }

    public set parent(value: Entity) {
        if (value == null) {
            return;
        }

        this._parent = value;
        this._parent.children.set(this.id, this);
    }

    constructor(id: number, instanceId: number, zone: number, sceneType: SceneType, name: string, parent: Entity) {
        super()
        this.id = id;
        this.instanceId = instanceId;
        this.zone = zone;
        this.sceneType = sceneType;
        this.name = name;
        this.isCreated = true;
        this.isNew = true;
        this.parent = parent;
        this.domain = this;
        this.isRegister = true;

        ctLog(`scene create: ${this.sceneType} ${this.name} ${this.id} ${this.instanceId} ${this.zone}`);
    }
}


