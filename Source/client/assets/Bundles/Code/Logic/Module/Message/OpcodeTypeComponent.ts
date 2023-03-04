import { DecoratorCollector, DecoratorType } from "../../../../../Scripts/Core/Decorator/DecoratorCollector";
import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { MessageTypeComponent } from "../../../../../Scripts/Core/Network/MessageTypeComponent";
import { OpcodeHelper } from "./OpcodeHelper";

export class OpcodeTypeComponent extends Entity {
    public static inst: OpcodeTypeComponent
    public outrActorMessage: Set<number> = new Set();
    public readonly requestResponse: Map<any, any> = new Map();

    awake(): void {
        OpcodeTypeComponent.inst = this

        let list = DecoratorCollector.inst.get(DecoratorType.Message)

        for (const args of list) {
            let opcode = args[2]

            if (OpcodeHelper.IsOuterMessage(opcode) && MessageTypeComponent.inst.isExtendsIActorMessage(opcode)) {
                this.outrActorMessage.add(opcode);
            }
        }

        let list2 = DecoratorCollector.inst.get(DecoratorType.MessageResponse)

        for (const args of list2) {
            let response = args[1]
            let request = args[0]

            this.requestResponse.set(request, response)
        }
    }

    destroy(): void {
        OpcodeTypeComponent.inst = null
    }

    public GetResponseType(request: any): any {
        let response = this.requestResponse.get(request)

        if (!response) {
            throw new Error(`not found response type, request type: ${request.constructor.name}`);
        }

        return response;
    }
}