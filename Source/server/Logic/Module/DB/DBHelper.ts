import { BSON } from "mongodb"
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger"
import { SerializeComponent } from "./SerializeComponent"

export class DBHelper {
    public static serializeToObject(target: any): any {
        let keys = Object.keys(target)
        let ctor = target.constructor
        let obj = { ctorName: ctor.name }

        for (const k of keys) {
            let v = target[k]

            if (v instanceof Map) {
                if (v.size == 0) {
                    continue
                }

                let q: Map<any, any> = v
                let mapKeys = q.keys()

                if (typeof mapKeys[0] === 'string') {
                    continue
                }

                let array1 = new Array()
                let array2 = new Array()

                for (const [kk, vv] of q) {
                    array1.push(kk)
                    array2.push(vv)
                }

                obj[`ma_${k}_1`] = array1
                obj[`ma_${k}_2`] = array2

                continue
            }

            obj[k] = v
        }

        return obj
    }

    public static deserialize(from: any): any {
        let obj = from
        
        if (from instanceof Uint8Array) {
            obj = BSON.deserialize(from);
        }
        
        let objCtor = SerializeComponent.inst.getCtor(obj.ctorName)

        if(!objCtor){
            ctError(`${from.ctorName}没有标记DB或Transfer`)
        }

        obj.ctorName = null

        let objNew = new objCtor()
        let keys = Object.keys(obj)

        for (let key of keys) {
            let value = obj[key]

            if(!value){
                continue
            }

            if (key.startsWith('ma_')) {
                let realKey = key.substring(3, key.length-2)
                let k1 = `ma_${realKey}_1`
                let k2 = `ma_${realKey}_2`
                let map = new Map

                for (let i = 0; i < value.length; i++) {
                    map.set(obj[k1], obj[k2])
                }

                objNew[realKey] = map
                obj[k1] = null
                obj[k2] = null

            } else {
                objNew[key] = value
            }
        }

        return objNew
    }


}