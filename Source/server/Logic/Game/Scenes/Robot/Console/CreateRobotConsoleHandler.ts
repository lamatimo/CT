import { Options } from "../../../../../../client/assets/Scripts/Core/Options/Options";
import { ConsoleMode } from "../../../../Module/Console/ConsoleComponent";
import { ConsoleHandlerDecorator } from "../../../../Module/Console/ConsoleHandlerDecorator";
import { IConsoleHandler } from "../../../../Module/Console/IConsoleHandler";
import { StartSceneConfig, Tables } from "../../../Generate/Config/Types";

@ConsoleHandlerDecorator(ConsoleMode.CreateRobot)
export class CreateRobotConsoleHandler implements IConsoleHandler {
    Run(args: string[]) {
        let thisProcessRobotScenes: StartSceneConfig[] = []
        let num = parseInt(args[1])
        let robotSceneConfigs = Tables.StartSceneConfigCategory.Robots;

        for (let robotSceneConfig of robotSceneConfigs) {
            if (robotSceneConfig.Process != Options.inst.process) {
                continue;
            }

            thisProcessRobotScenes.push(robotSceneConfig);
        }

        console.log(num)

        // 创建机器人
        for (let i = 0; i < num; ++i) {
            let index = i % thisProcessRobotScenes.length;
            let robotSceneConfig = thisProcessRobotScenes[index];
            // 创建机器人跑流程 暂时先不做
            // Scene robotScene = ServerSceneManagerComponent.Instance.Get(robotSceneConfig.Id);
            // RobotManagerComponent robotManagerComponent = robotScene.GetComponent<RobotManagerComponent>();
            // Scene robot = await robotManagerComponent.NewRobot(Options.Instance.Process * 10000 + i);
            // robot.AddComponent<AIComponent, int>(1);
            // Log.Console($"create robot {robot.Zone}");
            // await TimerComponent.Instance.WaitAsync(2000);
        }
    }
}