export class Singleton {
    protected static _inst: Singleton
    private _isDisposed: boolean = false

    public static create() {
        if (this._inst) {
            return
        }

        this._inst = new this

        return this._inst
    }

    public get isDisposed() {
        return this._isDisposed
    }

    public dispose(): void {
        if (this._isDisposed) {
            return
        }

        if (this.destroy) {
            this.destroy()
        }

        this._isDisposed = true
    }
}