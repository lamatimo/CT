import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { EntitySceneFactory } from "../../../../client/assets/Scripts/Core/Entity/EntitySceneFactory";
import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType";
import { MailBoxComponent } from "../../Module/Actor/MailBoxComponent";
import { MailboxType } from "../../Module/Actor/MailboxType";
import { NetServerComponent } from "../../Module/Message/NetServerComponent";
import { StartSceneConfig } from "../Generate/Config/Types";
import { GateSessionKeyComponent } from "../Scenes/Gate/GateSessionKeyComponent";

export class SceneFactory {
    public static async CreateServerScene(parent: Entity, id: number, instanceId: number, zone: number, name: string, sceneType: SceneType, startSceneConfig: StartSceneConfig = null): Promise<Scene> {
        let scene = EntitySceneFactory.createSceneWithId(id, instanceId, zone, sceneType, name, parent);

        scene.addComponent(MailBoxComponent).init(MailboxType.UnOrderMessageDispatcher);

        switch (scene.sceneType) {
            case SceneType.Realm:
                scene.addComponent(NetServerComponent).init(startSceneConfig.getOuterIPPort());
                break;
            case SceneType.Gate:
                scene.addComponent(NetServerComponent).init(startSceneConfig.getOuterIPPort());
                // scene.AddComponent<PlayerComponent>();
                scene.addComponent(GateSessionKeyComponent);
                break;
            case SceneType.Map:
                // scene.AddComponent<UnitComponent>();
                // scene.AddComponent<AOIManagerComponent>();
                break;
            case SceneType.Location:
                // scene.AddComponent<LocationComponent>();
                break;
        }

        return scene;
    }
}