import { Entry } from "../../client/assets/Bundles/Code/Logic/Entry"
import { CoroutineLock } from "../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock"
import { IdGenerater } from "../../client/assets/Scripts/Core/IdGenerater/IdGenerater"
import { Logger } from "../../client/assets/Scripts/Core/Log/Logger"
import { ObjectPool } from "../../client/assets/Scripts/Core/ObjectPool/ObjectPool"
import { Options } from "../../client/assets/Scripts/Core/Options/Options"
import { Game } from "../../client/assets/Scripts/Core/Singleton/Game"
import { WinstonLogger } from "./WinstonLogger"

import "./ImportAllEvent"

export class Init {
    public static start() {
        Game.addSingleton(Options)
        Game.addSingleton(Logger).iLog = new WinstonLogger
        Game.addSingleton(IdGenerater)
        Game.addSingleton(ObjectPool)
        Game.addSingleton(CoroutineLock)

        Entry.start()
    }

    public static update(): void {
        Game.update()
    }

    public static lateUpdate(): void {
        Game.lateUpdate();
        Game.frameFinishUpdate();
    }

    public static onDestroy(): void {
        Game.dispose()
    }
}