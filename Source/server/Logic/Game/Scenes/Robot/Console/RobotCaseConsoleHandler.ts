import { EventSystem } from "../../../../../../client/assets/Scripts/Core/EventSystem/EventSystem";
import { ConsoleMode } from "../../../../Module/Console/ConsoleComponent";
import { ConsoleHandlerDecorator } from "../../../../Module/Console/ConsoleHandlerDecorator";
import { IConsoleHandler } from "../../../../Module/Console/IConsoleHandler";
import { RobotInvokeArgs } from "../../../../Module/RobotCase/RobotInvokeArgs";

@ConsoleHandlerDecorator(ConsoleMode.RobotCase)
export class RobotCaseConsoleHandler implements IConsoleHandler {
    Run(args: string[]) {
        let cmd = args[1]

        switch (cmd) {
            case 'Run':
                let caseType = parseInt(args[2])
                EventSystem.inst.Invoke(caseType, new RobotInvokeArgs(args))
                break;

            default:
                break;
        }
    }
}