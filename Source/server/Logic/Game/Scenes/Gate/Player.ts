import { DB } from "../../../../../client/assets/Scripts/Core/Decorator/DB";
import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";

@DB
export class Player extends Entity {
    public Account: string
    public UnitId: number
    public mapTest = new Map([[2,2], [6, 1]])

    init(account: string){
        this.Account = account
        return this
    }
}