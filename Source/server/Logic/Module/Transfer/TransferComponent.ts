import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";

export class TransferComponent extends Entity {
    public static inst: TransferComponent
    private transferCom: Set<new () => Entity> = new Set

    awake(): void {
        let list = DecoratorCollector.inst.get(DecoratorType.Transfer)

        for (const args of list) {
            let ctor = args[0]

            this.transferCom.add(ctor)
        }

        TransferComponent.inst = this
    }

    destroy(): void {
        TransferComponent.inst = null
    }

    has(ctor: any): boolean {
        return this.transferCom.has(ctor as new () => Entity)
    }
}