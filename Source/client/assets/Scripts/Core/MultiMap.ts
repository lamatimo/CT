/**
 * 一个key对应一个列表
 */
export class MultiMap<T, K> {
    private map: Map<T, K[]>;
    private readonly Empty: K[] = [];

    constructor() {
        this.map = new Map();
    }

    public Add(t: T, k: K) {
        let list = this.map.get(t);
        if (list === undefined) {
            list = [];
            this.map.set(t, list);
        }
        list.push(k);
    }

    public Remove(t: T, k: K) {
        const list = this.map.get(t);
        if (list === undefined) {
            return false;
        }
        const index = list.indexOf(k);
        if (index === -1) {
            return false;
        }
        list.splice(index, 1);
        if (list.length === 0) {
            this.map.delete(t);
        }
        return true;
    }

    public GetAll(t: T): K[] {
        const list = this.map.get(t);
        if (list === undefined) {
            return [];
        }
        return list;
    }

    public get(t: T): K[] {
        return this.map.get(t) ?? this.Empty;
    }

    public GetOne(t: T): K | undefined {
        const list = this.map.get(t);
        if (list !== undefined && list.length > 0) {
            return list[0];
        }
        return undefined;
    }

    public Contains(t: T, k: K) {
        const list = this.map.get(t);
        if (list === undefined) {
            return false;
        }
        return list.includes(k);
    }
}
