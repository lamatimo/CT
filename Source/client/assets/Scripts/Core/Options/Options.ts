import { Singleton } from "../Singleton/Singleton";

export class Options extends Singleton {
    public static get inst(): Options {
        return this._inst as Options
    }

    process: number = 0
    logLevel: number = 2
}