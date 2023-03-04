import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector"
import { MessageType } from "./MessageType"

export function MessageDecorator(opcode: number, messageType: MessageType) {
    return function (target: Function) {
        DecoratorCollector.inst.add(DecoratorType.Message, target, messageType, opcode)
    }
}