export enum DecoratorType {
    Event,
    Message,
    MessageResponse,
    MessageHandler,
}

export class DecoratorCollector {
    private static _inst: DecoratorCollector
    public static get inst(): DecoratorCollector {
        if (DecoratorCollector._inst == null) {
            DecoratorCollector._inst = new DecoratorCollector
        }

        return DecoratorCollector._inst
    }

    private decorators: Map<DecoratorType, any> = new Map

    public add(decoratorType: DecoratorType, ...args) {
        let array = this.decorators.get(decoratorType)

        if (!array) {
            array = new Array
            this.decorators.set(decoratorType, array)
        }

        array.push(args)
    }

    public get(decoratorType: DecoratorType): Array<any> {
        let array = this.decorators.get(decoratorType)

        return array
    }
}


