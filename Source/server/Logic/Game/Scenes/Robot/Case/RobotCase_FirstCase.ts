import { Scene } from "../../../../../../client/assets/Scripts/Core/Entity/Scene";
import { InvokeDecorator } from "../../../../../../client/assets/Scripts/Core/EventSystem/InvokeDecorator";
import { ctLog } from "../../../../../../client/assets/Scripts/Core/Log/Logger";
import { ARobotCase } from "../../../../Module/RobotCase/ARobotCase";
import { RobotCase } from "../../../../Module/RobotCase/RobotCase";
import { RobotInvokeArgs } from "../../../../Module/RobotCase/RobotInvokeArgs";
import { RobotCaseType } from "../RobotCaseType";

@InvokeDecorator(RobotInvokeArgs, RobotCaseType.FirstCase)
class RobotCase_FirstCase extends ARobotCase {
    protected async Run(robotCase: RobotCase, cmdArgs: string[]) {
        let robots: Scene[] = [];

        // 创建了两个机器人，生命周期是RobotCase，RobotCase_FirstCase.Run执行结束，机器人就会删除
        await robotCase.CreateRobotWithNum(1, robots);
    }
}