import { C2R_Login, R2C_Login } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../client/assets/Scripts/Core/Log/Logger";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";

@MessageHandlerDecorator(C2R_Login, SceneType.Realm, R2C_Login)
export class C2R_LoginHandler extends AMRpcHandler<C2R_Login, R2C_Login>{
    protected Run(session: Session, request: C2R_Login, response: R2C_Login) {
        ctLog(`账号: ${request.Account}, ${request.Password}, ${request.RpcId}验证成功，现在返回一个登录码给你`)
        response.GateId = 1
        response.Key = 10086
        response.Address = '127.0.0.1:1313'
    }

}