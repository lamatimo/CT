import { _decorator, Component} from 'cc';
import { Root } from '../Core/Entity/Root';
import { Logger } from '../Core/Log/Logger';
import { ObjectPool } from '../Core/ObjectPool/ObjectPool';
import { Game } from '../Core/Singleton/Game';
import { CocosLogger } from './CocosLogger';

const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {
    start() {
        Game.addSingleton(Logger).iLog = new CocosLogger
        Game.addSingleton(ObjectPool)
        Game.addSingleton(Root)

        Game.dispose()
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