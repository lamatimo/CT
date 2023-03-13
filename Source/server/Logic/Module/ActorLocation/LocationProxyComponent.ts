import { Unit } from "../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { Tables } from "../../Game/Generate/Config/Types";
import { ObjectLockRequest } from "../../Game/Generate/Message/InnerMessage";
import { ActorMessageSenderComponent } from "../Actor/ActorMessageSenderComponent";

export class LocationProxyComponent extends Entity {
    public static inst: LocationProxyComponent

    awake(): void {
        LocationProxyComponent.inst = this
    }

    destroy(): void {
        LocationProxyComponent.inst = null
    }

    private GetLocationSceneId(zone: number): number {
        return Tables.StartSceneConfigCategory.Locations.get(zone).InstanceId
    }

    public async Lock(key: number, zone: number, instanceId: number, time: number = 60000) {
        ctLog(`location proxy lock ${key}, ${instanceId} ${TimeHelper.serverNow()}`);
        await ActorMessageSenderComponent.inst.Call(this.GetLocationSceneId(zone),
            new ObjectLockRequest({ Key: key, InstanceId: instanceId, Time: time }));
    }
}