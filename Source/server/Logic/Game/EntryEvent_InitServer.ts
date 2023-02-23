import { EntryEvent } from "../../../client/assets/Bundles/Code/Logic/Game/EventType/EventTypes";
import { Scene } from "../../../client/assets/Scripts/Core/Entity/Scene";
import { AEvent } from "../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { ctLog } from "../../../client/assets/Scripts/Core/Log/Logger";

@EventDecorator(EntryEvent)
class EntryEvent_InitServer extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        ctLog("事件收到")
    }
}