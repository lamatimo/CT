import { Field, Message } from '../../../../../Scripts/Core/Network/Protobuf';
import { IActorResponse } from '../Actor/IActorMessage';

export class ActorResponse extends Message<ActorResponse> implements IActorResponse {
    @Field.d(1, "int32", "optional")
    public RpcId: number

    @Field.d(2, "int32", "optional")
    public Error: number

    @Field.d(3, "string", "optional")
    public Message: string
}