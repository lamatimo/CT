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
import { DBManagerComponent } from "../Module/DB/DBManagerComponent";
import { TransferComponent } from "../Module/Transfer/TransferComponent";
import { SerializeComponent } from "../Module/DB/SerializeComponent";
import { LocationProxyComponent } from "../Module/ActorLocation/LocationProxyComponent";
import { OpcodeTypeComponent } from "../../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeTypeComponent";

@EventDecorator(EntryEvent, SceneType.Process)
class EntryEvent_InitServer extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        // ????????????actor??????
        Root.inst.scene.addComponent(ActorMessageSenderComponent);
        Root.inst.scene.addComponent(MessageTypeComponent);
        Root.inst.scene.addComponent(MessageDispatcherComponent);
        Root.inst.scene.addComponent(ServerSceneManagerComponent);
        Root.inst.scene.addComponent(ActorMessageDispatcherComponent);
        Root.inst.scene.addComponent(DBManagerComponent);
        Root.inst.scene.addComponent(TransferComponent);
        Root.inst.scene.addComponent(SerializeComponent);
        Root.inst.scene.addComponent(LocationProxyComponent);
        Root.inst.scene.addComponent(OpcodeTypeComponent);

        ctLog(`????????????=${Options.inst.process}`)

        // ?????????????????????????????????
        if (Options.inst.process == 2) {
            setInterval(() => {
                ctLog(`????????????=${AppType[Options.inst.appType]}`)
            }, 1000 * 60)
        }

        switch (Options.inst.appType) {
            case AppType.Server:
                {
                    let processConfig = Tables.StartProcessConfigCategory.getStartProcessConfig(Options.inst.process);
                    Root.inst.scene.addComponent(NetInnerComponent).init(processConfig.getInnerIPPort());

                    var processScenes = Tables.StartSceneConfigCategory.GetByProcess(Options.inst.process);

                    for (let startConfig of processScenes) {
                        await SceneFactory.CreateServerScene(ServerSceneManagerComponent.inst, startConfig.Id, startConfig.InstanceId, startConfig.Name,
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