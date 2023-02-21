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

    public async wait(key: string) {
        let lockSet = this.lockMap.get(key)

        if (!lockSet) {
            lockSet = new Set

            this.lockMap.set(key, lockSet)
        }

        let lock = ObjectPool.inst.fetch(Lock)

        lock.init(key)

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