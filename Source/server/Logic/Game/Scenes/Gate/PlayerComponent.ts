import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";
import { Player } from "./Player";

export class PlayerComponent extends Entity {
    public readonly idPlayers: Map<number, Player> = new Map();

    public Add(player: Player) {
        this.idPlayers.set(player.id, player);
    }

    public Get(id: number): Player {
        let gamer = this.idPlayers.get(id)

        return gamer;
    }

    public Remove(id: number) {
        this.idPlayers.delete(id);
    }
}