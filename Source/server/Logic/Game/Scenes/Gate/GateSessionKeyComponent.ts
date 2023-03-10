import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";
import { TimerComponent } from "../../../../../client/assets/Scripts/Core/Timer/TimerComponent";

export class GateSessionKeyComponent extends Entity {
    public readonly sessionKey: Map<number, string> = new Map();

    public Add(key: number, account: string) {
        this.sessionKey.set(key, account);
        this.TimeoutRemoveKey(key)
    }

    public Get(key: number): string {
        let account = this.sessionKey.get(key);
        return account;
    }

    public Remove(key: number) {
        this.sessionKey.delete(key);
    }

    private async TimeoutRemoveKey(key: number) {
        await TimerComponent.inst.WaitAsync(20000);
        this.sessionKey.delete(key);
    }
}