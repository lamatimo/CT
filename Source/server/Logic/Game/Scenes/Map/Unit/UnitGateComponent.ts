import { Transfer } from "../../../../../../client/assets/Scripts/Core/Decorator/Transfer";
import { Entity } from "../../../../../../client/assets/Scripts/Core/Entity/Entity";

@Transfer
export class UnitGateComponent extends Entity{
    public GateSessionActorId: number

    init(id: number){
        this.GateSessionActorId = id
    }
}