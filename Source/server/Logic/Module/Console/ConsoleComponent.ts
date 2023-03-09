import { createInterface, Interface as RLInterface } from "readline";
import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Task } from "../../../../client/assets/Scripts/Core/Task/Task";
import { IConsoleHandler } from "./IConsoleHandler";

export class ConsoleMode {
    public static CreateRobot = "CreateRobot";
    public static RobotCase = "RobotCase";
}

export class ConsoleComponent extends Entity {
    public Handlers: Map<string, IConsoleHandler> = new Map()
    private rlInterface: RLInterface

    awake(): void {
        this.Load()

        this.rlInterface = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.question()
    }

    destroy(): void {
        this.rlInterface.close()
    }

    private Load() {
        let list = DecoratorCollector.inst.get(DecoratorType.ConsoleHandler)

        for (const args of list) {
            let handlerCtor = args[0]
            let mode = args[1]
            let handler: IConsoleHandler = new handlerCtor()

            this.Handlers.set(mode, handler)
        }
    }

    private async question() {
        let task = Task.create(String)

        this.rlInterface.question(`cmd>>`, (content) => {
            content = `RobotCase Run 1`
            task.setResult(content)
        });

        let cmd = await task
        let args = cmd.split(' ')
        let mode = args[0]

        switch (mode) {
            case 'exit':
                return
            default:
                let handler = this.Handlers.get(mode)

                if(handler){
                    handler.Run(args)
                }
                break
        }

        this.question()
    }
}