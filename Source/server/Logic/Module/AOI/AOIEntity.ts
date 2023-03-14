import { Vec3 } from "../../../../client/assets/Bundles/Code/Logic/Module/Math/vec3";
import { Unit } from "../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Cell } from "./Cell";

export class AOIEntity extends Entity {
    public readonly Unit: Unit;

    public ViewDistance: number;

    public Cell: Cell;

    // 观察进入视野的Cell
    public SubEnterCells: Set<number> = new Set<number>();

    // 观察离开视野的Cell
    public SubLeaveCells: Set<number> = new Set<number>();

    // 观察进入视野的Cell
    public enterHashSet: Set<number> = new Set<number>();

    // 观察离开视野的Cell
    public leaveHashSet: Set<number> = new Set<number>();

    // 我看得见的Unit
    public SeeUnits: Map<number, AOIEntity> = new Map<number, AOIEntity>();

    // 看见我的Unit
    public BeSeeUnits: Map<number, AOIEntity> = new Map<number, AOIEntity>();

    // 我看得见的Player
    public SeePlayers: Map<number, AOIEntity> = new Map<number, AOIEntity>();

    // 看见我的Player单独放一个Map，用于广播
    public BeSeePlayers: Map<number, AOIEntity> = new Map<number, AOIEntity>();

    init( distance: number,  pos: Vec3){
        this.ViewDistance = distance;
        // this.domainScene().getComponent(AOIManagerComponent).Add(self, pos.x, pos.z);
    }

    destroy(): void {
        // this.domainScene().getComponent(AOIManagerComponent)?.Remove(self);
        this.ViewDistance = 0;
        this.SeeUnits.clear();
        this.SeePlayers.clear();
        this.BeSeePlayers.clear();
        this.BeSeeUnits.clear();
        this.SubEnterCells.clear();
        this.SubLeaveCells.clear();
        this.Cell = null;
    }

    public GetBeSeePlayers(): Map<number, AOIEntity>
    {
        return this.BeSeePlayers;
    }
}