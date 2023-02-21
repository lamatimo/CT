import { Asset } from "cc";
import { ctError, ctLog, ctWarn } from "../../Core/Log/Logger";
import { Task } from "../../Core/Task/Task";
import { AssetInfo } from "./AssetInfo";
import { AssetOperationHandle } from "./AssetOperationHandle";
import { AssetSystem } from "./AssetSystem";
import { IBundleAsset } from "./IBundleAsset";

export class BundleAssetProvider {
    public asset: Asset
    public path: string
    public refCount: number = 0
    public bundleAsset: IBundleAsset
    public assetInfo: AssetInfo
    public assetSystem: AssetSystem
    private task: Task<void>
    private handleSet: Set<AssetOperationHandle> = new Set

    public async internalLoad() {
        let assetPath = this.assetInfo.assetPath
        let assetType = this.assetInfo.assetType

        this.bundleAsset.bundle.load(assetPath, assetType, (err, asset) => {
            if (err) {
                ctError(`加载资源错误:${this.assetInfo.uuid}`, err)
            } else {
                this.asset = asset
            }

            this.task.setResult()
            this.assetSystem.removeProvider(this)
        })
    }

    public async load() {
        this.task = Task.create()

        this.assetSystem.addProvider(this)

        await this.task
    }

    public createHandle(): AssetOperationHandle {
        // 引用计数增加
        this.refCount++;

        let handle = new AssetOperationHandle

        handle.provider = this

        this.handleSet.add(handle);

        return handle;
    }

    public releaseHandle(handle: AssetOperationHandle) {
        if (this.refCount <= 0) {
            ctWarn("Asset provider reference count is already zero. There may be resource leaks !")
        }

        if (this.handleSet.delete(handle) == false) {
            ctError("Should never get here !");
        }

        // 引用计数减少
        this.refCount--;
    }
}