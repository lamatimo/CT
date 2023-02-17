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

    public log(...data: any[]){
        this._iLog.log(...data)
    }

    public warning(...data: any[]){
        this._iLog.warning(...data)
    }

    public error(...data: any[]){
        this._iLog.error(...data)
    }
}