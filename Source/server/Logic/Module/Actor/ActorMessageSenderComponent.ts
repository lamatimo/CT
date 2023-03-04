import { IActorResponse } from "../../../../client/assets/Bundles/Code/Logic/Module/Actor/IActorMessage";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { TimeHelper } from "../../../../client/assets/Scripts/Core/Time/TimeHelper";
import { TimerComponent } from "../../../../client/assets/Scripts/Core/Timer/TimerComponent";
import { ActorMessageSender } from "./ActorMessageSender";

export class ActorMessageSenderComponent extends Entity {
    public readonly TIMEOUT_TIME = 40 * 1000;

    public static inst: ActorMessageSenderComponent

    public RpcId: number;

    public readonly requestCallback: Map<number, ActorMessageSender> = new Map

    public TimeoutCheckTimer: number;

    public TimeoutActorMessageSenders: Array<number> = new Array;

    awake(): void{
        // this.TimeoutCheckTimer = TimerComponent.inst.NewRepeatedTimer(1000, this.check);
    }

    destroy(): void {
        TimerComponent.inst?.Remove(this.TimeoutCheckTimer);
        this.TimeoutCheckTimer = 0;
        this.TimeoutActorMessageSenders = [];
    }

    private Check()
    {
        let timeNow = TimeHelper.serverNow();

        for(let [key, value] of this.requestCallback){
            // 因为是顺序发送的，所以，检测到第一个不超时的就退出
            if (timeNow < value.CreateTime + this.TIMEOUT_TIME)
            {
                break;
            }

            this.TimeoutActorMessageSenders.push(key);
        }

        for (let i = 0; i < this.TimeoutActorMessageSenders.length; i++) {
            const rpcId = this.TimeoutActorMessageSenders[i];

            let actorMessageSender = this.requestCallback.get(rpcId);
            this.requestCallback.delete(rpcId);

            // try
            // {
            //     let response = ActorHelper.CreateResponse(actorMessageSender.Request, ErrorCore.ERR_ActorTimeout);
                
            //     actorMessageSender.run(actorMessageSender, response);
            // }
            // catch (Exception e)
            // {
            //     Log.Error(e.ToString());
            // }
        }


        this.TimeoutActorMessageSenders = []
    }
}