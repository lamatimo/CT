import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Collection, Db, Filter, MongoClient } from "mongodb";
import { CoroutineLock } from "../../../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock";
import { CoroutineLockType } from "../../../../client/assets/Bundles/Code/Logic/Module/CoroutineLock/CoroutineLockType";
import { RandomGenerator } from "../../../../client/assets/Scripts/Core/Helper/RandomGenerator";
import { DBHelper } from "./DBHelper";
import { ctError } from "../../../../client/assets/Scripts/Core/Log/Logger";

export class DBComponent extends Entity {
    public static readonly TaskCount = 32;

    public mongoClient: MongoClient;
    public database: Db;

    async init(dbConnection: string, dbName: string) {
        this.mongoClient = new MongoClient(dbConnection);
        await this.mongoClient.connect();
        this.database = this.mongoClient.db(dbName);

        return this
    }

    private GetCollection(ctor: any, name: string = null): Collection {
        return this.database.collection(name ?? ctor.name)
    }

    async QueryById<T>(ctor: new () => T, id: number, collection: string = null): Promise<T> {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (id % DBComponent.TaskCount).toString())
        let filteredDocs = await this.GetCollection(ctor, collection).findOne({ id: id })

        lock.dispose()

        if(filteredDocs){
            return DBHelper.deserialize(filteredDocs)
        }
    }

    async Query<T>(ctor: new () => T, filter: Filter<Document>): Promise<T> {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (RandomGenerator.RandomInt(1, 10086) % DBComponent.TaskCount).toString())
        let filteredDocs = await this.GetCollection(ctor).findOne(filter)

        lock.dispose()

        if(filteredDocs){
            return DBHelper.deserialize(filteredDocs)
        }
    }

    async Save(classObj: any, filter: Filter<Document> = null){
        if(!classObj.constructor){
            ctError(`储存的对象必须是class`)
            return
        }
        let num = classObj.id

        if(!num){
            num = RandomGenerator.RandomInt(1, 10086)
        }

        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (num % DBComponent.TaskCount).toString())

        // 先转化成普通的object
        let normalObj = DBHelper.serializeToObject(classObj)

        if(!filter){
            filter = { id: classObj.id }
        }

        await this.GetCollection(classObj.constructor).replaceOne(filter, normalObj, { upsert: true })

        lock.dispose()
    }

    async Remove<T>(ctor: new () => T, id: number, collection: string = null) {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.DB, (id % DBComponent.TaskCount).toString())
        await this.GetCollection(ctor, collection).deleteOne({ id: id })

        lock.dispose()
    }
}