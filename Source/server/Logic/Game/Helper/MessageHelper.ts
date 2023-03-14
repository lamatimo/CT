import { M2C_CreateUnits, M2C_RemoveUnits } from "../../../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage";
import { IActorMessage, IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage";
import { IActorLocationMessage, IActorLocationRequest } from "../../../../client/assets/Bundles/Code/Logic/Module/ActorLocation/IActorLocationMessage";
import { Unit } from "../../../../client/assets/Bundles/Code/Logic/Module/Unit/Unit";
import { ActorMessageSenderComponent } from "../../Module/Actor/ActorMessageSenderComponent";
import { ActorLocationSenderComponent } from "../../Module/ActorLocation/ActorLocationSenderComponent";
import { UnitGateComponent } from "../Scenes/Map/Unit/UnitGateComponent";
import { UnitHelper } from "../Scenes/Map/Unit/UnitHelper";

export class MessageHelper {
    public static NoticeUnitAdd(unit: Unit, sendUnit: Unit) {
        let createUnits = new M2C_CreateUnits({ Units: [] });
        createUnits.Units.push(UnitHelper.CreateUnitInfo(sendUnit));
        MessageHelper.SendToClient(unit, createUnits);
    }

    public static NoticeUnitRemove(unit: Unit, sendUnit: Unit) {
        let removeUnits = new M2C_RemoveUnits({ Units: [] });
        removeUnits.Units.push(sendUnit.id);
        MessageHelper.SendToClient(unit, removeUnits);
    }

    public static Broadcast(unit: Unit, message: IActorMessage) {
        let dict = unit.GetBeSeePlayers();
        // 网络底层做了优化，同一个消息不会多次序列化
        for (let [_, u] of dict) {
            ActorMessageSenderComponent.inst.Send(u.Unit.getComponent(UnitGateComponent).GateSessionActorId, message);
        }
    }

    public static SendToClient(unit: Unit, message: IActorMessage) {
        this.SendActor(unit.getComponent(UnitGateComponent).GateSessionActorId, message);
    }


    /// <summary>
    /// 发送协议给ActorLocation
    /// </summary>
    /// <param name="id">注册Actor的Id</param>
    /// <param name="message"></param>
    public static SendToLocationActor(id: number, message: IActorLocationMessage) {
        ActorLocationSenderComponent.inst.Send(id, message);
    }

    /// <summary>
    /// 发送协议给Actor
    /// </summary>
    /// <param name="actorId">注册Actor的InstanceId</param>
    /// <param name="message"></param>
    public static SendActor(actorId: number, message: IActorMessage) {
        ActorMessageSenderComponent.inst.Send(actorId, message);
    }

    /// <summary>
    /// 发送RPC协议给Actor
    /// </summary>
    /// <param name="actorId">注册Actor的InstanceId</param>
    /// <param name="message"></param>
    /// <returns></returns>
    public static async CallActor(actorId: number, message: IActorRequest): Promise<IActorResponse> {
        return await ActorMessageSenderComponent.inst.Call(actorId, message);
    }

    /// <summary>
    /// 发送RPC协议给ActorLocation
    /// </summary>
    /// <param name="id">注册Actor的Id</param>
    /// <param name="message"></param>
    /// <returns></returns>
    public static async CallLocationActor(id: number, message: IActorLocationRequest): Promise<IActorResponse> {
        return await ActorLocationSenderComponent.inst.Call(id, message);
    }
}