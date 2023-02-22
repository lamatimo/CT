import { AssetManager } from "cc";
import { UIPackage } from "fairygui-cc";
import { CoroutineLock } from "../../Core/CoroutineLock/CoroutineLock";
import { Singleton } from "../../Core/Singleton/Singleton";
import { Task } from "../../Core/Task/Task";
import { LockType } from "../LockType";
import { BundleAsset } from "../TAsset/BundleAsset";
import { TAssets } from "../TAsset/TAssets";
import { WindowBase } from "./WindowBase";


export class WindowComponent extends Singleton {
    public static get inst(): WindowComponent {
        return this._inst as WindowComponent
    }

    private windowMap: Map<new () => void, WindowBase> = new Map
    private packageMap: Map<string, BundleAsset> = new Map

    private async loadWindowAsync<T extends WindowBase>(winCtor: new () => T): Promise<T> {
        let lock = await CoroutineLock.inst.wait(LockType.WINDOW_LOAD, winCtor.name)

        if (this.windowMap.has(winCtor)) {
            lock.dispose()

            return this.windowMap.get(winCtor) as T
        }


        let win = new winCtor

        this.windowMap.set(winCtor, win)

        await win.loadResAsync()

        lock.dispose()

        return win as T
    }

    private async internalLoadPackage(bundle: AssetManager.Bundle, path: string) {
        let task = Task.create()

        // 加载公共包
        UIPackage.loadPackage(bundle, path, () => {
            task.setResult()
        })

        await task
    }

    async show<T extends WindowBase>(winCtor: new () => T): Promise<T> {
        let win = await this.loadWindowAsync(winCtor)

        win.show()

        return win as T
    }

    hide<T extends WindowBase>(winCtor: new () => T): T {
        if (!this.windowMap.has(winCtor)) {
            return
        }

        let win = this.windowMap.get(winCtor)

        win.hide()
    }

    async get<T extends WindowBase>(winCtor: new () => T): Promise<T> {
        let win: WindowBase

        win = await this.loadWindowAsync(winCtor)

        return win as T
    }

    /**
     * 需要包含bundle name
     * @param path 
     */
    async loadPackageAsync(packageName: string) {
        let bundleAsset = this.packageMap.get(packageName)

        if (bundleAsset) {
            return
        }

        bundleAsset = await TAssets.loadBundleAsync(packageName)

        await this.internalLoadPackage(bundleAsset.bundle, packageName)

        this.packageMap.set(packageName, bundleAsset)

        bundleAsset.isAutoRelease = false
    }

    unloadPackage(packageName: string) {
        let bundleAsset = this.packageMap.get(packageName)

        if (!bundleAsset) {
            return
        }

        UIPackage.removePackage(packageName)
        TAssets.releaseBundle(bundleAsset)
    }
}
