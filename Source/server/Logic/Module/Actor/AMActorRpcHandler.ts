import { IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage"
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity"
import { IMActorHandler } from "./IMActorHandler"
import pb from "protobufjs";
import { OpcodeTypeComponent } from "../../../../client/assets/Bundles/Code/Logic/Module/Message/OpcodeTypeComponent";
import { MessageTypeComponent } from "../../../../client/assets/Scripts/Core/Network/MessageTypeComponent";
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger";

export abstract class AMActorRpcHandler<E extends Entity, Request extends IActorRequest, Response extends IActorResponse> implements IMActorHandler {
    GetRequestType(): new () => any {
        throw new Error("Method not implemented.");
    }
    GetResponseType(): new () => any {
        throw new Error("Method not implemented.");
    }
    protected abstract Run(unit: E, request: Request, response: Response);

    public async Handle(entity: Entity, fromProcess: number, actorMessage: pb.Message) {
        //     try {
        //         let request = actorMessage as unknown as Request
        //         let opcode = NetServices.inst.GetOpcode(actorMessage.constructor)
        //         if(!MessageTypeComponent.inst.isExtendsIRequest(opcode)){
        //             ctError(`消息类型转换错误: ${actorMessage.constructor.name}`);
        //             return;
        //         }

        //         if (!(entity instanceof Entity))
        //         {
        //             //@ts-ignore
        //             ctError(`Actor类型转换错误: ${entity.constructor.name}`);
        //             return;
        //         }

        //             let rpcId = request.RpcId;

        //             let response = Activator.CreateInstance<Response>();

        //         try {
        //             await this.Run(ee, request, response);
        //         }
        //         catch (Exception exception)
        //         {
        //             Log.Error(exception);
        //             response.Error = ErrorCore.ERR_RpcFail;
        //             response.Message = exception.ToString();
        //         }

        //         response.RpcId = rpcId;
        //         ActorHandleHelper.Reply(fromProcess, response);
        //     }
        //     catch (Exception e)
        //     {
        //         throw new Exception($"解释消息失败: {actorMessage.GetType().FullName}", e);
        //     }
        // }

        //     public Type GetRequestType()
        // {
        //     if (typeof (IActorLocationRequest).IsAssignableFrom(typeof (Request))) {
        //         Log.Error($"message is IActorLocationMessage but handler is AMActorRpcHandler: {typeof (Request)}");
        //     }

        //     return typeof (Request);
        // }

        //     public Type GetResponseType()
        // {
        //     return typeof (Response);
    }
}