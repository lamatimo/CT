import { Scene } from "../../../../../../../Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../../../../Scripts/Core/Entity/SceneType";
import { AEvent } from "../../../../../../../Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../../../../Scripts/Core/EventSystem/EventDecorator";
import { WindowComponent } from "../../../../../../../Scripts/Loader/UI/WindowComponent";
import { AppStartInitFinish } from "../../../../../Logic/Game/EventType/EventTypes";
import { LoginWin } from "../LoginWin";

@EventDecorator(AppStartInitFinish, SceneType.Client)
export class AppStartInitFinish_ShowLogin extends AEvent<AppStartInitFinish>{
    protected async run(scene: Scene, args: AppStartInitFinish) {
        await WindowComponent.inst.loadPackageAsync("Common")
        await WindowComponent.inst.show(LoginWin)
    }
}