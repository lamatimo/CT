import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector"
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType"
import { Message } from "../../../../../Scripts/Core/Message/Message"

export function MessageHandlerDecorator(messageCtor: new () => Message, sceneType: SceneType, responseCtor: new () => Message = null) {
    return function (msgHandlerCtor: Function) {
        DecoratorCollector.inst.add(DecoratorType.MessageHandler, msgHandlerCtor, messageCtor, sceneType, responseCtor)
    }
}