import { Entity } from '../../../../client/assets/Scripts/Core/Entity/Entity';
import { DBHelper } from './DBHelper';

declare global {
    interface Uint8Array {
        deserialize(): Entity
        deserialize<T>(ctor: new () => T): T
    }
}

Uint8Array.prototype.deserialize = function <T>(ctor: new () => T = null): T {
    let result = DBHelper.deserialize(this)

    return result as T
};