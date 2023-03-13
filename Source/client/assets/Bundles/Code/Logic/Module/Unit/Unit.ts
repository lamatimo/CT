import { BsonIgnore } from "../../../../../Scripts/Core/Decorator/BsonIgnore";
import { Transfer } from "../../../../../Scripts/Core/Decorator/Transfer";
import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { EventSystem } from "../../../../../Scripts/Core/EventSystem/EventSystem";
import { ChangePosition, ChangeRotation } from "../../Game/EventType/EventTypes";
import { Tables } from "../../Game/Generate/Config/Types";
import { Vec3 } from "../Math/vec3";

@Transfer
export class Unit extends Entity {
    ConfigId: number

    @BsonIgnore
    public get Config() {
        return Tables.UnitConfigCategory.get(this.ConfigId);
    }

    public get Type() {
        return this.Config.Type
    }

    private _position: Vec3

    @BsonIgnore
    public get position() {
        return this._position
    }

    public set position(value: Vec3) {
        let oldPos = this._position;
        this._position = value;
        let event = ChangePosition.create(ChangePosition)

        event.OldPos = oldPos
        event.Unit = this

        EventSystem.inst.publishAsync(this.domainScene(), event);
    }

    private _rotation: Vec3

    @BsonIgnore
    public get rotation() {
        return this._rotation
    }

    public set rotation(value: Vec3) {
        this._rotation = value;
        let event = ChangeRotation.create(ChangeRotation)

        event.Unit = this

        EventSystem.inst.publishAsync(this.domainScene(), event);
    }

    init(configId: number){
        this.ConfigId = configId
    }
}