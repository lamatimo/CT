import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";

export class Player extends Entity {
    public Account: string
    public UnitId: number

    init(account: string){
        this.Account = account
    }
}