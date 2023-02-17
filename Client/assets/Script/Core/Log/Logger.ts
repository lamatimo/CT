import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { Singleton } from "../Singleton/Singleton";
import { ILog } from "./ILog";

export class Logger extends Singleton implements ISingletonAwake{
    private static _inst: Logger;
    public static get inst(): Logger {
        return Logger._inst
    }

    private _iLog: ILog
    public set iLog(value: ILog){
        this._iLog = value
    }

    @ISingletonAwakeDecorator
    awake() {
        Logger._inst = this
    }

    public debug(s: string){
        this._iLog.debug(s)
    }

    public warning(s: string){
        this._iLog.warning(s)
    }

    public error(s: string){
        this._iLog.error(s)
    }
}