import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { ctError, ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { IPEndPoint } from "../../../../../Scripts/Core/Network/IPEndPoint";
import { NetClientComponent } from "../../Module/Message/NetClientComponent";
import { C2G_LoginGate, C2R_Login, G2C_LoginGate, R2C_Login } from "../Generate/Message/OuterMessage";
import { MapListComponent } from "../Map/MapListComponent";
import { PingComponent } from "../Ping/PingComponent";
import { SessionComponent } from "../Session/SessionComponent";

export class LoginHelper {
    public static async Login(clientScene: Scene, account: string, password: string) {
        try {

            let netClientComponent = clientScene.addComponent(NetClientComponent)
            let realmSession = netClientComponent.Create(new IPEndPoint("127.0.0.1:30002"))
            let r2CLogin = (await realmSession.Call(new C2R_Login({ Account: account, Password: password }))) as R2C_Login

            realmSession.dispose()

            let gateSession = netClientComponent.Create(new IPEndPoint(r2CLogin.Address))
            let g2cLoginGate = (await gateSession.Call(new C2G_LoginGate({ Key: r2CLogin.Key, GateId: r2CLogin.GateId }))) as G2C_LoginGate

            let sessionComponent = clientScene.getComponent(SessionComponent)

            if (!sessionComponent) {
                sessionComponent = clientScene.addComponent(SessionComponent)
            }

            clientScene.addComponent(MapListComponent).list = g2cLoginGate.Maps
            gateSession.addComponent(PingComponent)
            sessionComponent.Session = gateSession;
        }
        catch (e) {
            ctError(e);
        }
    }
}