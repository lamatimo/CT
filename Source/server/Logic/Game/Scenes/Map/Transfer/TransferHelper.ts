import { Unit } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { Game } from "../../../../../../client/assets/Scripts/Core/Singleton/Game";
import { ActorMessageSenderComponent } from "../../../../Module/Actor/ActorMessageSenderComponent";
import { LocationProxyComponent } from "../../../../Module/ActorLocation/LocationProxyComponent";
import { TransferComponent } from "../../../../Module/Transfer/TransferComponent";
import { M2M_UnitTransferRequest } from "../../../Generate/Message/InnerMessage";

export class TransferHelper {
    public static async TransferAtFrameFinish(unit: Unit, sceneInstanceId: number, sceneName: string) {
        await Game.waitFrameFinish();

        await TransferHelper.Transfer(unit, sceneInstanceId, sceneName);
    }

    public static async Transfer(unit: Unit, sceneInstanceId: number, sceneName: string) {
        // location加锁
        let unitId = unit.id;
        let unitInstanceId = unit.instanceId;
        let zone = unit.domainZone()

        let request = new M2M_UnitTransferRequest({ Entitys: [] });

        request.OldInstanceId = unitInstanceId;
        request.Unit = unit.serialize();

        for (let [_, entity] of unit.components) {
            if (TransferComponent.inst.has(entity.constructor)) {
                let bytes = entity.serialize()
                request.Entitys.push(bytes);
            }
        }

        unit.dispose();

        await LocationProxyComponent.inst.Lock(unitId, zone, unitInstanceId);
        await ActorMessageSenderComponent.inst.Call(sceneInstanceId, request);
    }
}