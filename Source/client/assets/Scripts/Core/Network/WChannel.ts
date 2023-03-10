import pb from 'protobufjs';
import Long from 'long';
// import { RawData, WebSocket, WebSocketServer } from "ws";
import { ctError, ctLog } from "../Log/Logger";
import { AChannel } from "./AChannel";
import { NetServices } from "./NetServices";
import { ServiceType } from "./ServiceType";
import { WService } from "./WService";
import { IPEndPoint } from './IPEndPoint';
import { ErrorCore } from './ErrorCore';
import { IWebSocket } from './IWebSocket';
import { CtorCollector } from '../Ctor/CtorCollector';

export class WChannel extends AChannel {
    private static reader: pb.Reader
    private static writer: pb.Writer
    public sender: IWebSocket
    private Service: WService;
    private isConnected: boolean = false;
    private msgQueue: any[] = []

    constructor() {
        super()

        if (!WChannel.reader) {
            WChannel.reader = new pb.Reader(new Uint8Array)
        }

        if (!WChannel.writer) {
            WChannel.writer = new pb.Writer()
        }
    }

    initSender(socket: IWebSocket, request: any, id: number, service: WService) {
        ctLog(`发送端地址：${request.socket.remoteAddress}:${request.socket.remotePort}`)
        this.sender = socket
        this.Id = id
        this.Service = service
        this.isConnected = true
        this.RemoteAddress = new IPEndPoint(request.socket.remoteAddress, request.socket.remotePort)
        this.sender.on("message", this.onMessage.bind(this))
    }

    initByAddress(address: IPEndPoint, id: number, service: WService) {
        let socket = new CtorCollector.IWebSocketCtor(`ws:\\${address}`);

        this.sender = socket
        this.Id = id
        this.Service = service
        this.RemoteAddress = address

        if (this.sender.on) {
            this.sender.on("message", this.onMessage.bind(this))
            this.sender.on("open", this.onConnectComplete.bind(this))
        } else {
            this.sender.onmessage = this.onMessage.bind(this)
            this.sender.onopen = this.onConnectComplete.bind(this)
        }
    }

    private onConnectComplete() {
        this.isConnected = true

        for (const msg of this.msgQueue) {
            this.sender.send(msg)
        }

        this.msgQueue = []
    }

    private onMessage(data: Uint8Array, isBinary: boolean) {
        try {
            let channelId = this.Id;
            let actorId: number = 0;

            WChannel.reader.pos = 0
            WChannel.reader.buf = data
            WChannel.reader.len = data.length

            let opcode = WChannel.reader.uint32()
            let ctor = NetServices.inst.GetType(opcode)
            let message = ctor.decode(WChannel.reader.bytes());

            switch (this.Service.ServiceType) {
                case ServiceType.Outer: {
                    break;
                }
                case ServiceType.Inner: {
                    actorId = (WChannel.reader.uint64() as Long).toNumber()
                    break;
                }
            }

            let keys = Object.keys(message)

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = message[key];

                if (!value) {
                    continue;
                }

                if (value.constructor.name == 'Long') {
                    message[key] = value.toNumber()
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

    public Send(actorId: number, message: pb.Message) {
        if (this.IsDisposed) {
            throw new Error("WChannel已经被Dispose, 不能发送消息");
        }

        let msgCtor = message.constructor
        let result: Uint8Array
        let opcode = NetServices.inst.GetOpcode(msgCtor)
        let encodeMsg = (msgCtor as unknown as typeof pb.Message).encode(message).finish()

        WChannel.writer.reset()
        WChannel.writer.uint32(opcode);
        WChannel.writer.bytes(encodeMsg)

        switch (this.Service.ServiceType) {
            case ServiceType.Inner: {
                WChannel.writer.uint64(actorId);
                break;
            }
            case ServiceType.Outer: {
                break;
            }
        }

        result = WChannel.writer.finish()

        if (this.isConnected) {
            this.sender.send(result)
        } else {
            this.msgQueue.push(result)
        }
    }
}
