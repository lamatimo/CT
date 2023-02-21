import { _decorator, Component, assetManager, Prefab, SpriteFrame, ImageAsset, instantiate } from 'cc';
import { Entry } from '../../Bundles/Code/Entry';
import { CoroutineLock } from '../Core/CoroutineLock/CoroutineLock';
import { IdGenerater } from '../Core/IdGenerater/IdGenerater';
import { ctLog, Logger } from '../Core/Log/Logger';
import { ObjectPool } from '../Core/ObjectPool/ObjectPool';
import { Options } from '../Core/Options/Options';
import { Game } from '../Core/Singleton/Game';
import { CocosLogger } from './CocosLogger';
import { TAssets } from './TAsset/TAssets';

const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {
    start() {
        Game.addSingleton(Options)
        Game.addSingleton(Logger).iLog = new CocosLogger
        Game.addSingleton(IdGenerater)
        Game.addSingleton(ObjectPool)
        Game.addSingleton(CoroutineLock)
        Game.addSingleton(TAssets)

        this.loadAsync()
    }

    private async loadAsync() {
        let handle1 = await TAssets.loadAssetAsync(ImageAsset, 'B1/cat')
        ctLog(handle1.getAsset(ImageAsset))
        let handle2 = await TAssets.loadAssetAsync(ImageAsset, 'B1/B2/Cartoon')
        ctLog(handle2.getAsset(ImageAsset))

        let codeBundle = await TAssets.loadBundleAsync('Code')
        codeBundle.isAutoRelease = false

        setTimeout(() => {
            handle1.dispose()
            handle1.dispose()
            TAssets.unloadUnusedAssets()
        }, 2000);

        Entry.start()
    }

    protected update(dt: number): void {
        Game.update()
    }

    protected lateUpdate(dt: number): void {
        Game.lateUpdate();
        Game.frameFinishUpdate();
    }

    protected onDestroy(): void {
        Game.dispose()
    }
}