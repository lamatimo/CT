import { BSON } from "mongodb";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { DBHelper } from "../DB/DBHelper";
import { TransferComponent } from "../Transfer/TransferComponent";

declare module "../../../../client/assets/Scripts/Core/Entity/Entity" {
    interface Entity {
        isTransfer(): boolean;
        serialize(): Uint8Array
    }
}

Entity.prototype.isTransfer = function (): boolean {
    return TransferComponent.inst.has(this.constructor)
}

Entity.prototype.serialize = function (): Uint8Array {
    let obj = DBHelper.serializeToObject(this)
    let bytes = BSON.serialize(obj);
    return bytes
}