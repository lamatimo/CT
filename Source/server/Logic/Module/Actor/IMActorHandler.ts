import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";

export interface IMActorHandler {
    Handle(entity: Entity, fromProcess: number, message: any, responseCtor: any);
}