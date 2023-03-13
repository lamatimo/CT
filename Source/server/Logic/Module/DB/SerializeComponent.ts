import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";

export class SerializeComponent extends Entity {
    public static inst: SerializeComponent

    // 注意避免同名类
    private name2CtorMap: Map<string, new () => any> = new Map

    awake(): void {
        let list1 = DecoratorCollector.inst.get(DecoratorType.Transfer)

        for (const args of list1) {
            let ctor = args[0]

            this.name2CtorMap.set(ctor.name, ctor)
        }

        let list2 = DecoratorCollector.inst.get(DecoratorType.DB)

        for (const args of list2) {
            let ctor = args[0]

            this.name2CtorMap.set(ctor.name, ctor)
        }


        SerializeComponent.inst = this
    }

    destroy(): void {
        SerializeComponent.inst = null
    }

    getCtor(name: string): new () => any {
        return this.name2CtorMap.get(name)
    }
}