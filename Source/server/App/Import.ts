// 不要手动添加 运行根目录脚本自动引入
import '../../client/assets/Bundles/Code/Logic/Entry';
import '../../client/assets/Bundles/Code/Logic/Game/EventType/EventTypes';
import '../../client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage';
import '../../client/assets/Bundles/Code/Logic/Game/Login/LoginHelper';
import '../../client/assets/Bundles/Code/Logic/Game/Scene/SceneFactory';
import '../../client/assets/Bundles/Code/Logic/Game/Session/SessionComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage';
import '../../client/assets/Bundles/Code/Logic/Module/ActorLocation/ActorResponse';
import '../../client/assets/Bundles/Code/Logic/Module/ActorLocation/IActorLocationMessage';
import '../../client/assets/Bundles/Code/Logic/Module/Entity/EntityExtension';
import '../../client/assets/Bundles/Code/Logic/Module/Message/AMHandler';
import '../../client/assets/Bundles/Code/Logic/Module/Message/IMessage';
import '../../client/assets/Bundles/Code/Logic/Module/Message/IMHandler';
import '../../client/assets/Bundles/Code/Logic/Module/Message/MessageDispatcherComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Message/MessageHandlerDecorator';
import '../../client/assets/Bundles/Code/Logic/Module/Message/NetClientComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeHelper';
import '../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeTypeComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Message/ResponseTypeDecorator';
import '../../client/assets/Bundles/Code/Logic/Module/Message/Session';
import '../../client/assets/Bundles/Code/Logic/Module/Message/SessionAcceptTimeoutComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Message/SessionIdleCheckerComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Scene/ClientSceneManagerComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Scene/CurrentScenesComponent';
import '../../client/assets/Bundles/Code/Logic/Module/Scene/SceneExtension';
import '../../client/assets/Scripts/Core/Config/ConfigComponent';
import '../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock';
import '../../client/assets/Scripts/Core/Ctor/CtorCollector';
import '../../client/assets/Scripts/Core/Decorator/DecoratorCollector';
import '../../client/assets/Scripts/Core/DoubleMap';
import '../../client/assets/Scripts/Core/Entity/Entity';
import '../../client/assets/Scripts/Core/Entity/EntityExtension';
import '../../client/assets/Scripts/Core/Entity/EntitySceneFactory';
import '../../client/assets/Scripts/Core/Entity/Root';
import '../../client/assets/Scripts/Core/Entity/Scene';
import '../../client/assets/Scripts/Core/Entity/SceneType';
import '../../client/assets/Scripts/Core/EventSystem/AEvent';
import '../../client/assets/Scripts/Core/EventSystem/EventDecorator';
import '../../client/assets/Scripts/Core/EventSystem/EventSystem';
import '../../client/assets/Scripts/Core/EventSystem/EventType';
import '../../client/assets/Scripts/Core/EventSystem/IInvoke';
import '../../client/assets/Scripts/Core/EventSystem/InstanceQueueIndex';
import '../../client/assets/Scripts/Core/EventSystem/InvokeDecorator';
import '../../client/assets/Scripts/Core/EventSystem/InvokeType';
import '../../client/assets/Scripts/Core/Helper/JsHelper';
import '../../client/assets/Scripts/Core/IdGenerater/IdGenerater';
import '../../client/assets/Scripts/Core/Log/ILog';
import '../../client/assets/Scripts/Core/Log/Logger';
import '../../client/assets/Scripts/Core/MultiMap';
import '../../client/assets/Scripts/Core/Network/AChannel';
import '../../client/assets/Scripts/Core/Network/AService';
import '../../client/assets/Scripts/Core/Network/ErrorCore';
import '../../client/assets/Scripts/Core/Network/IPEndPoint';
import '../../client/assets/Scripts/Core/Network/IWebSocket';
import '../../client/assets/Scripts/Core/Network/MessageDecorator';
import '../../client/assets/Scripts/Core/Network/MessageType';
import '../../client/assets/Scripts/Core/Network/MessageTypeComponent';
import '../../client/assets/Scripts/Core/Network/NetServices';
import '../../client/assets/Scripts/Core/Network/OpcodeRangeDefine';
import '../../client/assets/Scripts/Core/Network/ServiceType';
import '../../client/assets/Scripts/Core/Network/WChannel';
import '../../client/assets/Scripts/Core/Network/WService';
import '../../client/assets/Scripts/Core/ObjectPool/ObjectPool';
import '../../client/assets/Scripts/Core/Options/Options';
import '../../client/assets/Scripts/Core/Singleton/Game';
import '../../client/assets/Scripts/Core/Singleton/Singleton';
import '../../client/assets/Scripts/Core/Singleton/SingletonExtension';
import '../../client/assets/Scripts/Core/Task/CancellationToken';
import '../../client/assets/Scripts/Core/Task/Task';
import '../../client/assets/Scripts/Core/Time/TimeHelper';
import '../../client/assets/Scripts/Core/Time/TimeInfo';
import '../../client/assets/Scripts/Core/Timer/TimerComponent';
import '../Logic/Game/EntryEvent_InitServer';
import '../Logic/Game/Generate/Config/StartProcessConfigExtension';
import '../Logic/Game/Generate/Config/StartSceneConfigExtension';
import '../Logic/Game/Generate/Config/Types';
import '../Logic/Game/Generate/Message/InnerMessage';
import '../Logic/Game/Helper/SceneFactory';
import '../Logic/Game/LoadAllConfigBytesEventHandler';
import '../Logic/Game/Scenes/Realm/C2R_LoginHandler';
import '../Logic/Game/Scenes/Robot/Case/RobotCase_FirstCase';
import '../Logic/Game/Scenes/Robot/Console/CreateRobotConsoleHandler';
import '../Logic/Game/Scenes/Robot/Console/RobotCaseConsoleHandler';
import '../Logic/Game/Scenes/Robot/RobotCaseType';
import '../Logic/Game/Session/NetServerComponentOnReadEvent';
import '../Logic/Game/Watcher/WatcherComponent';
import '../Logic/Game/Watcher/WatcherHelper';
import '../Logic/Module/Actor/ActorHelper';
import '../Logic/Module/Actor/ActorMessageSender';
import '../Logic/Module/Actor/ActorMessageSenderComponent';
import '../Logic/Module/Actor/AMActorRpcHandler';
import '../Logic/Module/Actor/IMActorHandler';
import '../Logic/Module/Console/ConsoleComponent';
import '../Logic/Module/Console/ConsoleHandlerDecorator';
import '../Logic/Module/Console/IConsoleHandler';
import '../Logic/Module/Message/AMRpcHandler';
import '../Logic/Module/Message/NetInnerComponent';
import '../Logic/Module/Message/NetServerComponent';
import '../Logic/Module/Network/NetworkHelper';
import '../Logic/Module/Options/OptionsExtension';
import '../Logic/Module/RobotCase/ARobotCase';
import '../Logic/Module/RobotCase/RobotCase';
import '../Logic/Module/RobotCase/RobotCaseComponent';
import '../Logic/Module/RobotCase/RobotInvokeArgs';
import '../Logic/Module/Scene/ServerSceneManagerComponent';
