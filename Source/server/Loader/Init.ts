import { CoroutineLock } from "../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock"
import { ObjectPool } from "../../client/assets/Scripts/Core/ObjectPool/ObjectPool"
import { Singleton } from "../../client/assets/Scripts/Core/Singleton/Singleton"
import { LobbyComponent } from "./LobbyComponent"

class B{
    _qq: number = 0
    set qq(value: number){
        this._qq = value
    }
}
console.log(B)

console.log(Singleton)