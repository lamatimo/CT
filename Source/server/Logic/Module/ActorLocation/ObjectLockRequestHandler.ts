import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { ObjectLockRequest, ObjectLockResponse } from "../../Game/Generate/Message/InnerMessage";
import { ActorMessageHandlerDecorator } from "../Actor/ActorMessageHandlerDecorator";
import { AMActorRpcHandler } from "../Actor/AMActorRpcHandler";
import { LocationComponent } from "./LocationComponent";

@ActorMessageHandlerDecorator(ObjectLockRequest, SceneType.Location, ObjectLockResponse)
export class ObjectLockRequestHandler extends AMActorRpcHandler<Scene, ObjectLockRequest, ObjectLockResponse>{
    protected async Run(scene: Scene, request: ObjectLockRequest, response: ObjectLockResponse) {
        ctLog(`锁住对象${request.InstanceId}`)
        await scene.getComponent(LocationComponent).Lock(request.Key, request.InstanceId, request.Time);
    }
}