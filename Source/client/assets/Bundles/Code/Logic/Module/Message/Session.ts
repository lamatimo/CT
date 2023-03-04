import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { ctError, ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { ErrorCore } from "../../../../../Scripts/Core/Network/ErrorCore";
import { NetServices } from "../../../../../Scripts/Core/Network/NetServices";
import { CancellationToken } from "../../../../../Scripts/Core/Task/CancellationToken";
import { Task } from "../../../../../Scripts/Core/Task/Task";
import { TimeHelper } from "../../../../../Scripts/Core/Time/TimeHelper";
import { IMessage, IRequest, IResponse } from "./IMessage";
import { OpcodeHelper } from "./OpcodeHelper";
import { OpcodeTypeComponent } from "./OpcodeTypeComponent";

export class RpcInfo {
    public readonly Request: IRequest;
    public readonly Tcs: Task<IResponse>;

    constructor(request: IRequest) {
        this.Request = request;
        this.Tcs = Task.create();
    }
}

export class Session extends Entity {
    static RpcId: number
    ServiceId: number
    requestCallbacks: Map<number, RpcInfo> = new Map
    LastRecvTime: number
    LastSendTime: number
    Error: number
    RemoteAddress: URL

    init(serviceId: number) {
        this.ServiceId = serviceId;
        let timeNow = TimeHelper.clientNow();
        this.LastRecvTime = timeNow;
        this.LastSendTime = timeNow;

        this.requestCallbacks.clear();

        ctLog(`session create: zone: ${this.domainZone()} id: ${this.id} ${timeNow} `);
    }

    public OnResponse(response: IResponse) {
        let action = this.requestCallbacks.get(response.RpcId)

        if (!action) {
            return;
        }

        this.requestCallbacks.delete(response.RpcId);

        if (ErrorCore.IsRpcNeedThrowException(response.Error)) {
            action.Tcs.setResult(null)
            ctError(`Rpc error, request: ${action.Request} response: ${response}`);
            return;
        }

        action.Tcs.setResult(response);
    }

    public Send(message: IMessage) {
        this.SendWithId(0, message);
    }

    public SendWithId(actorId: number, message: IMessage) {
        this.LastSendTime = TimeHelper.clientNow();
        OpcodeHelper.LogMsg(this.domainZone(), message);
        NetServices.inst.SendMessage(this.ServiceId, this.id, actorId, message);
    }

    // public async Call(request: IRequest, cancellationToken: CancellationToken): Promise<IResponse> {
    //     let rpcId = ++Session.RpcId;
    //     let rpcInfo = new RpcInfo(request);
    //     this.requestCallbacks.set(rpcId, rpcInfo);
    //     request.RpcId = rpcId;

    //     this.Send(request);

    //     let CancelAction = () => {
    //         let action = this.requestCallbacks.get(rpcId)
    //         if (!action) {
    //             return;
    //         }

    //         this.requestCallbacks.delete(rpcId);

    //         let responseType = OpcodeTypeComponent.inst.GetResponseType(action.Request);
    //         let response: IResponse = new responseType;
    //         response.Error = ErrorCore.ERR_Cancel;

    //         action.Tcs.setResult(response);
    //     }

    //     let ret: IResponse;

    //     try {
    //         cancellationToken?.Add(CancelAction);
    //         ret = await rpcInfo.Tcs;
    //     }
    //     finally {
    //         cancellationToken?.Remove(CancelAction);
    //     }

    //     return ret;
    // }

    public async Call (request: IRequest): Promise<IResponse>
    {
        let rpcId = ++Session.RpcId;
        let rpcInfo = new RpcInfo(request);

        this.requestCallbacks.set(rpcId, rpcInfo)

        request.RpcId = rpcId;

        this.Send(request);

        return await rpcInfo.Tcs;
    }

    destroy(): void {
        NetServices.inst.RemoveChannel(this.ServiceId, this.id, this.Error);

        for (let [_, responseCallback] of this.requestCallbacks) {
            responseCallback.Tcs.setResult(null)
            ctError(this.Error, `"session dispose: ${this.id} ${this.RemoteAddress}`);
        }

        ctLog(`session dispose: ${this.RemoteAddress} id: ${this.id} ErrorCode: ${this.Error}, please see ErrorCode.ts! ${TimeHelper.clientNow()}`);

        this.requestCallbacks.clear();
    }
}