import pb from 'protobufjs';
import { IActorResponse } from '../Actor/IActorMessage';

export class ActorResponse extends pb.Message<ActorResponse> implements IActorResponse {
    @pb.Field.d(1, "int32", "optional")
    public RpcId: number

    @pb.Field.d(2, "int32", "optional")
    public Error: number

    @pb.Field.d(3, "string", "optional")
    public Message: string
}