
import { Root } from "../../../../Scripts/Core/Entity/Root";
import { Scene } from "../../../../Scripts/Core/Entity/Scene";
import { AEvent } from "../../../../Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../../Scripts/Core/EventSystem/EventDecorator";
import { EventSystem } from "../../../../Scripts/Core/EventSystem/EventSystem";
import { IdGenerater, InstanceIdStruct } from "../../../../Scripts/Core/IdGenerater/IdGenerater";
import { ctLog } from "../../../../Scripts/Core/Log/Logger";
import { Long } from "../../../../Scripts/Core/Network/Protobuf";
import { WindowBase } from "../../../../Scripts/Loader/UI/WindowBase";
import { AppStartInitFinish, EntryEvent } from "../../Logic/Game/EventType/EventTypes"
import { SceneFactory } from "../../Logic/Game/Scene/SceneFactory"
import { ClientSceneManagerComponent } from "../../Logic/Module/Scene/ClientSceneManagerComponent"
import { FairyGUIComponent } from "./UI/Generate/FairyGUIComponent";


@EventDecorator(EntryEvent)
export class EntryEvent_InitGame extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        Root.inst.scene.addComponent(ClientSceneManagerComponent);
        Root.inst.scene.addComponent(FairyGUIComponent);

        let clientScene = await SceneFactory.createClientScene(1, "Game");

        WindowBase.clientScene = clientScene;

        // for(let i = 0; i< 100; i++)
        // {
        //     // ctLog(IdGenerater.inst.GenerateId())
        //     ctLog(IdGenerater.inst.generateInstanceId())
        // }
        

        await EventSystem.inst.publishAsync(clientScene, AppStartInitFinish.create())
    }
}