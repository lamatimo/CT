export class IPEndPoint {
    public host: string
    public port: number

    constructor(host: string, port: number) {
        this.host = host
        this.port = port
    }

    public toString() {
        return `${this.host}:${this.port}`
    }
}