import { Message } from "protobufjs"
import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector"
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType"

export function MessageHandlerDecorator(messageCtor: new () => Message, sceneType: SceneType) {
    return function (msgHandlerCtor: Function) {
        DecoratorCollector.inst.add(DecoratorType.MessageHandler, msgHandlerCtor, messageCtor, sceneType)
    }
}