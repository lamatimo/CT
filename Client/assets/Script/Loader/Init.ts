import { _decorator, Component} from 'cc';
import { Entry } from '../Codes/Logic/Entry';
import { Root } from '../Core/Entity/Root';
import { EventSystem } from '../Core/EventSystem/EventSystem';
import { IdGenerater } from '../Core/IdGenerater/IdGenerater';
import { Logger } from '../Core/Log/Logger';
import { ObjectPool } from '../Core/ObjectPool/ObjectPool';
import { Options } from '../Core/Options/Options';
import { Game } from '../Core/Singleton/Game';
import { CocosLogger } from './CocosLogger';

const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {
    start() {
        Game.addSingleton(Options)
        Game.addSingleton(Logger).iLog = new CocosLogger
        Game.addSingleton(IdGenerater)
        Game.addSingleton(ObjectPool)
        Game.addSingleton(Root)
        Game.addSingleton(EventSystem)

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