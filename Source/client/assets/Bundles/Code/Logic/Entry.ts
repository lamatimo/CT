
import { Root } from "../../../Scripts/Core/Entity/Root"
import { EventSystem } from "../../../Scripts/Core/EventSystem/EventSystem"
import { ctLog } from "../../../Scripts/Core/Log/Logger"
import { Game } from "../../../Scripts/Core/Singleton/Game"
import { EntryEvent } from "./Game/EventType/EventTypes"


export class Entry {
    public static async start() {
        Game.addSingleton(EventSystem)
        Game.addSingleton(Root)
        
        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    }
}
