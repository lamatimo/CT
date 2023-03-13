import { IRequest, IResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage";
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { IMActorHandler } from "./IMActorHandler";
import { ActorHandleHelper } from "./ActorHandleHelper";

export abstract class AMActorRpcHandler<E extends Entity, TRequest extends IRequest, TResponse extends IResponse> implements IMActorHandler {
    protected abstract Run(unit: E, request: TRequest, response: TResponse);

    async Handle(entity: Entity, fromProcess: number, message: any, responseCtor: any) {
        try {
            let request = message as unknown as TRequest;
            let rpcId = request.RpcId;
            let response: TResponse = new responseCtor();
    
            try {
                await this.Run(entity as E, request, response);
            }
            catch (error) {
                ctError(error);
                response.Error = ErrorCore.ERR_RpcFail;
                response.Message = error.ToString();
            }
    
            response.RpcId = rpcId; // 在这里设置rpcId是为了防止在Run中不小心修改rpcId字段

            if(!response.Error){
                response.Error = 0
            }
            
            ActorHandleHelper.Reply(fromProcess, response);
        }
        catch (e) {
            throw new Error(`解释消息失败: ${message.constructor.name}`);
        }
    }
}