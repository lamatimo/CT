import { BsonIgnore } from "../../../../../Scripts/Core/Decorator/BsonIgnore";
import { DB } from "../../../../../Scripts/Core/Decorator/DB";
import { Transfer } from "../../../../../Scripts/Core/Decorator/Transfer";
import { Entity } from "../../../../../Scripts/Core/Entity/Entity";

@DB
@Transfer
export class NumericComponent extends Entity {
    public NumericDic: Map<number, number> = new Map();

    public Set(nt: number, value: number) {
        this.NumericDic.set(nt, value)
    }

    // public toBSON(){
    //     let map = new Map()

    //     for(let [key,value] of this.NumericDic){
    //         map.set(key.toString(), value)
    //     }

    //     this['bson_NumericDic'] = map

    //     return this
    // }
}