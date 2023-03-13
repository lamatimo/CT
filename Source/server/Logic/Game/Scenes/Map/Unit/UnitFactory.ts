import { v3 } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Math/vec3";
import { MoveComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Move/MoveComponent";
import { NumericComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Numeric/NumericComponent";
import { Unit } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { UnitComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/UnitComponent";
import { Scene } from "../../../../../../client/assets/Scripts/Core/Entity/Scene";
import { AOIEntity } from "../../../../Module/AOI/AOIEntity";
import { NumericType, UnitType } from "../../../Generate/Config/Types";

export class UnitFactory {
    public static Create(scene: Scene, id: number, unitType: UnitType): Unit {
        let unitComponent = scene.getComponent(UnitComponent);
        switch (unitType) {
            case UnitType.Player:
                {
                    let unit = unitComponent.addChildWithId(Unit, id);
                    unit.init(1001)
                    unit.addComponent(MoveComponent);
                    unit.position = v3(-10, 0, -10);
        
                let numericComponent = unit.addComponent(NumericComponent);
                    numericComponent.Set(NumericType.Speed, 6); // 速度是6米每秒
                    numericComponent.Set(NumericType.AOI, 15000); // 视野15米

                    // 加入aoi
                    unit.addComponent(AOIEntity).init(9 * 1000, unit.position);
                    return unit;
                }
            default:
                throw new Error(`not such unit type: ${unitType}`);
        }
    }
}