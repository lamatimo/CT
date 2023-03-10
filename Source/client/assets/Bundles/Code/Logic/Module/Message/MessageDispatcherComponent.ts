import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector";
import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType";
import { ctError } from "../../../../../Scripts/Core/Log/Logger";
import { NetServices } from "../../../../../Scripts/Core/Network/NetServices";
import { IMHandler } from "./IMHandler";
import { Session } from "./Session";
import { IResponse } from "./IMessage";
import { Message } from "../../../../../Scripts/Core/Message/Message";

export class MessageDispatcherInfo {
    public SceneType: SceneType
    public IMHandler: IMHandler
    public responseCtor: IResponse

    public constructor(sceneType: SceneType, imHandler: IMHandler, responseCtor: IResponse) {
        this.SceneType = sceneType;
        this.IMHandler = imHandler;
        this.responseCtor = responseCtor
    }
}

export class MessageDispatcherComponent extends Entity {
    public static inst: MessageDispatcherComponent

    public Handlers: Map<any, Array<MessageDispatcherInfo>> = new Map

    awake(): void {
        MessageDispatcherComponent.inst = this

        this.load()
    }

    destroy(): void {
        this.Handlers.clear()
    }

    private RegisterHandler(msgCtor: any, handler: MessageDispatcherInfo) {
        if (!this.Handlers.has(msgCtor)) {
            this.Handlers.set(msgCtor, new Array());
        }

        this.Handlers.get(msgCtor).push(handler);
    }

    private load() {
        let list = DecoratorCollector.inst.get(DecoratorType.MessageHandler)

        for (const args of list) {
            let msgHandlerCtor = args[0]
            let msgCtor = args[1]
            let sceneType: SceneType = args[2]
            let responseCtor = args[3]
            let handler = new msgHandlerCtor()
            let messageDispatcherInfo: MessageDispatcherInfo = new MessageDispatcherInfo(sceneType, handler, responseCtor)

            this.RegisterHandler(msgCtor, messageDispatcherInfo)
        }
    }

    public Handle(session: Session, message: Message): void {
        let actions = this.Handlers.get(message.constructor)

        if (!actions) {
            let opcode = NetServices.inst.GetOpcode(message.constructor);
            ctError(`??????????????????: ${opcode} ${message}`);
            return;
        }

        let sceneType = session.domainScene().sceneType;

        for (const messageDispatcherInfo of actions) {
            if (messageDispatcherInfo.SceneType != sceneType) {
                continue
            }

            messageDispatcherInfo.IMHandler.Handle(session, message, messageDispatcherInfo.responseCtor)
        }
    }
}