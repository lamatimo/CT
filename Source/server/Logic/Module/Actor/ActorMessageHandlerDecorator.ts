import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector"
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType"
import { Message } from "../../../../client/assets/Scripts/Core/Message/Message"

export function ActorMessageHandlerDecorator(messageCtor: new () => Message, sceneType: SceneType, responseCtor: new () => Message = null) {
    return function (msgHandlerCtor: Function) {
        DecoratorCollector.inst.add(DecoratorType.ActorMessageHandler, msgHandlerCtor, messageCtor, sceneType, responseCtor)
    }
}