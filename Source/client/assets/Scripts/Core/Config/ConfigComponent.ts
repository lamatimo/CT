import { Root } from "../Entity/Root";
import { EventSystem } from "../EventSystem/EventSystem";
import { EventType } from "../EventSystem/EventType";
import { Singleton } from "../Singleton/Singleton";

export class LoadAllConfigBytes extends EventType{

}

export class ConfigComponent extends Singleton{
    public async loadAsync(){
        await EventSystem.inst.publishAsync(Root.inst.scene, new LoadAllConfigBytes())
    }
}