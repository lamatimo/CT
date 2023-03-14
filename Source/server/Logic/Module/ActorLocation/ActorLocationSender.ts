import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";

// 知道对方的Id，使用这个类发actor消息
export class ActorLocationSender extends Entity {
    public ActorId: number;

    // 最近接收或者发送消息的时间
    public LastSendOrRecvTime: number;

    public Error: number;
}