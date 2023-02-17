
export class JsHalper {
    public static getMethodName(): string {
        let e = new Error()
        let str = e.stack.split("at ")[2]
        let endPos = str.indexOf(" ")

        return str.substring(0, endPos)
    }
}


