import { Asset, instantiate, Node, Prefab } from "cc";
import { ctError } from "../../Core/Log/Logger";
import { IBundleAssetProvider } from "./IBundleAssetProvider";

export class AssetOperationHandle {
    public provider: IBundleAssetProvider
    public isDisposed: boolean = false

    public getAsset<T extends Asset>(assetType: new () => T) {
        return this.provider.asset as T
    }

    public dispose() {
        if (this.isDisposed) {
            ctError(`重复销毁AssetOperationHandle`)
            return
        }

        this.isDisposed = true

        this.provider.releaseHandle(this)
    }

    public instantiateSync(): Node {
        let node = instantiate(this.provider.asset as Prefab)

        return node
    }

    public async instantiateAsync(): Promise<Node> {
        let node = instantiate(this.provider.asset as Prefab)

        return node
    }
}