import { IResponse } from '../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage';
import { DecoratorCollector, DecoratorType } from '../../../../client/assets/Scripts/Core/Decorator/DecoratorCollector';
import { Entity } from '../../../../client/assets/Scripts/Core/Entity/Entity';
import { SceneType } from '../../../../client/assets/Scripts/Core/Entity/SceneType';
import { IMActorHandler } from './IMActorHandler';

export class ActorMessageDispatcherInfo {
    public SceneType: SceneType
    public IMActorHandler: IMActorHandler
    public responseCtor: IResponse

    public constructor(sceneType: SceneType, imActorHandler: IMActorHandler, responseCtor: IResponse) {
        this.SceneType = sceneType;
        this.IMActorHandler = imActorHandler;
        this.responseCtor = responseCtor
    }
}

export class ActorMessageDispatcherComponent extends Entity {
    public static inst: ActorMessageDispatcherComponent

    public Handlers: Map<any, Array<ActorMessageDispatcherInfo>> = new Map

    awake(): void {
        ActorMessageDispatcherComponent.inst = this

        this.load()
    }

    destroy(): void {
        this.Handlers.clear()
        ActorMessageDispatcherComponent.inst = null
    }

    private RegisterHandler(msgCtor: any, handler: ActorMessageDispatcherInfo) {
        if (!this.Handlers.has(msgCtor)) {
            this.Handlers.set(msgCtor, new Array());
        }

        this.Handlers.get(msgCtor).push(handler);
    }

    private load() {
        let list = DecoratorCollector.inst.get(DecoratorType.ActorMessageHandler)

        for (const args of list) {
            let msgHandlerCtor = args[0]
            let msgCtor = args[1]
            let sceneType: SceneType = args[2]
            let responseCtor = args[3]
            let handler = new msgHandlerCtor()
            let messageDispatcherInfo = new ActorMessageDispatcherInfo(sceneType, handler, responseCtor)

            this.RegisterHandler(msgCtor, messageDispatcherInfo)
        }
    }

    public async Handle(entity: Entity, fromProcess: number, message: any) {
        let actions = this.Handlers.get(message.constructor)

        if (!actions) {
            throw new Error(`not found message handler: ${message.constructor}`);
        }

        let sceneType = entity.domainScene().sceneType;

        for (const messageDispatcherInfo of actions) {
            if (messageDispatcherInfo.SceneType != sceneType) {
                continue
            }

            await messageDispatcherInfo.IMActorHandler.Handle(entity, fromProcess, message, messageDispatcherInfo.responseCtor)
        }
    }
}