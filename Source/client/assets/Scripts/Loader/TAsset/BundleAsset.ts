import { AssetManager } from "cc";
import { CoroutineLock } from "../../Core/CoroutineLock/CoroutineLock";
import { LockType } from "../LockType";
import { AssetInfo } from "./AssetInfo";
import { AssetSystem } from "./AssetSystem";
import { BundleAssetProvider } from "./BundleAssetProvider";
import { IAssetOperationHandle } from "./IAssetOperationHandle";

export class BundleAsset {
    public bundleName: string
    public bundle: AssetManager.Bundle
    public refCount: number = 0
    public isAutoRelease = true
    public assetSystem: AssetSystem
    private providerMap: Map<string, BundleAssetProvider> = new Map

    public async loadAssetAsync(assetInfo: AssetInfo): Promise<IAssetOperationHandle> {
        let provider = this.providerMap.get(assetInfo.uuid)

        if (!provider) {
            provider = await this.createProvider(assetInfo)
        }

        let handle = provider.createHandle()

        return handle
    }

    private async createProvider(assetInfo: AssetInfo): Promise<BundleAssetProvider> {
        let lock = await CoroutineLock.inst.wait(LockType.BUNDLE_ASSET_LOAD, assetInfo.uuid)
        let provider = this.providerMap.get(assetInfo.uuid)

        if (provider) {
            lock.dispose()
            return provider
        }

        provider = new BundleAssetProvider

        provider.assetInfo = assetInfo
        provider.assetSystem = this.assetSystem
        provider.bundleAsset = this

        this.refCount++;

        await provider.load()

        this.providerMap.set(assetInfo.uuid, provider)

        lock.dispose()

        return provider
    }

    unloadUnusedAssets() {
        for (const [key, provider] of this.providerMap) {
            if (provider.refCount != 0) {
                continue
            }

            this.bundle.release(provider.assetInfo.assetPath, provider.assetInfo.assetType)
            this.providerMap.delete(key)
            this.refCount--;
        }
    }
}


