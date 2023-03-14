import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import {  ObjectUnLockRequest, ObjectUnLockResponse } from "../../Game/Generate/Message/InnerMessage";
import { ActorMessageHandlerDecorator } from "../Actor/ActorMessageHandlerDecorator";
import { AMActorRpcHandler } from "../Actor/AMActorRpcHandler";
import { LocationComponent } from "./LocationComponent";

@ActorMessageHandlerDecorator(ObjectUnLockRequest, SceneType.Location, ObjectUnLockResponse)
export class ObjectUnLockRequestHandler extends AMActorRpcHandler<Scene, ObjectUnLockRequest, ObjectUnLockResponse>{
    protected async Run(scene: Scene, request: ObjectUnLockRequest, response: ObjectUnLockResponse) {
        ctLog(`解锁对象${request.InstanceId}`)
        scene.getComponent(LocationComponent).UnLock(request.Key, request.OldInstanceId, request.InstanceId);
    }
}