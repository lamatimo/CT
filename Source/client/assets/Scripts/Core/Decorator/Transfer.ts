import { DecoratorCollector, DecoratorType } from "./DecoratorCollector"

/**
 * 需要传送的组件添加这个装饰器
 * @returns 
 */
export function Transfer(constructor: Function) {
    DecoratorCollector.inst.add(DecoratorType.Transfer, constructor)
}