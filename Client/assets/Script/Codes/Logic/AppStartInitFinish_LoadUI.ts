import { Scene } from "../../Core/Entity/Scene";
import { AEvent } from "../../Core/EventSystem/AEvent";
import { EventDecorator } from "../../Core/EventSystem/EventDecorator";
import { ctLog} from "../../Core/Log/Logger";
import { AppStartInitFinish } from "./EventTypes";

@EventDecorator(AppStartInitFinish)
export class AppStartInitFinish_LoadUI extends AEvent<AppStartInitFinish>{
    protected run(scene: Scene, args: AppStartInitFinish) {
        ctLog("显示UI了")
    }
}