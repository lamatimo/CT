import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";
import { Player } from "./Player";
import { PlayerComponent } from "./PlayerComponent";

export class SessionPlayerComponent extends Entity {
    public PlayerId: number

    destroy() {
        // 发送断线消息
        // ActorLocationSenderComponent.Instance?.Send(self.PlayerId, new G2M_SessionDisconnect());
        this.domainScene().getComponent(PlayerComponent)?.Remove(this.PlayerId);
    }

    public GetMyPlayer(): Player {
        return this.domainScene().getComponent(PlayerComponent).Get(this.PlayerId);
    }
}