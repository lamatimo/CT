import { C2R_Login, R2C_Login } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../client/assets/Scripts/Core/Log/Logger";
import { ActorMessageSenderComponent } from "../../../Module/Actor/ActorMessageSenderComponent";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";
import { G2R_GetLoginKey, R2G_GetLoginKey } from "../../Generate/Message/InnerMessage";
import { RealmGateAddressHelper } from "./RealmGateAddressHelper";

@MessageHandlerDecorator(C2R_Login, SceneType.Realm, R2C_Login)
export class C2R_LoginHandler extends AMRpcHandler<C2R_Login, R2C_Login>{
    protected async Run(session: Session, request: C2R_Login, response: R2C_Login) {
        let config = RealmGateAddressHelper.GetGate(session.domainZone());
        ctLog('拿到gate配置')
        ctLog(config)
        ctLog(`[realm]请求账号: ${request.Account}, ${request.Password}, ${request.RpcId}`)

        // 向gate请求一个key,客户端可以拿着这个key连接gate
        let g2RGetLoginKey = (await ActorMessageSenderComponent.inst.Call(
            config.InstanceId, new R2G_GetLoginKey({ Account: request.Account }))) as G2R_GetLoginKey;

        response.GateId = g2RGetLoginKey.GateId
        response.Key = g2RGetLoginKey.Key
        response.Address = config.getInnerIPOutPort().toString()
    }

}