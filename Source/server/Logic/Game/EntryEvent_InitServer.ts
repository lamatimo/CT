import { EntryEvent } from "../../../client/assets/Bundles/Code/Logic/Game/EventType/EventTypes";
import { Scene } from "../../../client/assets/Scripts/Core/Entity/Scene";
import { AEvent } from "../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { StartMachineConfig, Tables } from "./Generate/Config/Types";
import { AppType, Options } from "../../../client/assets/Scripts/Core/Options/Options";
import { SceneFactory } from "./Helper/SceneFactory";
import { Root } from "../../../client/assets/Scripts/Core/Entity/Root";
import { ServerSceneManagerComponent } from "../Module/Scene/ServerSceneManagerComponent";
import { WatcherComponent } from "./Watcher/WatcherComponent";
import { ctLog } from "../../../client/assets/Scripts/Core/Log/Logger";
import { NetInnerComponent } from "../Module/Message/NetInnerComponent";
import { SceneType } from "../../../client/assets/Scripts/Core/Entity/SceneType";
import { ConsoleComponent } from "../Module/Console/ConsoleComponent";
import { RobotCaseComponent } from "../Module/RobotCase/RobotCaseComponent";
import { MessageTypeComponent } from "../../../client/assets/Scripts/Core/Network/MessageTypeComponent";
import { MessageDispatcherComponent } from "../../../client/assets/Bundles/Code/Logic/Module/Message/MessageDispatcherComponent";
import { ActorMessageSenderComponent } from "../Module/Actor/ActorMessageSenderComponent";
import { ActorMessageDispatcherComponent } from "../Module/Actor/ActorMessageDispatcherComponent";

@EventDecorator(EntryEvent, SceneType.Process)
class EntryEvent_InitServer extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        // 发送普通actor消息
        Root.inst.scene.addComponent(ActorMessageSenderComponent);
        Root.inst.scene.addComponent(MessageTypeComponent);
        Root.inst.scene.addComponent(MessageDispatcherComponent);
        Root.inst.scene.addComponent(ServerSceneManagerComponent);
        Root.inst.scene.addComponent(ActorMessageDispatcherComponent);

        ctLog(`启动进程=${Options.inst.process}`)

        // 测试服务端是否会挂进程
        if (Options.inst.process == 2) {
            setInterval(() => {
                ctLog(`存活心跳=${AppType[Options.inst.appType]}`)
            }, 1000 * 60)
        }

        let processConfig = Tables.StartProcessConfigCategory.get(Options.inst.process);

        switch (Options.inst.appType) {
            case AppType.Server:
                {
                    Root.inst.scene.addComponent(NetInnerComponent).init(processConfig.getInnerIPPort());

                    var processScenes = Tables.StartSceneConfigCategory.GetByProcess(Options.inst.process);

                    for (let startConfig of processScenes) {
                        await SceneFactory.CreateServerScene(ServerSceneManagerComponent.inst, startConfig.Id, startConfig.InstanceId, startConfig.Zone, startConfig.Name,
                            startConfig.Type, startConfig);
                    }

                    break;
                }
            case AppType.Watcher:
                {
                    // let startMachineConfig: StartMachineConfig = WatcherHelper.GetThisMachineConfig();
                    let watcherComponent = Root.inst.scene.addComponent(WatcherComponent);
                    watcherComponent.Start();
                    // Root.Instance.Scene.AddComponent<NetInnerComponent, IPEndPoint>(NetworkHelper.ToIPEndPoint($"{startMachineConfig.InnerIP}:{startMachineConfig.WatcherPort}"));
                    break;
                }
        }


        if (Options.inst.console) {
            Root.inst.scene.addComponent(RobotCaseComponent)
            Root.inst.scene.addComponent(ConsoleComponent)
        }
    }
}