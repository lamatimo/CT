import { DecoratorCollector, DecoratorType } from "./DecoratorCollector"

/**
 * 需要存数据库的组件添加这个装饰器
 * @returns 
 */
export function DB(constructor: Function) {
    DecoratorCollector.inst.add(DecoratorType.DB, constructor)
}