import { ObjectPool } from "../ObjectPool/ObjectPool";

export abstract class EventType{
    public static create<T extends EventType>(eventType: new ()=>T){
        let event = ObjectPool.inst.fetch(eventType)

        return event
    }

    public dispose(){
        ObjectPool.inst.recycle(this)
    }
}


