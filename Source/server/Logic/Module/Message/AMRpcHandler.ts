import { IRequest, IResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMessage";
import { IMHandler } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/IMHandler";
import { Session } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/Session";
import pb from 'protobufjs'
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore";
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger";

export abstract class AMRpcHandler<TRequest extends IRequest, TResponse extends IResponse> implements IMHandler {
    protected abstract Run(session: Session, request: TRequest, response: TResponse);

    public Handle(session: Session, message: pb.Message, responseCtor) {
        this.HandleAsync(session, message, responseCtor)
    }

    private async HandleAsync(session: Session, message: pb.Message, responseCtor) {
        try {
            let request = message as unknown as TRequest;
            let rpcId = request.RpcId;
            let instanceId = session.instanceId;
            let response: TResponse = new responseCtor();

            try {
                await this.Run(session, request, response);
            }
            catch (error) {
                ctError(error);
                response.Error = ErrorCore.ERR_RpcFail;
                response.Message = error.ToString();
            }

            // 等回调回来,session可以已经断开了,所以需要判断session InstanceId是否一样
            if (session.instanceId != instanceId) {
                return;
            }

            response.RpcId = rpcId; // 在这里设置rpcId是为了防止在Run中不小心修改rpcId字段
            session.Send(response);
        }
        catch (e) {
            throw new Error(`解释消息失败: ${message.constructor.name}`);
        }
    }
}