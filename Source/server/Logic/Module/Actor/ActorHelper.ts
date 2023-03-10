import { IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage";
import { OpcodeTypeComponent } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeTypeComponent";

export class ActorHelper {
    public static CreateResponse(iActorRequest: IActorRequest, error: number): IActorResponse {
        let responseType = OpcodeTypeComponent.inst.GetResponseType(iActorRequest.constructor);
        let response = new responseType();
        
        response.Error = error;
        response.RpcId = iActorRequest.RpcId;
        return response;
    }
}