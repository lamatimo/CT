import { BsonIgnore } from "../Decorator/BsonIgnore";
import { IEventSystem } from "../EventSystem/EventSystem";
import { IdGenerater } from "../IdGenerater/IdGenerater";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { IRoot } from "./Root";

enum EntityStatus {
    None = 0,
    IsFromPool = 1,
    IsRegister = 1 << 1,
    IsComponent = 1 << 2,
    IsCreated = 1 << 3,
    IsNew = 1 << 4,
}

type EntityCtor = new () => Entity

export abstract class Entity {
    public static eventSystem: IEventSystem
    public static root: IRoot

    @BsonIgnore
    public get parent() {
        return this._parent
    }
    public set parent(value: Entity) {
        if (value == null) {
            throw new Error(`cant set parent null: ${this.constructor.name}`);
        }

        if (value == this) {
            throw new Error(`cant set parent self: ${this.constructor.name}`);
        }

        if (value.domain == null) {
            throw new Error(`cant set parent because parent domain is null: ${this.constructor.name} ${value.constructor.name}`);
        }

        if (this._parent != null) // 之前有parent
        {
            // parent相同，不设置
            if (this._parent == value) {
                throw new Error(`重复设置了Parent: ${this.constructor.name} parent: ${this._parent.constructor.name}`);
            }

            this._parent.removeFromChildren(this);
        }

        this._parent = value;
        this.isComponent = false;
        this._parent.addToChildren(this);
        this.domain = this.parent.domain;
    }

    public get domain() {
        return this._domain
    }

    public set domain(value) {
        if (value == null) {
            throw new Error(`domain cant set null: ${this.constructor.name}`);
        }

        if (this._domain == value) {
            return;
        }

        let preDomain = this._domain;
        this._domain = value;

        if (preDomain == null) {
            this.instanceId = IdGenerater.inst.generateInstanceId();
            this.isRegister = true;
        }

        // 递归设置孩子的Domain
        if (this._children != null) {
            for (let [id, entity] of this._children.entries()) {
                entity._domain = this._domain;
            }
        }

        if (this._components != null) {
            for (let [ctor, component] of this._components.entries()) {
                component.domain = this._domain;
            }
        }

        if (!this.isCreated) {
            this.isCreated = true;
        }
    }

    @BsonIgnore
    public instanceId: number
    public id: number

    @BsonIgnore
    public get isDisposed() {
        return this.instanceId == 0;
    }

    @BsonIgnore
    public get children(): Map<number, Entity> {
        return this._children ??= ObjectPool.inst.fetch(Map) as Map<number, Entity>;
    }

    @BsonIgnore
    public get components(): Map<EntityCtor, Entity> {
        return this._components ??= ObjectPool.inst.fetch(Map) as Map<EntityCtor, Entity>;
    }

    @BsonIgnore
    protected _domain: Entity
    @BsonIgnore
    private _children: Map<number, Entity>
    @BsonIgnore
    private _components: Map<EntityCtor, Entity>
    @BsonIgnore
    protected _parent: Entity
    private status: EntityStatus = EntityStatus.None

    @BsonIgnore
    private get isFromPool() {
        return (this.status & EntityStatus.IsFromPool) == EntityStatus.IsFromPool
    }
    private set isFromPool(value: boolean) {
        if (value) {
            this.status |= EntityStatus.IsFromPool;
        }
        else {
            this.status &= ~EntityStatus.IsFromPool;
        }
    }

    @BsonIgnore
    private get isComponent() {
        return (this.status & EntityStatus.IsComponent) == EntityStatus.IsComponent
    }
    private set isComponent(value: boolean) {
        if (value) {
            this.status |= EntityStatus.IsComponent;
        }
        else {
            this.status &= ~EntityStatus.IsComponent;
        }
    }

    @BsonIgnore
    protected get isCreated() {
        return (this.status & EntityStatus.IsCreated) == EntityStatus.IsCreated
    }
    protected set isCreated(value: boolean) {
        if (value) {
            this.status |= EntityStatus.IsCreated;
        }
        else {
            this.status &= ~EntityStatus.IsCreated;
        }
    }

    @BsonIgnore
    protected get isNew() {
        return (this.status & EntityStatus.IsNew) == EntityStatus.IsNew
    }
    protected set isNew(value: boolean) {
        if (value) {
            this.status |= EntityStatus.IsNew;
        }
        else {
            this.status &= ~EntityStatus.IsNew;
        }
    }

    @BsonIgnore
    protected get isRegister() {
        return (this.status & EntityStatus.IsRegister) == EntityStatus.IsRegister
    }
    protected set isRegister(value: boolean) {
        if (this.isRegister == value) {
            return;
        }

        if (value) {
            this.status |= EntityStatus.IsRegister;
        }
        else {
            this.status &= ~EntityStatus.IsRegister;
        }

        if (!value) {
            Entity.root.remove(this.instanceId);
        }
        else {
            Entity.root.add(this);
            Entity.eventSystem.registerSystem(this);
        }
    }

    @BsonIgnore
    private set componentParent(value: Entity) {
        if (value == null) {
            throw new Error(`cant set parent null: ${this.constructor.name}`);
        }

        if (value == this) {
            throw new Error(`cant set parent self: ${this.constructor.name}`);
        }

        // 严格限制parent必须要有domain,也就是说parent必须在数据树上面
        if (value.domain == null) {
            throw new Error(`cant set parent because parent domain is null: ${this.constructor.name} ${value.constructor.name}`);
        }

        if (this.parent != null) // 之前有parent
        {
            // parent相同，不设置
            if (this.parent == value) {
                throw new Error(`重复设置了Parent: ${this.constructor.name} parent: ${this.parent.constructor.name}`);
            }
            this.parent.removeFromComponents(this);
        }

        this.parent = value;
        this.isComponent = true;
        this.parent.addToComponents(this);
        this.domain = this.parent.domain;
    }

    public addComponent(component: Entity): Entity;
    public addComponent<T extends Entity>(ctor: new () => T): T;
    public addComponent<T extends Entity>(ctor: new () => T, isFromPool: boolean): T;
    public addComponent<T extends Entity>(componentOrCtor: (new () => T) | Entity, isFromPool?: boolean): Entity | T {
        if (componentOrCtor instanceof Entity) {
            return this.addComponentByEntity(componentOrCtor)
        } else {
            return this.addComponentByCtor(componentOrCtor, isFromPool)
        }
    }

    private addComponentByEntity(component: Entity): Entity {
        let ctor = component.constructor;

        if (this._components != null && this._components.has(ctor as EntityCtor)) {
            throw new Error(`entity already has component: ${ctor.name}`);
        }

        component.componentParent = this;

        return component;
    }

    private addComponentByCtor<T extends Entity>(ctor: new () => T, isFromPool: boolean = false): T {
        if (this._components != null && this._components.has(ctor as EntityCtor)) {
            throw new Error(`entity already has component: ${ctor.name}`);
        }

        let component = this.create(ctor, isFromPool);
        component.id = this.id;
        component.componentParent = this;

        if (component.awake) {
            Entity.eventSystem.awakeComEvent(component)
        }

        return component as T;
    }

    public addChild(entity: Entity): Entity;
    public addChild<T extends Entity>(ctor: new () => T): T;
    public addChild<T extends Entity>(ctor: new () => T, isFromPool: boolean): T;
    public addChild<T extends Entity>(entityOrCtor: (new () => T) | Entity, isFromPool?: boolean): Entity | T {
        if (entityOrCtor instanceof Entity) {
            return this.addChildByEntity(entityOrCtor)
        } else {
            return this.addChildByCtor(entityOrCtor, isFromPool)
        }
    }

    public addChildWithId<T extends Entity>(ctor: (new () => T), id: number, isFromPool: boolean = false): T {
        let component = this.create(ctor, isFromPool);
        component.id = id;
        component.parent = this;

        if (component.awake) {
            Entity.eventSystem.awakeComEvent(component);
        }

        return component as T;
    }

    private addChildByEntity(entity: Entity): Entity {
        entity.parent = this;
        return entity;
    }

    private addChildByCtor<T extends Entity>(ctor: new () => T, isFromPool: boolean = false): T {
        let component = this.create(ctor, isFromPool);
        component.id = IdGenerater.inst.generateId();
        component.parent = this;

        if (component.awake) {
            Entity.eventSystem.awakeComEvent(component);
        }

        return component as T;
    }

    private create(ctor: EntityCtor, isFromPool: boolean): Entity {
        let component: Entity

        if (isFromPool) {
            component = ObjectPool.inst.fetch(ctor);
        }
        else {
            component = new ctor;
        }

        component.isFromPool = isFromPool;
        component.isCreated = true;
        component.isNew = true;
        component.id = 0;

        return component;
    }

    private removeFromChildren(entity: Entity): void {
        if (this._children == null) {
            return;
        }

        this._children.delete(entity.id);

        if (this._children.size == 0) {
            ObjectPool.inst.recycle(this._children);
            this._children = null;
        }
    }

    private removeFromComponents(component: Entity): void {
        if (this._components == null) {
            return;
        }

        this._components.delete(component.constructor as EntityCtor);

        if (this._components.size == 0) {
            ObjectPool.inst.recycle(this._components);
            this._components = null;
        }
    }

    private addToComponents(component: Entity): void {
        this.components.set(component.constructor as EntityCtor, component);
    }

    private addToChildren(entity: Entity): void {
        this.children.set(entity.id, entity);
    }

    public getComponent<K extends Entity>(ctor: new () => K): K {
        if (this._components == null) {
            return null;
        }

        let component = this._components.get(ctor);

        if (!component) {
            return null;
        }

        return component as K;
    }

    public removeComponent<T extends Entity>(ctor: new () => T): T {
        if (this.isDisposed) {
            return;
        }

        if (this._components == null) {
            return;
        }

        let c = this.getComponent(ctor);

        if (c == null) {
            return;
        }

        this.removeFromComponents(c);

        c.dispose();
    }

    public getParent<T extends Entity>(ctor: new () => T): T
    {
        return this.parent as T;
    }

    public getChild<T extends Entity>(ctor: new () => T, id: number): T {
        if (this._children == null) {
            return null;
        }
        let child = this._children.get(id);
        return child as T;
    }

    public removeChild(id: number): void {
        if (this._children == null) {
            return;
        }

        let child = this._children.get(id)
        if (!child) {
            return;
        }

        this._children.delete(id);
        child.dispose();
    }

    public dispose(): void {
        if (this.isDisposed) {
            return;
        }

        this.isRegister = false;
        this.instanceId = 0;

        // 清理Component
        if (this._components != null) {
            for (let [entityCtor, entity] of this._components.entries()) {
                entity.dispose()
            }

            this._components.clear();
            ObjectPool.inst.recycle(this._components);
            this._components = null;
        }

        // 清理Children
        if (this._children != null) {
            for (let [id, entity] of this._children.entries()) {
                entity.dispose()
            }

            this._children.clear();
            ObjectPool.inst.recycle(this._children);
            this._children = null;
        }

        // 触发Destroy事件
        if (this.destroy) {
            Entity.eventSystem.destroyComEvent(this);
        }

        this._domain = null;

        if (this._parent != null && !this._parent.isDisposed) {
            if (this.isComponent) {
                this.parent.removeComponent(this.constructor as EntityCtor);
            }
            else {
                this.parent.removeFromChildren(this);
            }
        }

        this._parent = null;

        if (this.isFromPool) {
            ObjectPool.inst.recycle(this);
        }

        this.status = EntityStatus.None;
    }

}