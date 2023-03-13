import { CoroutineLockType } from "../../../../client/assets/Bundles/Code/Logic/Module/CoroutineLock/CoroutineLockType";
import { CoroutineLock, Lock } from "../../../../client/assets/Scripts/Core/CoroutineLock/CoroutineLock";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { ctError, ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { TimerComponent } from "../../../../client/assets/Scripts/Core/Timer/TimerComponent";

export class LockInfo extends Entity {
    public LockInstanceId: number;
    public CoroutineLock: Lock;

    init(lockInstanceId: number, coroutineLock: Lock) {
        this.CoroutineLock = coroutineLock;
        this.LockInstanceId = lockInstanceId;

        return this
    }

    destroy(): void {
        this.CoroutineLock.dispose();
        this.LockInstanceId = 0;
    }
}

export class LocationComponent extends Entity {
    public readonly locations: Map<number, number> = new Map();
    public readonly lockInfos: Map<number, LockInfo> = new Map();

    public async Add(key: number, instanceId: number) {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.Location, key.toString())
        this.locations.set(key, instanceId);
        ctLog(`location add key: ${key} instanceId: ${instanceId}`);

        lock.dispose()
    }

    public async Remove(key: number) {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.Location, key.toString())
        this.locations.delete(key);
        ctLog(`location remove key: ${key}`);
        lock.dispose()
    }

    public async Lock(key: number, instanceId: number, time: number = 0) {
        let lock = await CoroutineLock.inst.wait(CoroutineLockType.Location, key.toString())

        let lockInfo = this.addChild(LockInfo).init(instanceId, lock)

        this.lockInfos.set(key, lockInfo);

        ctLog(`location lock key: ${key} instanceId: ${instanceId}`);

        if (time > 0) {
            async function TimeWaitAsync() {
                let lockInfoInstanceId = lockInfo.instanceId;
                await TimerComponent.inst.WaitAsync(time);
                if (lockInfo.instanceId != lockInfoInstanceId) {
                    return;
                }
                ctLog(`location timeout unlock key: ${key} instanceId: ${instanceId} newInstanceId: ${instanceId}`);
                this.UnLock(key, instanceId, instanceId);
            }

            TimeWaitAsync()
        }
    }

    public UnLock(key: number, oldInstanceId: number, newInstanceId: number) {
        let lockInfo = this.lockInfos.get(key)

        if (!lockInfo) {
            ctError(`location unlock not found key: ${key} {oldInstanceId}`);
            return;
        }

        if (oldInstanceId != lockInfo.LockInstanceId) {
            ctError(`location unlock oldInstanceId is different: ${key} {oldInstanceId}`);
            return;
        }

        ctLog(`location unlock key: ${key} instanceId: {oldInstanceId} newInstanceId: {newInstanceId}`);

        this.locations.set(key, newInstanceId)

        this.lockInfos.delete(key);

        // 解锁
        lockInfo.dispose();
    }

    public Get(key: number): number {
        let instanceId = this.locations.get(key)
        ctLog(`location get key: ${key} instanceId: ${instanceId}`);
        return instanceId;
    }
}