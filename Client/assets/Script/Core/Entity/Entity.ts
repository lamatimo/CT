import { ObjectPool } from "../ObjectPool/ObjectPool";

export abstract class Entity {
    private _parent: Entity
    public get parent() {
        return this._parent
    }
    public set parent(value: Entity) {
        this._parent = value
    }

    private componentMap: Map<new () => void, Entity>

    public addComponent<T extends Entity, P1, P2, P3>(type: new () => T, p1: P1, p2: P2, p3: P3): T;
    public addComponent<T extends Entity, P1, P2>(type: new () => T, p1: P1, p2: P2): T;
    public addComponent<T extends Entity, P1>(type: new () => T, p1: P1): T;
    public addComponent<T extends Entity>(type: new () => T): T;
    public addComponent<T extends Entity, P1, P2, P3>(type: new () => T, p1?: P1, p2?: P2, p3?: P3): T {
        {
            if (this.componentMap != null && this.componentMap.has(type)) {
                throw new Error("entity already has component: {type.FullName}");
            }

            let com = ObjectPool.inst.fetch(type)

            return com
            // Entity component = Create(type, isFromPool);
            // component.Id = this.Id;
            // component.ComponentParent = this;
            // EventSystem.Instance.Awake(component);

            // if (this is IAddComponent)
            // {
            //     EventSystem.Instance.AddComponent(this, component);
            // }
            // return component as K;
        }
    }


}