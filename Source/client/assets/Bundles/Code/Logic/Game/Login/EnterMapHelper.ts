import { Scene } from "../../../../../Scripts/Core/Entity/Scene";
import { EventSystem } from "../../../../../Scripts/Core/EventSystem/EventSystem";
import { ctError } from "../../../../../Scripts/Core/Log/Logger";
import { ObjectWait } from "../../Module/ObjectWait/ObjectWait";
import { EnterMapFinish } from "../EventType/EventTypes";
import { C2G_EnterMap, G2C_EnterMap } from "../Generate/Message/OuterMessage";
import { SessionComponent } from "../Session/SessionComponent";
import { PlayerComponent } from "../Unit/PlayerComponent";
import { Wait_SceneChangeFinish } from "../WaitTypes";

export class EnterMapHelper {
    public static async EnterMapAsync(clientScene: Scene, mapName: string) {
        try {
            let g2CEnterMap = await clientScene.getComponent(SessionComponent).Session.Call(new C2G_EnterMap({ MapName: mapName })) as G2C_EnterMap;
            clientScene.getComponent(PlayerComponent).MyId = g2CEnterMap.MyId;

            // 等待场景切换完成
            await clientScene.getComponent(ObjectWait).Wait(Wait_SceneChangeFinish);

            EventSystem.inst.publishAsync(clientScene, EnterMapFinish.create());
        }
        catch (e) {
            ctError(e);
        }
    }
}