import pb from "protobufjs";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";

export interface IMActorHandler {
    Handle(entity: Entity, fromProcess: number, actorMessage: pb.Message);
    GetRequestType(): new () => any;
    GetResponseType(): new () => any;
}