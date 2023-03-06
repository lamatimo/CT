
import { ConfigComponent } from "../../../Scripts/Core/Config/ConfigComponent"
import { Root } from "../../../Scripts/Core/Entity/Root"
import { EventSystem } from "../../../Scripts/Core/EventSystem/EventSystem"
import { NetServices } from "../../../Scripts/Core/Network/NetServices"
import { Game } from "../../../Scripts/Core/Singleton/Game"
import { TimerComponent } from "../../../Scripts/Core/Timer/TimerComponent"
import { EntryEvent } from "./Game/EventType/EventTypes"


export class Entry {
    public static async start() {
        Game.addSingleton(EventSystem)
        Game.addSingleton(NetServices)
        Game.addSingleton(Root)
        
        await Game.addSingleton(ConfigComponent).loadAsync()
        
        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    }
}
