import { Singleton } from "../Singleton/Singleton";

export enum AppType
{
    Server,
    Watcher, // 每台物理机一个守护进程，用来启动该物理机上的所有进程
    Proto2Ts,
}

export class Options extends Singleton {
    public static get inst(): Options {
        return this._inst as Options
    }

    process: number = 0
    logLevel: number = 2
    develop: boolean = true
    appType: AppType
}