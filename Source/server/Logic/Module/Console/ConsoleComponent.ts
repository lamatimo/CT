import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { IConsoleHandler } from "./IConsoleHandler";

export class ConsoleMode {
    public static CreateRobot = "CreateRobot";
    public static RobotCase = "RobotCase";
}

export class ConsoleComponent extends Entity {
    public Handlers: Map<string, IConsoleHandler> = new Map()

    public Load()
    {
        // HashSet<Type> types = EventSystem.Instance.GetTypes(typeof (ConsoleHandlerAttribute));

        // foreach (Type type in types)
        // {
        //     object[] attrs = type.GetCustomAttributes(typeof(ConsoleHandlerAttribute), false);
        //     if (attrs.Length == 0)
        //     {
        //         continue;
        //     }

        //     ConsoleHandlerAttribute consoleHandlerAttribute = (ConsoleHandlerAttribute)attrs[0];

        //     object obj = Activator.CreateInstance(type);

        //     IConsoleHandler iConsoleHandler = obj as IConsoleHandler;
        //     if (iConsoleHandler == null)
        //     {
        //         throw new Exception($"ConsoleHandler handler not inherit IConsoleHandler class: {obj.GetType().FullName}");
        //     }
        //     this.Handlers.Add(consoleHandlerAttribute.Mode, iConsoleHandler);
        // }
    }
}