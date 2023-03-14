import { Singleton } from "../Singleton/Singleton";

export enum AppType
{
    Server,
    Watcher, // 每台物理机一个守护进程，用来启动该物理机上的所有进程
    Proto2Ts,
    TsImport,
}

export class Options extends Singleton {
    public static get inst(): Options {
        return this._inst as Options
    }

    /**
     * 进程序号
     */
    process: number = 1
    /**
     * 区id
     */
    zone: number = 1
    /**
     * log等级
     */
    logLevel: number = 2
    /**
     * 是否开发阶段
     */
    develop: boolean = true
    /**
     * 控制台命令行输入
     */
    console: boolean = false
    /**
     * 启动类型
     */
    appType: AppType
}