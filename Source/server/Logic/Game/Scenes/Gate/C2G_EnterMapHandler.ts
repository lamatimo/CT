import { C2G_EnterMap, G2C_EnterMap } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { IdGenerater } from "../../../../../client/assets/Scripts/Core/IdGenerater/IdGenerater";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";
import { Tables, UnitType } from "../../Generate/Config/Types";
import { SceneFactory } from "../../Helper/SceneFactory";
import { TransferHelper } from "../Map/Transfer/TransferHelper";
import { UnitFactory } from "../Map/Unit/UnitFactory";
import { UnitGateComponent } from "../Map/Unit/UnitGateComponent";
import { GateMapComponent } from "./GateMapComponent";
import { SessionPlayerComponent } from "./SessionPlayerComponent";

@MessageHandlerDecorator(C2G_EnterMap, SceneType.Gate, G2C_EnterMap)
export class C2G_EnterMapHandler extends AMRpcHandler<C2G_EnterMap, G2C_EnterMap>
{
    protected async Run(session: Session, request: C2G_EnterMap, response: G2C_EnterMap) {
        let player = session.getComponent(SessionPlayerComponent).GetMyPlayer();
        // 在Gate上动态创建一个Map Scene，把Unit从DB中加载放进来，然后传送到真正的Map中，这样登陆跟传送的逻辑就完全一样了
        let gateMapComponent = player.addComponent(GateMapComponent);
        gateMapComponent.Scene = await SceneFactory.CreateServerScene(gateMapComponent, player.id, IdGenerater.inst.generateInstanceId(), gateMapComponent.domainZone(), "GateMap", SceneType.Map);

        let scene = gateMapComponent.Scene;

        // 这里可以从DB中加载Unit
        let unit = UnitFactory.Create(scene, player.id, UnitType.Player);
        unit.addComponent(UnitGateComponent).init(session.instanceId);

        let startSceneConfig = Tables.StartSceneConfigCategory.GetBySceneName(session.domainZone(), request.MapName);
        response.MyId = player.id;

        // 等到一帧的最后面再传送，先让G2C_EnterMap返回，否则传送消息可能比G2C_EnterMap还早
        TransferHelper.TransferAtFrameFinish(unit, startSceneConfig.InstanceId, startSceneConfig.Name);
    }

}