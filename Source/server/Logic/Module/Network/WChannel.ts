import pb from 'protobufjs';
import Long from 'long';
import { RawData, WebSocket, WebSocketServer } from "ws";
import { ctError, ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { AChannel } from "../../../../client/assets/Scripts/Core/Network/AChannel";
import { NetServices } from "../../../../client/assets/Scripts/Core/Network/NetServices";
import { ServiceType } from "../../../../client/assets/Scripts/Core/Network/ServiceType";
import { WService } from "./WService";
import { IPEndPoint } from '../../../../client/assets/Scripts/Core/Network/IPEndPoint';
import { IncomingMessage } from 'http';
import { ErrorCore } from '../../../../client/assets/Scripts/Core/Network/ErrorCore';

export class WChannel extends AChannel {
    private static reader: pb.Reader
    public sender: WebSocket
    private Service: WService;

    constructor() {
        super()

        if (!WChannel.reader) {
            WChannel.reader = new pb.Reader(new Uint8Array)
        }
    }

    initSender(socket: WebSocket, request: IncomingMessage, id: number, service: WService) {
        ctLog(`发送端地址：${request.socket.remoteAddress},${request.socket.remotePort}`)
        this.sender = socket
        this.Id = id
        this.Service = service
        this.RemoteAddress = new IPEndPoint(request.socket.remoteAddress, request.socket.remotePort)
        this.sender.on("message", this.onMessage.bind(this))
    }

    private onMessage(data: Uint8Array, isBinary: boolean) {
        try {
            let channelId = this.Id;
            let message: any = null;
            let actorId: number;

            WChannel.reader.buf = data

            switch (this.Service.ServiceType) {
                case ServiceType.Outer:
                    {
                        let opcode = WChannel.reader.uint32()
                        WChannel.reader.pos = 0

                        let ctor = NetServices.inst.GetType(opcode)

                        message = ctor.decode(WChannel.reader);
                        break;
                    }
                case ServiceType.Inner:
                    {
                        actorId = (WChannel.reader.int64() as Long).toNumber()
                        let opcode = WChannel.reader.uint32()
                        let ctor = NetServices.inst.GetType(opcode)
                        message = ctor.decode(WChannel.reader);
                        break;
                    }
            }

            NetServices.inst.OnRead(this.Service.Id, channelId, actorId, message);
        } catch (error) {
            ctError(`${this.RemoteAddress} ${data} ${error}`);
            // 出现任何消息解析异常都要断开Session，防止客户端伪造消息
            this.OnError(ErrorCore.ERR_WChannelReadError);
        }

    }

    public Dispose() {
        if (this.IsDisposed) {
            return;
        }

        ctLog(`channel dispose: ${this.Id} ${this.RemoteAddress.toString()} ${this.Error}`);

        let id = this.Id;
        this.Id = 0;
        this.Service.Remove(id);
        this.sender.close();
        this.sender = null;
    }

    private OnError(error: number) {
        ctLog(`WChannel OnError: ${error} ${this.RemoteAddress}`);

        let channelId = this.Id;

        this.Service.Remove(channelId, error);
        NetServices.inst.OnError(this.Service.Id, channelId, error);
    }
    //     private Service: IWService;

    //     private webSocket: IWebSocket;

    //     private readonly queue: Array<Uint8Array> = new Array;

    //     private isSending: boolean;

    //     private isConnected: boolean;

    //     initServer(id: number, webSocket: IWebSocket,  connectUrl: string,  service: IWService) {
    //         this.Id = id;
    //         this.Service = service;
    //         this.ChannelType = ChannelType.Connect;
    //         this.webSocket = webSocket;

    //         this.isConnected = false;
    //         this.isSending = false;
    //     }

    //     initClient(){

    //     }

    //     public Dispose() {
    //         if (this.IsDisposed) {
    //             return;
    //         }

    //         this.webSocket.close();
    //         this.webSocket = null;
    //     }

    //     public async ConnectAsync( url: string) {
    //         try {
    //             this.webSocket.
    //             await((ClientWebSocket) this.webSocket).ConnectAsync(new Uri(url), cancellationTokenSource.Token);
    //             isConnected = true;

    //             this.StartRecv().Coroutine();
    //             this.StartSend().Coroutine();
    //         }
    //         catch (Exception e)
    //         {
    //             Log.Error(e);
    //             this.OnError(ErrorCore.ERR_WebsocketConnectError);
    //         }
    //     }

    //     public void Send(MemoryStream stream) {
    //         switch (this.Service.ServiceType) {
    //             case ServiceType.Inner:
    //                 break;
    //             case ServiceType.Outer:
    //                 stream.Seek(Packet.ActorIdLength, SeekOrigin.Begin);
    //                 break;
    //         }

    //         this.queue.Enqueue(stream);

    //         if (this.isConnected) {
    //             this.StartSend().Coroutine();
    //         }
    //     }

    //     public async ETTask StartSend() {
    //         if (this.IsDisposed) {
    //             return;
    //         }

    //         try {
    //             if (this.isSending) {
    //                 return;
    //             }

    //             this.isSending = true;

    //             while (true) {
    //                 if (this.queue.Count == 0) {
    //                     this.isSending = false;
    //                     return;
    //                 }

    //                     MemoryStream bytes = this.queue.Dequeue();
    //                 try {
    //                     await this.webSocket.SendAsync(new ReadOnlyMemory<byte>(bytes.GetBuffer(), (int)bytes.Position, (int)(bytes.Length - bytes.Position)), WebSocketMessageType.Binary, true, cancellationTokenSource.Token);
    //                     if (this.IsDisposed) {
    //                         return;
    //                     }
    //                 }
    //                 catch (Exception e)
    //                 {
    //                     Log.Error(e);
    //                     this.OnError(ErrorCore.ERR_WebsocketSendError);
    //                     return;
    //                 }
    //             }
    //         }
    //         catch (Exception e)
    //         {
    //             Log.Error(e);
    //         }
    //     }

    //     private byte[] cache = new byte[ushort.MaxValue];

    //     public async ETTask StartRecv() {
    //         if (this.IsDisposed) {
    //             return;
    //         }

    //         try {
    //             while (true) {
    //                     ValueWebSocketReceiveResult receiveResult;
    //                     int receiveCount = 0;
    //                 do {
    //                     receiveResult = await this.webSocket.ReceiveAsync(
    //                         new Memory<byte>(cache, receiveCount, this.cache.Length - receiveCount),
    //                         cancellationTokenSource.Token);
    //                     if (this.IsDisposed) {
    //                         return;
    //                     }

    //                     receiveCount += receiveResult.Count;
    //                 }
    //                 while (!receiveResult.EndOfMessage);

    //                 if (receiveResult.MessageType == WebSocketMessageType.Close) {
    //                     this.OnError(ErrorCore.ERR_WebsocketPeerReset);
    //                     return;
    //                 }

    //                 if (receiveResult.Count > ushort.MaxValue) {
    //                     await this.webSocket.CloseAsync(WebSocketCloseStatus.MessageTooBig, $"message too big: {receiveCount}",
    //                         cancellationTokenSource.Token);
    //                     this.OnError(ErrorCore.ERR_WebsocketMessageTooBig);
    //                     return;
    //                 }

    //                 this.recvStream.SetLength(receiveCount);
    //                 this.recvStream.Seek(2, SeekOrigin.Begin);
    //                 Array.Copy(this.cache, 0, this.recvStream.GetBuffer(), 0, receiveCount);
    //                 this.OnRead(this.recvStream);
    //             }
    //         }
    //         catch (Exception e)
    //         {
    //             Log.Error(e);
    //             this.OnError(ErrorCore.ERR_WebsocketRecvError);
    //         }
    //     }

    //     private void OnRead(MemoryStream memoryStream) {
    //         try {
    //                 long channelId = this.Id;
    //                 object message = null;
    //                 long actorId = 0;
    //             switch (this.Service.ServiceType) {
    //                 case ServiceType.Outer:
    //                     {
    //                         ushort opcode = BitConverter.ToUInt16(memoryStream.GetBuffer(), Packet.KcpOpcodeIndex);
    //                         Type type = NetServices.Instance.GetType(opcode);
    //                         message = SerializeHelper.Deserialize(type, memoryStream);
    //                         break;
    //                     }
    //                 case ServiceType.Inner:
    //                     {
    //                         actorId = BitConverter.ToInt64(memoryStream.GetBuffer(), Packet.ActorIdIndex);
    //                         ushort opcode = BitConverter.ToUInt16(memoryStream.GetBuffer(), Packet.OpcodeIndex);
    //                         Type type = NetServices.Instance.GetType(opcode);
    //                         message = SerializeHelper.Deserialize(type, memoryStream);
    //                         break;
    //                     }
    //             }
    //             NetServices.Instance.OnRead(this.Service.Id, channelId, actorId, message);
    //         }
    //         catch (Exception e)
    //         {
    //             Log.Error($"{this.RemoteAddress} {memoryStream.Length} {e}");
    //             // 出现任何消息解析异常都要断开Session，防止客户端伪造消息
    //             this.OnError(ErrorCore.ERR_PacketParserError);
    //         }
    //     }

    //     private void OnError(int error) {
    //         Log.Info($"WChannel error: {error} {this.RemoteAddress}");

    //             long channelId = this.Id;

    //         this.Service.Remove(channelId);

    //         NetServices.Instance.OnError(this.Service.Id, channelId, error);
    //     }
}
