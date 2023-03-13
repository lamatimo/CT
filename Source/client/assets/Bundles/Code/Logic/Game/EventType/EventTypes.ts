import { EventType } from "../../../../../Scripts/Core/EventSystem/EventType";
import { Vec3 } from "../../Module/Math/vec3";
import { Unit } from "../../Module/Unit/Unit";

export class EntryEvent extends EventType {

}

export class AppStartInitFinish extends EventType {

}

export class AfterCreateClientScene extends EventType {
}

export class AfterCreateCurrentScene extends EventType {
}

export class EnterMapFinish extends EventType {
}

export class ChangePosition extends EventType{
    public Unit: Unit;
    public OldPos: Vec3;
}

export class ChangeRotation extends EventType{
    public Unit: Unit;
}
