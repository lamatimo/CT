import { Scene } from "../../../../../client/assets/Scripts/Core/Entity/Scene"
import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType"
import { RandomGenerator } from "../../../../../client/assets/Scripts/Core/Helper/RandomGenerator"
import { ctLog } from "../../../../../client/assets/Scripts/Core/Log/Logger"
import { ActorMessageHandlerDecorator } from "../../../Module/Actor/ActorMessageHandlerDecorator"
import { AMActorRpcHandler } from "../../../Module/Actor/AMActorRpcHandler"
import { G2R_GetLoginKey, R2G_GetLoginKey } from "../../Generate/Message/InnerMessage"
import { GateSessionKeyComponent } from "./GateSessionKeyComponent"

@ActorMessageHandlerDecorator(R2G_GetLoginKey, SceneType.Gate, G2R_GetLoginKey)
export class R2G_GetLoginKeyHandler extends AMActorRpcHandler<Scene, R2G_GetLoginKey, G2R_GetLoginKey>{
    protected async Run(scene: Scene, request: R2G_GetLoginKey, response: G2R_GetLoginKey) {
        ctLog(`收到了realm的消息`)
        let key = RandomGenerator.RandomInt(1, 9999999999);
        scene.getComponent(GateSessionKeyComponent).Add(key, request.Account);
        response.Key = key;
        response.GateId = scene.id;
    }
}