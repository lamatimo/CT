import { Options } from "../Options/Options";
import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { Singleton } from "../Singleton/Singleton";
import { ILog } from "./ILog";

export class Logger extends Singleton implements ISingletonAwake {
    private static _inst: Logger;
    public static get inst(): Logger {
        return Logger._inst
    }

    private _iLog: ILog
    public set iLog(value: ILog) {
        this._iLog = value
    }

    private static readonly LOG_LEVEL = 1;
    private static readonly WARN_LEVEL = 2;

    @ISingletonAwakeDecorator
    awake() {
        Logger._inst = this
    }

    public log(...data: any[]) {
        if (this.checkLogLevel(Logger.LOG_LEVEL)) {
            this._iLog.log(...data)
        }
    }

    public warn(...data: any[]) {
        if (this.checkLogLevel(Logger.WARN_LEVEL)) {
            this._iLog.warn(...data)
        }
    }

    public error(...data: any[]) {
        this._iLog.error(...data)
    }

    private checkLogLevel(level: number): boolean {
        if (!Options.inst) {
            return true;
        }

        return Options.inst.logLevel <= level;
    }
}

export function ctLog(...data: any[]) {
    Logger.inst.log(...data)
}

export function ctWarn(...data: any[]) {
    Logger.inst.warn(...data)
}

export function ctError(...data: any[]) {
    Logger.inst.error(...data)
}