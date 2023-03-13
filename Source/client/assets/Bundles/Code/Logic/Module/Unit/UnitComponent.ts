import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Unit } from "./Unit";

export class UnitComponent extends Entity {
    public Get(id: number): Unit {
        let unit = this.getChild(Unit, id);
        return unit;
    }

    public Remove(id: number) {
        let unit = this.getChild(Unit, id);
        unit?.dispose();
    }
}