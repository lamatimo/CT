import { IdGenerater } from "../IdGenerater/IdGenerater";
import { ObjectPool } from "../ObjectPool/ObjectPool";

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

    public get domain(){
        return this._domain
    }

    public set domain(value){
        if (value == null)
        {
            throw new Error(`domain cant set null: ${this.constructor.name}`);
        }
        
        if (this._domain == value)
        {
            return;
        }
        
        let preDomain = this._domain;
        this._domain = value;
        
        if (preDomain == null)
        {
            this.instanceId = IdGenerater.inst.generateInstanceId();
            this.isRegister = true;
        }

        // 递归设置孩子的Domain
        if (this._children != null)
        {
            for (let [id, entity] of this._children.entries())
            {
                entity._domain = this._domain;
            }
        }

        if (this._components != null)
        {
            for (let [ctor, component] of this._components.entries())
            {
                component.domain = this._domain;
            }
        }

        if (!this.isCreated)
        {
            this.isCreated = true;
        }
    }

    public instanceId: number
    public id: number
    
    public get isDisposed() {
        return this.instanceId == 0;
    }
    
    public get children(): Map<number, Entity> {
        return this._children ??= ObjectPool.inst.fetch(Map) as Map<number, Entity>;
    }
    
    protected _domain: Entity
    private _children: Map<number, Entity>
    private _components: Map<EntityCtor, Entity>
    protected _parent: Entity
    private status: EntityStatus = EntityStatus.None

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

    protected get isRegister() {
        return (this.status & EntityStatus.IsRegister) == EntityStatus.IsRegister
    }
    protected set isRegister(value: boolean) {
        if (value) {
            this.status |= EntityStatus.IsRegister;
        }
        else {
            this.status &= ~EntityStatus.IsRegister;
        }
    }

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
            component.awake()
        }

        return component as T;
    }

    public addChild(entity: Entity): Entity;
    public addChild<T extends Entity>(ctor: new () => T, isFromPool: boolean): T;
    public addChild<T extends Entity>(entityOrCtor: (new () => T) | Entity, isFromPool?: boolean): Entity | T {
        if (entityOrCtor instanceof Entity) {
            return this.addChildByEntity(entityOrCtor)
        } else {
            return this.addChildByCtor(entityOrCtor, isFromPool)
        }
    }

    private addChildByEntity(entity: Entity): Entity {
        entity.parent = this;
        return entity;
    }

    private addChildByCtor<T extends Entity>(ctor: new () => T, isFromPool: boolean = false): T {
        if (this._components != null && this._components.has(ctor as EntityCtor)) {
            throw new Error(`entity already has component: ${ctor.name}`);
        }

        let component = this.create(ctor, isFromPool);
        component.id = this.id;
        component.componentParent = this;

        if (component.awake) {
            component.awake()
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
        this._components.set(component.constructor as EntityCtor, component);
    }

    private addToChildren(entity: Entity): void
    {
        this._children.set(entity.id, entity);
    }

}