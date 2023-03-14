import { M2C_CreateMyUnit, M2C_StartSceneChange } from "../../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { v3 } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Math/vec3";
import { MoveComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Move/MoveComponent";
import { Unit } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { UnitComponent } from "../../../../../../client/assets/Bundles/Code/Logic/Module/Unit/UnitComponent";
import { Entity } from "../../../../../../client/assets/Scripts/Core/Entity/Entity";
import { Scene } from "../../../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../../client/assets/Scripts/Core/Log/Logger";
import { ActorMessageHandlerDecorator } from "../../../../Module/Actor/ActorMessageHandlerDecorator";
import { AMActorRpcHandler } from "../../../../Module/Actor/AMActorRpcHandler";
import { MailBoxComponent } from "../../../../Module/Actor/MailBoxComponent";
import { LocationProxyComponent } from "../../../../Module/ActorLocation/LocationProxyComponent";
import { AOIEntity } from "../../../../Module/AOI/AOIEntity";
import { M2M_UnitTransferRequest, M2M_UnitTransferResponse } from "../../../Generate/Message/InnerMessage";
import { MessageHelper } from "../../../Helper/MessageHelper";
import { UnitHelper } from "../Unit/UnitHelper";

@ActorMessageHandlerDecorator(M2M_UnitTransferRequest, SceneType.Map, M2M_UnitTransferResponse)
export class M2M_UnitTransferRequestHandler extends AMActorRpcHandler<Scene, M2M_UnitTransferRequest, M2M_UnitTransferResponse>{
    protected async Run(scene: Scene, request: M2M_UnitTransferRequest, response: M2M_UnitTransferResponse) {
        ctLog(`开始传送处理了哦`)
        let unitComponent = scene.getComponent(UnitComponent);
        let unit = request.Unit.deserialize(Unit);
        
        unitComponent.addChild(unit);

        for (let bytes of request.Entitys)
        {
            unit.addComponent(bytes.deserialize());
        }
        
        unit.addComponent(MoveComponent);
        unit.position = v3(0,0,0)
        
        unit.addComponent(MailBoxComponent);

        // // 通知客户端开始切场景
        let m2CStartSceneChange = new M2C_StartSceneChange({SceneInstanceId : scene.instanceId, SceneName : scene.name});
        MessageHelper.SendToClient(unit, m2CStartSceneChange);
        
        // 通知客户端创建My Unit
        let m2CCreateUnits = new M2C_CreateMyUnit();
        m2CCreateUnits.Unit = UnitHelper.CreateUnitInfo(unit);
        MessageHelper.SendToClient(unit, m2CCreateUnits);
        
        // 加入aoi
        unit.addComponent(AOIEntity).init(9 * 1000, unit.position);
        
        // 解锁location，可以接收发给Unit的消息
        await LocationProxyComponent.inst.UnLock(unit.id, request.OldInstanceId, unit.instanceId);
    }
}