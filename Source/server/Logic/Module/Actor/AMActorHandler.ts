import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { IMActorHandler } from "./IMActorHandler";

export abstract class AMActorHandler<A> implements IMActorHandler{
    protected abstract run(session: Entity, args: A): void;

    async Handle(entity: Entity, fromProcess: number, message: any, responseCtor: any) {
        await this.run(entity, message)
    }
}