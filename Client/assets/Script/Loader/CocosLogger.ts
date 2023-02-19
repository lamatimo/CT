import { error, log, warn } from "cc";
import { ILog } from "../Core/Log/ILog";

export class CocosLogger implements ILog {
    log(...data: any[]): void {
        log(...data)
    }

    warn(...data: any[]): void {
        warn(...data)
    }

    error(...data: any[]): void {
        error(...data)
    }
}