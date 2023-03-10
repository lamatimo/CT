import { C2G_LoginGate, C2G_Ping, C2R_Login, G2C_LoginGate, G2C_Ping, R2C_Login } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SessionAcceptTimeoutComponent } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/SessionAcceptTimeoutComponent";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { TimeHelper } from "../../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";

@MessageHandlerDecorator(C2G_Ping, SceneType.Gate, G2C_Ping)
export class C2G_PingHandler extends AMRpcHandler<C2G_Ping, G2C_Ping>
{
    protected async Run(session: Session, request: C2G_Ping, response: G2C_Ping) {
        response.Time = TimeHelper.serverNow()
    }
}