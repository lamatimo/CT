import { ObjectPool } from "../ObjectPool/ObjectPool";
import { Singleton } from "../Singleton/Singleton";
import { Task } from "../Task/Task";

export class Lock {
    public key: string
    public task: Task<void>

    init(key: string) {
        this.key = key

        this.task = Task.create()
    }

    dispose() {
        CoroutineLock.inst.runNextLock(this)
    }
}

export class CoroutineLock extends Singleton {
    public static get inst(): CoroutineLock {
        return CoroutineLock._inst as CoroutineLock
    }

    private lockMap: Map<string, Set<Lock>> = new Map

    public async wait(lockType: string, key: string) {
        let newKey = `${lockType}_${key}`
        let lockSet = this.lockMap.get(newKey)

        if (!lockSet) {
            lockSet = new Set

            this.lockMap.set(newKey, lockSet)
        }

        let lock = ObjectPool.inst.fetch(Lock)

        lock.init(newKey)

        lockSet.add(lock)

        if (lockSet.size > 1) {
            await lock.task
        } else {
            lock.task.setResult()
        }

        return lock
    }

    public runNextLock(lock: Lock) {
        let lockSet = this.lockMap.get(lock.key)

        lockSet.delete(lock)

        for (const lock of Array.from(lockSet.values())) {
            lock.task.setResult()
            ObjectPool.inst.recycle(lock)
            break
        }
    }
}