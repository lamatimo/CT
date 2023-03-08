import { ConsoleMode } from "../../../../Module/Console/ConsoleComponent";
import { ConsoleHandlerDecorator } from "../../../../Module/Console/ConsoleHandlerDecorator";
import { IConsoleHandler } from "../../../../Module/Console/IConsoleHandler";

@ConsoleHandlerDecorator(ConsoleMode.RobotCase)
export class RobotConsoleHandler implements IConsoleHandler{
    Run(content: string) {
        throw new Error("Method not implemented.");
    }
}