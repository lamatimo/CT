export class IPEndPoint{
    public address: string
    public port: number

    constructor(address: string, port: number){
        this.address = address
        this.port = port
    }
}