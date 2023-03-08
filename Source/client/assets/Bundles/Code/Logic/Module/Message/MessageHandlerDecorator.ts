import pb from "protobufjs"
import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector"
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType"

export function MessageHandlerDecorator(messageCtor: new () => pb.Message, sceneType: SceneType, responseCtor: new () => pb.Message = null) {
    return function (msgHandlerCtor: Function) {
        DecoratorCollector.inst.add(DecoratorType.MessageHandler, msgHandlerCtor, messageCtor, sceneType, responseCtor)
    }
}