import { Scene } from "../../Core/Entity/Scene";
import { AEvent } from "../../Core/EventSystem/AEvent";
import { EventDecorator } from "../../Core/EventSystem/EventDecorator";
import { Logger } from "../../Core/Log/Logger";
import { EntryEvent } from "./EventTypes";

@EventDecorator(EntryEvent)
export class EntryEvent_InitGame extends AEvent<EntryEvent>{
    protected run(scene: Scene, args: EntryEvent) {
        Logger.inst.log("静态事件回调")
    }
  
}