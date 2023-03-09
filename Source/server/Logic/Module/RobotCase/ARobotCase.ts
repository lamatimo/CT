import { AInvokeHandler } from "../../../../client/assets/Scripts/Core/EventSystem/IInvoke";
import { ctError, ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { RobotCase } from "./RobotCase";
import { RobotCaseComponent } from "./RobotCaseComponent";
import { RobotInvokeArgs } from "./RobotInvokeArgs";

export abstract class ARobotCase extends AInvokeHandler<RobotInvokeArgs, Promise<void>>{
    protected abstract Run(robotCase: RobotCase, cmdArgs: string[]): Promise<void>;

    public async Handle(args: RobotInvokeArgs) {

        let robotCase = await RobotCaseComponent.inst.New();

        try {
            await this.Run(robotCase, args.cmdArgs);
        }
        catch (e) {
            ctError(`${robotCase.domainZone()} ${e}`);
            ctLog(`RobotCase Error ${this.constructor.name}:\n\t${e}`);
        }
    }
}