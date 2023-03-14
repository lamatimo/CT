import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { Tables } from "../../Game/Generate/Config/Types";
import { ObjectGetRequest, ObjectGetResponse, ObjectLockRequest, ObjectUnLockRequest } from "../../Game/Generate/Message/InnerMessage";
import { ActorMessageSenderComponent } from "../Actor/ActorMessageSenderComponent";

export class LocationProxyComponent extends Entity {
    public static inst: LocationProxyComponent

    awake(): void {
        LocationProxyComponent.inst = this
    }

    destroy(): void {
        LocationProxyComponent.inst = null
    }

    private GetLocationSceneId(): number {
        return Tables.StartSceneConfigCategory.LocationConfig.InstanceId
    }

    public async Lock(key: number, instanceId: number, time: number = 60000) {
        ctLog(`location proxy lock ${key}, ${instanceId} ${TimeHelper.serverNow()}`);
        await ActorMessageSenderComponent.inst.Call(this.GetLocationSceneId(),
            new ObjectLockRequest({ Key: key, InstanceId: instanceId, Time: time }));
    }

    public async Get(key: number): Promise<number> {
        if (key == 0) {
            throw new Error("get location key 0");
        }

        let response =
            await ActorMessageSenderComponent.inst.Call(this.GetLocationSceneId(),
                new ObjectGetRequest({ Key: key })) as ObjectGetResponse;
        return response.InstanceId;
    }

    public async UnLock(key: number, oldInstanceId: number, instanceId: number) {
        ctLog(`location proxy unlock ${key}, ${instanceId} ${TimeHelper.serverNow()}`);
        await ActorMessageSenderComponent.inst.Call(this.GetLocationSceneId(),
            new ObjectUnLockRequest({ Key: key, OldInstanceId: oldInstanceId, InstanceId: instanceId }));
    }
}