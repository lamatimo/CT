import { Root } from "../../Core/Entity/Root";
import { EventSystem } from "../../Core/EventSystem/EventSystem";
import { Logger } from "../../Core/Log/Logger";
import { EntryEvent } from "./EventTypes";

export class Entry{
    public static async start(){
        Logger.inst.log("发送事件1")
        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create(EntryEvent))
        Logger.inst.log("发送事件2")
        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create(EntryEvent))
        Logger.inst.log("发送事件3")
        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create(EntryEvent))
    }
}