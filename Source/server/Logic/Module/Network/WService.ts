// import { AService } from "./AService";
// import { IClientWebSocket, IServerWebSocket } from "./IWebSocket";
// import { ServiceType } from "./ServiceType";
// import { WChannel } from "./WChannel";

import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { AService } from "../../../../client/assets/Scripts/Core/Network/AService";
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ServiceType } from "../../../../client/assets/Scripts/Core/Network/ServiceType";
import { WChannel } from "./WChannel";

export class WService extends AService {
    acceptor: WebSocketServer
    private readonly idChannels:Map<number, WChannel>  = new Map;

    initAcceptor(url: URL, serviceType: ServiceType) {
        this.ServiceType = serviceType

        this.acceptor = new WebSocketServer({ host: url.host, port: parseInt(url.port) })

        this.acceptor.on("connection", this.onConnection.bind(this))
    }

    public Send(channelId: number, actorId: number, message: any): void {

    }

    public Create(id: number, address: URL): void {

    }

    public Dispose(): void {

    }

    public Remove(id: number, error: number): void {

    }

    private onConnection(ws: WebSocket, request: IncomingMessage){
        let id = NetServices.inst.CreateAcceptChannelId();
        let channel = new WChannel();

        channel.initSender(ws, id, this)

        this.idChannels.set(channel.Id, channel);
        
        NetServices.inst.OnAccept(this.Id, id, channel.RemoteAddress);
    }
    //     public static serverSocketCtor: new ()=> IServerWebSocket;
    //     public static clientSocketCtor: new ()=> IClientWebSocket;
    //     private readonly channels: Map<number, WChannel>  = new Map;
    //     private socket: IServerWebSocket

    //     public initClient(url: URL){

    //     }

    //     public initServer(host: string, port: number, serverType: ServiceType){
    //         this.ServiceType = serverType
    //         this.socket = new WService.serverSocketCtor()

    //         this.socket.init(host, port)
    //         this.socket.onConnection(this.onConnection.bind(this))
    //     }

    //     private onConnection(socket: IClientWebSocket){

    //     }
}

export { }