import { ctError } from "../Log/Logger";

type Action = () => void

export class CancellationToken {
    private actions: Set<Action> = new Set;

    public Add(callback: Action) {
        // 如果action是null，绝对不能添加,要抛异常，说明有协程泄漏
        this.actions.add(callback);
    }

    public Remove(callback: Action) {
        this.actions?.delete(callback);
    }

    public IsDispose(): boolean {
        return this.actions == null;
    }

    public Cancel() {
        if (this.actions == null) {
            return;
        }

        this.Invoke();
    }

    private Invoke() {
        let runActions = this.actions;
        this.actions = null;

        try {
            for (let action of runActions) {
                action();
            }
        }
        catch (e) {
            ctError(e)
        }
    }
}