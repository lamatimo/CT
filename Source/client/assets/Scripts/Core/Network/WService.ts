// import { AService } from "./AService";
// import { IClientWebSocket, IServerWebSocket } from "./IWebSocket";
// import { ServiceType } from "./ServiceType";
// import { WChannel } from "./WChannel";

import { CtorCollector } from "../Ctor/CtorCollector";
import { ctError, ctLog } from "../Log/Logger";
import { AService } from "./AService";
import { ErrorCore } from "./ErrorCore";
import { IPEndPoint } from "./IPEndPoint";
import { IWebSocketServer, IWebSocket } from "./IWebSocket";
import { NetServices } from "./NetServices";
import { ServiceType } from "./ServiceType";
import { WChannel } from "./WChannel";

export class WService extends AService {
    acceptor: IWebSocketServer
    private readonly idChannels: Map<number, WChannel> = new Map;


    initSender(serviceType: ServiceType) {
        this.ServiceType = serviceType
    }

    initAcceptor(address: IPEndPoint, serviceType: ServiceType) {
        this.ServiceType = serviceType

        this.acceptor = new CtorCollector.IWebSocketServerCtor({ host: address.host, port: address.port })

        ctLog(`启动新的ws: ${address.host}:${address.port}`)

        this.acceptor.on("connection", this.onConnection.bind(this))
    }

    public Send(channelId: number, actorId: number, message: any): void {
        try
        {
            let aChannel = this.idChannels.get(channelId)
            if (aChannel == null)
            {
                NetServices.inst.OnError(this.Id, channelId, ErrorCore.ERR_SendMessageNotFoundWChannel);
                return;
            }

            aChannel.Send(actorId, message);
        }
        catch (e)
        {
            ctError(e);
        }
    }

    private innerCreate(id: number, address: IPEndPoint) {
        let channel = new WChannel();

        channel.initByAddress(address, id, this)

        this.idChannels.set(channel.Id, channel);
    }

    public Create(id: number, address: IPEndPoint): void {
        if (this.idChannels.has(id)) {
            return
        }

        this.innerCreate(id, address)
    }

    public Dispose(): void {

    }

    public Remove(id: number, error: number = 0): void {
        let channel: WChannel = this.idChannels.get(id);

        if (!channel) {
            return;
        }

        channel.Error = error;

        this.idChannels.delete(id);
        channel.Dispose();
    }

    private onConnection(socket: IWebSocket, request: any) {
        let id = NetServices.inst.CreateAcceptChannelId();
        let channel = new WChannel();

        channel.initSender(socket, request, id, this)

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