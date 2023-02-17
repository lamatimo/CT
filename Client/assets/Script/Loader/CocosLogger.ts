import { debug, error, warn } from "cc";
import { ILog } from "../Core/Log/ILog";

export class CocosLogger implements ILog {
    debug(s: string): void {
        debug(s)
    }

    warning(s: string): void {
        warn(s)
    }

    error(s: string): void {
        error(s)
    }
}