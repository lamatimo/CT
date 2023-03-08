
import { Root } from "../../../../Scripts/Core/Entity/Root";
import { Scene } from "../../../../Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../Scripts/Core/Entity/SceneType";
import { AEvent } from "../../../../Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../Scripts/Core/EventSystem/EventDecorator";
import { EventSystem } from "../../../../Scripts/Core/EventSystem/EventSystem";
import { WindowBase } from "../../../../Scripts/Loader/UI/WindowBase";
import { AppStartInitFinish, EntryEvent } from "../../Logic/Game/EventType/EventTypes"
import { SceneFactory } from "../../Logic/Game/Scene/SceneFactory"
import { ClientSceneManagerComponent } from "../../Logic/Module/Scene/ClientSceneManagerComponent"
import { FairyGUIComponent } from "./UI/Generate/FairyGUIComponent";


@EventDecorator(EntryEvent, SceneType.Process)
export class EntryEvent_InitGame extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        Root.inst.scene.addComponent(ClientSceneManagerComponent);
        Root.inst.scene.addComponent(FairyGUIComponent);

        let clientScene = await SceneFactory.createClientScene(1, "Game");

        WindowBase.clientScene = clientScene;


        await EventSystem.inst.publishAsync(clientScene, AppStartInitFinish.create())
    }
}