
import { Root } from "../../../../Scripts/Core/Entity/Root";
import { Scene } from "../../../../Scripts/Core/Entity/Scene";
import { AEvent } from "../../../../Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../Scripts/Core/EventSystem/EventDecorator";
import { EventSystem } from "../../../../Scripts/Core/EventSystem/EventSystem";
import { AppStartInitFinish, EntryEvent } from "../../Logic/Game/EventType/EventTypes"
import { SceneFactory } from "../../Logic/Game/Scene/SceneFactory"
import { ClientSceneManagerComponent } from "../../Logic/Module/Scene/ClientSceneManagerComponent"


@EventDecorator(EntryEvent)
export class EntryEvent_InitGame extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        Root.inst.scene.addComponent(ClientSceneManagerComponent);

        let clientScene = await SceneFactory.createClientScene(1, "Game");

        await EventSystem.inst.publishAsync(clientScene, AppStartInitFinish.create())
    }
}