
export class JsHalper {
    public static getMethodName(): string {
        let e = new Error()
        let str = e.stack.split("at ")[2]
        let endPos = str.indexOf(" ")

        return str.substring(0, endPos)
    }

    public static getRootDirName(path: string): string {
        return path.split("/")[0];
    }

    public static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


