export class AsyncButtonListener {
    private callback: Function

    private _isClick: boolean

    constructor(func: Function) {
        this.callback = func
    }

    async invoke(...args) {
        if(this._isClick)
        {
            return
        }

        this._isClick = true

        await this.callback(...args)

        this._isClick = false
    }
}


