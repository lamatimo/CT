import { Root } from "../Core/Entity/Root"
import { EventSystem } from "../Core/EventSystem/EventSystem"
import { Game } from "../Core/Singleton/Game"
import { EntryEvent } from "./Logic/Game/EventType/EventTypes"


export class Entry {
    public static async start() {
        Game.addSingleton(Root)

        await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    }
}
