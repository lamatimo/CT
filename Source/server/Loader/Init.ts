import { Entry } from "../../client/assets/Bundles/Code/Logic/Entry"
import { CoroutineLock } from "../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock"
import { CtorCollector } from "../../client/assets/Scripts/Core/Ctor/CtorCollector"
import { IdGenerater } from "../../client/assets/Scripts/Core/IdGenerater/IdGenerater"
import { Logger } from "../../client/assets/Scripts/Core/Log/Logger"
import { ObjectPool } from "../../client/assets/Scripts/Core/ObjectPool/ObjectPool"
import { Game } from "../../client/assets/Scripts/Core/Singleton/Game"
import { TimeInfo } from "../../client/assets/Scripts/Core/Time/TimeInfo"
import { TimerComponent } from "../../client/assets/Scripts/Core/Timer/TimerComponent"
import { WinstonLogger } from "./WinstonLogger"
import { WebSocket, WebSocketServer } from "ws";


export class Init {
    public static start() {
        Game.addSingleton(Logger).iLog = new WinstonLogger
        Game.addSingleton(TimeInfo)
        Game.addSingleton(IdGenerater)
        Game.addSingleton(ObjectPool)
        Game.addSingleton(CoroutineLock)
        Game.addSingleton(TimerComponent)

        this.injection()
        Entry.start()
    }

    private static injection() {
        CtorCollector.IWebSocketCtor = WebSocket
        CtorCollector.IWebSocketServerCtor = WebSocketServer
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