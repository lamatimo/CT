import { C2G_LoginGate, C2R_Login, G2C_LoginGate, R2C_Login } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SessionAcceptTimeoutComponent } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/SessionAcceptTimeoutComponent";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { ActorMessageSenderComponent } from "../../../Module/Actor/ActorMessageSenderComponent";
import { MailBoxComponent } from "../../../Module/Actor/MailBoxComponent";
import { MailboxType } from "../../../Module/Actor/MailboxType";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";
import { GateSessionKeyComponent } from "./GateSessionKeyComponent";
import { Player } from "./Player";
import { PlayerComponent } from "./PlayerComponent";
import { SessionPlayerComponent } from "./SessionPlayerComponent";

@MessageHandlerDecorator(C2G_LoginGate, SceneType.Gate, G2C_LoginGate)
export class C2G_LoginGateHandler extends AMRpcHandler<C2G_LoginGate, G2C_LoginGate>
{
    protected async Run(session: Session, request: C2G_LoginGate, response: G2C_LoginGate) {
        let scene = session.domainScene();
        let account = scene.getComponent(GateSessionKeyComponent).Get(request.Key);

        if (account == null) {
            response.Error = ErrorCore.ERR_ConnectGateKeyError;
            response.Message = "Gate key验证失败!";
            return;
        }

        ctLog(`${account} 连接gate成功`)

        session.removeComponent(SessionAcceptTimeoutComponent);

        let playerComponent = scene.getComponent(PlayerComponent);
        let player = playerComponent.addChild(Player)
        player.init(account)
        playerComponent.Add(player);
        session.addComponent(SessionPlayerComponent).PlayerId = player.id;
        session.addComponent(MailBoxComponent).init(MailboxType.GateSession);

        response.PlayerId = player.id;
    }

}