import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { ctError, ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { IPEndPoint } from "../../../../../Scripts/Core/Network/IPEndPoint";
import { NetClientComponent } from "../../Module/Message/NetClientComponent";
import { C2R_Login, Message_TestOuter2, Message_TestOuter3, Message_TestOuter4, R2C_Login } from "../Generate/Message/OuterMessage";
import { SessionComponent } from "../Session/SessionComponent";
import pb from 'protobufjs'

export class LoginHelper {
    public static async Login(clientScene: Scene, account: string, password: string) {
        try {

            let netClientComponent = clientScene.addComponent(NetClientComponent)

            let session = netClientComponent.Create(new IPEndPoint("127.0.0.1:30002"))

            // let q = new Message_TestOuter3()

            // Message_TestOuter3.encode(q).fi

            // let q = new Message_TestOuter3
            // let u8 = Message_TestOuter3.encode(q).finish()
            // let r = new pb.Reader(u8)
            // ctLog(r.uint32())

            let response = (await session.Call(new C2R_Login({ Account: account, Password: password }))) as R2C_Login

            let sessionComponent = clientScene.getComponent(SessionComponent)

            if (!sessionComponent) {
                clientScene.addComponent(SessionComponent)
            }

            sessionComponent.Session = session;

            ctLog(response)
        }
        catch (e) {
            ctError(e);
        }
    }
}