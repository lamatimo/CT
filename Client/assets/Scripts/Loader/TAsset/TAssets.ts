import { Asset, assetManager, AssetManager } from "cc";
import { CoroutineLock } from "../../Core/CoroutineLock/CoroutineLock";
import { ctError, ctLog } from "../../Core/Log/Logger";
import { Singleton } from "../../Core/Singleton/Singleton";
import { Task } from "../../Core/Task/Task";
import { LockType } from "../LockType";
import { AssetInfo } from "./AssetInfo";
import { AssetOperationHandle } from "./AssetOperationHandle";
import { AssetSystem } from "./AssetSystem";
import { BundleAsset } from "./BundleAsset";

export class TAssets extends Singleton {
    public static get inst(): TAssets {
        return this._inst as TAssets
    }

    public static assetSystem: AssetSystem
    private static readonly bundleMap: Map<string, BundleAsset> = new Map();

    awake() {
        TAssets.assetSystem = new AssetSystem
    }

    update(): void {
        TAssets.assetSystem.update()
    }

    public static async loadAssetAsync<T extends Asset>(assetType: new () => T, location: string): Promise<AssetOperationHandle> {
        let assetInfo = new AssetInfo()
        assetInfo.init(assetType, location)

        let bundleName = assetInfo.bundleName
        let bundleAsset = TAssets.bundleMap.get(bundleName)

        if (!bundleAsset) {
            bundleAsset = await this.loadBundleAsync(bundleName)
        }

        let assetOperationHandle = bundleAsset.loadAssetAsync(assetInfo)

        return assetOperationHandle as unknown as AssetOperationHandle
    }

    public static async loadBundleAsync(bundleName: string): Promise<BundleAsset> {
        let lock = await CoroutineLock.inst.wait(`${LockType.BUNDLE_LOAD}${bundleName}`)
        let bundleAsset = TAssets.bundleMap.get(bundleName)

        if (bundleAsset) {
            lock.dispose()
            return bundleAsset
        }

        let task = Task.create<AssetManager.Bundle>()

        assetManager.loadBundle(bundleName, (err, bundle) => {
            if (err) {
                ctLog(`加载Bundle错误, bundle=${bundleName}, error=${err}`)
            } else {
                ctLog(`加载Bundle完成, bundle=${bundleName}`)
            }

            task.setResult(bundle)
        });

        let bundle = await task
        bundleAsset = new BundleAsset
        bundleAsset.bundle = bundle
        bundleAsset.bundleName = bundleName
        bundleAsset.assetSystem = TAssets.assetSystem

        TAssets.bundleMap.set(bundleName, bundleAsset)

        lock.dispose()

        return bundleAsset
    }

    public static releaseBundle(bundleAsset: BundleAsset) {
        if (bundleAsset.refCount != 0) {
            ctError(`释放的bundle:${bundleAsset.bundleName}引用计数不为0`)

            return
        }

        this.bundleMap.delete(bundleAsset.bundleName)
        assetManager.removeBundle(bundleAsset.bundle)

        ctLog(`卸载bundle:${bundleAsset.bundleName}`)
    }

    public static unloadUnusedAssets() {
        for (const [name, bundleAsset] of this.bundleMap) {
            bundleAsset.unloadUnusedAssets()

            if (bundleAsset.refCount != 0) {
                continue
            }
    
            if (!bundleAsset.isAutoRelease) {
                continue
            }

            TAssets.releaseBundle(bundleAsset)
        }
    }
}
