import pb from "protobufjs"
import { DecoratorCollector, DecoratorType } from "../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector"
import { SceneType } from "../../../../client/assets/Scripts/Core/Entity/SceneType"

export function ActorMessageHandlerDecorator(messageCtor: new () => pb.Message, sceneType: SceneType, responseCtor: new () => pb.Message = null) {
    return function (msgHandlerCtor: Function) {
        DecoratorCollector.inst.add(DecoratorType.ActorMessageHandler, msgHandlerCtor, messageCtor, sceneType, responseCtor)
    }
}