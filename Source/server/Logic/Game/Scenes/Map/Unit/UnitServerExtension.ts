import { Unit } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit"
import { AOIEntity } from "../../../../Module/AOI/AOIEntity"

declare module "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit" {
    interface Unit {
        GetBeSeePlayers(): Map<number, AOIEntity>
    }
}

Unit.prototype.GetBeSeePlayers = (): Map<number, AOIEntity>=>{
    let self: Unit = this
    return self.getComponent(AOIEntity).GetBeSeePlayers()
}