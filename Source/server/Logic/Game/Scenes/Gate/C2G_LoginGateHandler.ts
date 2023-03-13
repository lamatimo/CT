import { C2G_LoginGate, C2R_Login, G2C_LoginGate, R2C_Login } from "../../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { ErrorCode } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/ErrorCode";
import { MessageHandlerDecorator } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator";
import { Session } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import { SessionAcceptTimeoutComponent } from "../../../../../client/assets/Bundles/Code/Logic/Module/Message/SessionAcceptTimeoutComponent";
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog, ctWarn } from "../../../../../client/assets/Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { ActorMessageSenderComponent } from "../../../Module/Actor/ActorMessageSenderComponent";
import { MailBoxComponent } from "../../../Module/Actor/MailBoxComponent";
import { MailboxType } from "../../../Module/Actor/MailboxType";
import { DBManagerComponent } from "../../../Module/DB/DBManagerComponent";
import { AMRpcHandler } from "../../../Module/Message/AMRpcHandler";
import { Tables } from "../../Generate/Config/Types";
import { GateSessionKeyComponent } from "./GateSessionKeyComponent";
import { Player } from "./Player";
import { PlayerComponent } from "./PlayerComponent";
import { SessionLoginLockComponent } from "./SessionLoginLockComponent";
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

        if(session.getComponent(SessionLoginLockComponent)){
            response.Error = ErrorCode.ERR_Login_RepeatedRequestGate
            ctWarn(`玩家重复发送登录请求 account= ${account}`)
            return
        }

        session.addComponent(SessionLoginLockComponent)
        let dbComponent = await DBManagerComponent.inst.GetZoneDB(session.domainZone())

        let player = await dbComponent.Query(Player, {Account: account})
        let playerComponent = scene.getComponent(PlayerComponent);

        if(!player){
            player = playerComponent.addChild(Player).init(account)
            await dbComponent.Save(player)
        }else{
            console.log(player)
            playerComponent.addChild(player)
        }

        playerComponent.Add(player);
        session.addComponent(SessionPlayerComponent).PlayerId = player.id;
        session.addComponent(MailBoxComponent).init(MailboxType.GateSession);

        let startSceneConfigs = Tables.StartSceneConfigCategory.Maps.get(session.domainZone())

        response.Maps = []

        for (const startSceneConfig of startSceneConfigs) {
            response.Maps.push(startSceneConfig.Name)
        }

        response.PlayerId = player.id;
    }

}