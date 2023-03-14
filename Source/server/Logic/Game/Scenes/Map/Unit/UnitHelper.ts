import { MoveInfo, UnitInfo } from "../../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MoveComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Move/MoveComponent";
import { NumericComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Numeric/NumericComponent";
import { Unit } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";

export class UnitHelper {
    public static CreateUnitInfo(unit: Unit): UnitInfo {
        let unitInfo = new UnitInfo();
        let nc = unit.getComponent(NumericComponent);
        unitInfo.UnitId = unit.id;
        unitInfo.ConfigId = unit.ConfigId;
        unitInfo.Type = unit.Type;
        unitInfo.Position = unit.position;

        let moveComponent = unit.getComponent(MoveComponent);
        if (moveComponent != null) {
            if (!moveComponent.IsArrived()) {
                unitInfo.MoveInfo = new MoveInfo({ Points: [] });
                unitInfo.MoveInfo.Points.push(unit.position);

                for (let i = moveComponent.N; i < moveComponent.Targets.length; ++i) {
                    let pos = moveComponent.Targets[i];
                    unitInfo.MoveInfo.Points.push(pos);
                }
            }
        }

        unitInfo.KV = new Map();

        for (let [key, value] of nc.NumericDic) {
            unitInfo.KV.set(key, value);
        }

        return unitInfo;
    }

}