import { _decorator, Component, assetManager, Prefab, SpriteFrame, ImageAsset, instantiate, director } from 'cc';
import { GRoot } from 'fairygui-cc';
import { Entry } from '../../Bundles/Code/Logic/Entry';
import { CoroutineLock } from '../Core/CoroutineLock/CoroutineLock';
import { CtorCollector } from '../Core/Ctor/CtorCollector';
import { IdGenerater } from '../Core/IdGenerater/IdGenerater';
import { ctLog, Logger } from '../Core/Log/Logger';
import { ObjectPool } from '../Core/ObjectPool/ObjectPool';
import { Options } from '../Core/Options/Options';
import { Game } from '../Core/Singleton/Game';
import { TimeInfo } from '../Core/Time/TimeInfo';
import { TimerComponent } from '../Core/Timer/TimerComponent';
import { CocosLogger } from './CocosLogger';
import { TAssets } from './TAsset/TAssets';
import { WindowComponent } from './UI/WindowComponent';

const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {
    start() {
        director.addPersistRootNode(this.node);
        
        Game.addSingleton(Options)
        Game.addSingleton(Logger).iLog = new CocosLogger
        Game.addSingleton(TimeInfo)
        Game.addSingleton(IdGenerater)
        Game.addSingleton(ObjectPool)
        Game.addSingleton(CoroutineLock)
        Game.addSingleton(TAssets)
        Game.addSingleton(WindowComponent)
        Game.addSingleton(TimerComponent)

        // 初始化fgui
        GRoot.create(this.node.getChildByName("UI"))

        this.injection()
        this.loadAsync()
    }

    private injection(){
        CtorCollector.IWebSocketCtor = WebSocket
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