import { Singleton } from "../Singleton/Singleton";

export class DecoratorCollector {
    private static singletonMap: Map<new () => Singleton, Set<string>> = new Map

    public static addSingletonMethod(t: new () => Singleton, methodName: string) {
        let set = this.singletonMap.get(t)

        if (null == set) {
            set = new Set

            this.singletonMap.set(t, set)
        }

        set.add(methodName)
    }

    public static singletonHas(t: new () => Singleton, methodName: string): boolean {
        let set = this.singletonMap.get(t)

        if (null == set) {
            return false
        }

        return set.has(methodName)
    }
}


