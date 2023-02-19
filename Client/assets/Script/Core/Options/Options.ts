import { ISingletonAwake, ISingletonAwakeDecorator } from "../Singleton/ISingletonAwake";
import { Singleton } from "../Singleton/Singleton";

export class Options extends Singleton implements ISingletonAwake{
    private static _inst: Options;
    public static get inst(): Options {
        return Options._inst
    }

    process: number = 0
    logLevel: number = 2

    @ISingletonAwakeDecorator
    awake() {
        Options._inst = this
    }


}