import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector";
import { Entity } from "../Entity/Entity";
import { MessageType } from "./MessageType";

export class MessageTypeComponent extends Entity{
    public static inst: MessageTypeComponent
    private messageTypeMap: Map<number, MessageType> = new Map

    awake(): void {
        MessageTypeComponent.inst = this

        let list = DecoratorCollector.inst.get(DecoratorType.Message)

        for (const args of list) {
            let opcode = args[2]
            let msgType = args[1]

            this.messageTypeMap.set(opcode, msgType)
        }
    }

    destroy(): void {
        MessageTypeComponent.inst = null
    }

    public isExtendsIMessage(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        return true
    }

    public isExtendsIRequest(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IRequest){
            return true
        }
        if(msgType == MessageType.IActorRequest){
            return true
        }
        if(msgType == MessageType.IActorLocationMessage){
            return true
        }
        if(msgType == MessageType.IActorLocationRequest){
            return true
        }

        return false
    }

    public isExtendsIResponse(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IResponse){
            return true
        }
        if(msgType == MessageType.IActorResponse){
            return true
        }
        if(msgType == MessageType.IActorLocationResponse){
            return true
        }

        return false
    }

    public isExtendsIActorMessage(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorMessage){
            return true
        }

        return false
    }

    public isExtendsIActorRequest(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorRequest){
            return true
        }
        if(msgType == MessageType.IActorLocationMessage){
            return true
        }
        if(msgType == MessageType.IActorLocationRequest){
            return true
        }

        return false
    }

    public isExtendsIActorResponse(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorResponse){
            return true
        }
        if(msgType == MessageType.IActorLocationResponse){
            return true
        }

        return false
    }

    public isExtendsIActorLocationMessage(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorLocationMessage){
            return true
        }

        return false
    }

    public isExtendsIActorLocationRequest(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorLocationRequest){
            return true
        }

        return false
    }

    public isExtendsIActorLocationResponse(opcode: number): boolean{
        let msgType = this.messageTypeMap.get(opcode)

        if(!msgType){
            return false
        }

        if(msgType == MessageType.IActorLocationResponse){
            return true
        }

        return false
    }
}