import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Collection, Db, MongoClient } from "mongodb";
import { CoroutineLock } from "../../../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock";
import { CoroutineLockType } from "../../../../client/assets/Bundles/Code/Logic/Module/CoroutineLock/CoroutineLockType";

export class DBComponent extends Entity {
    public static readonly TaskCount = 32;

    public mongoClient: MongoClient;
    public database: Db;

    async init(dbConnection: string, dbName: string) {
        this.mongoClient = new MongoClient(dbConnection);
        await this.mongoClient.connect();
        this.database = this.mongoClient.db(dbName);
    }

    private GetCollection(ctor: any, name: string = null): Collection {
        return this.database.collection(name ?? ctor.name)
    }

    async Query<T>(ctor: new () => T, id: number, collection: string = null): Promise<T> {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (id % DBComponent.TaskCount).toString())
        let filteredDocs = await this.GetCollection(ctor, collection).findOne({ id: id })

        lock.dispose()

        return filteredDocs as T
    }

    async Save<T extends Entity>(entity: T, collection: string = null) {

        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (entity.id % DBComponent.TaskCount).toString())
        await this.GetCollection(entity.constructor, collection).replaceOne({ id: entity.id }, entity, { upsert: true })

        lock.dispose()
    }

    async Remove<T>(ctor: new () => T, id: number, collection: string = null) {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (id % DBComponent.TaskCount).toString())
        await this.GetCollection(ctor, collection).deleteOne({ id: id })

        lock.dispose()
    }
}