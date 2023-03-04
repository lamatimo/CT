import { IActorRequest, IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage"
import { ctError, ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger"
import { ErrorCore } from "../../../../client/assets/Scripts/Core/Network/ErrorCore"
import { Task } from "../../../../client/assets/Scripts/Core/Task/Task"
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper"

// 知道对方的instanceId，使用这个类发actor消息
export class ActorMessageSender {
    public ActorId: number

    // 最近接收或者发送消息的时间
    public CreateTime: number

    public Request: IActorRequest

    public NeedException: boolean

    public Tcs: Task<IActorResponse>

    public ActorMessageSender(actorId: number, iActorRequest: IActorRequest, tcs: Task<IActorResponse>, needException: boolean) {
        this.ActorId = actorId;
        this.Request = iActorRequest;
        this.CreateTime = TimeHelper.serverNow();
        this.Tcs = tcs;
        this.NeedException = needException;
    }

    public run(response: IActorResponse): void {
        if (response.Error == ErrorCore.ERR_ActorTimeout) {
            ctError(`Rpc error: request, 注意Actor消息超时，请注意查看是否死锁或者没有reply: actorId: ${this.ActorId} ${this.Request}, response: ${response}`);
            return;
        }

        if (this.NeedException) {
            ctError(`Rpc error: actorId: {self.ActorId} request: ${this.Request}, response: ${response}`);
            return;
        }

        this.Tcs.setResult(response);
    }
}