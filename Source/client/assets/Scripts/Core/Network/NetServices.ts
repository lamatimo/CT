import { Long } from "protobufjs";
import { DecoratorCollector, DecoratorType } from "../Decorator/DecoratorCollector";
import { DoubleMap } from "../DoubleMap";
import { Singleton } from "../Singleton/Singleton";
import { AService } from "./AService";

type AcceptCallback = (args0: number, args1: URL) => void
type ReadCallback = (args0: number, args1: Long, args2: any) => void
type ErrorCallback = (args0: number, args1: number) => void
type Ctor = any

export class NetServices extends Singleton {
    public static get inst(): NetServices {
        return this._inst as NetServices
    }

    private acceptIdGenerator = Number.MAX_VALUE;
    private readonly typeOpcode: DoubleMap<Ctor, number> = new DoubleMap();
    private services: Map<number, AService> = new Map
    private readonly queue: Array<number> = new Array;
    private serviceIdGenerator: number = 0
    private readonly acceptCallback: Map<number, AcceptCallback> = new Map;
    private readonly readCallback: Map<number, ReadCallback> = new Map;
    private readonly errorCallback: Map<number, ErrorCallback> = new Map;

    awake(){
        let list = DecoratorCollector.inst.get(DecoratorType.Message)

        for (const args of list) {
            let opcode = args[2]
            let msgType = args[1]
            let messageCtor = args[0]

            this.typeOpcode.Add(messageCtor, opcode)
        }
    }

    public SendMessage(serviceId: number, channelId: number, actorId: number, message: any): void {
        let service = this.Get(serviceId);

        if (service != null) {
            service.Send(channelId, actorId, message);
        }
    }

    public AddService(aService: AService): number {
        aService.Id = ++this.serviceIdGenerator;

        this.Add(aService);

        return aService.Id;
    }

    public RemoveService(serviceId: number): void {
        this.Remove(serviceId);
    }

    public CreateChannel(serviceId: number, channelId: number, address: URL): void {
        let service = this.Get(serviceId);

        if (service != null) {
            service.Create(channelId, address);
        }
    }

    public RemoveChannel(serviceId: number, channelId: number, error: number) {
        let service = this.Get(serviceId);

        if (service != null) {
            service.Remove(channelId, error);
        }
    }


    public RegisterAcceptCallback(serviceId: number, action: AcceptCallback) {
        this.acceptCallback.set(serviceId, action);
    }

    public RegisterReadCallback(serviceId: number, action: ReadCallback) {
        this.readCallback.set(serviceId, action);
    }

    public RegisterErrorCallback(serviceId: number, action: ErrorCallback) {
        this.errorCallback.set(serviceId, action);
    }

    public OnAccept(serviceId: number, channelId: number, ipEndPoint: URL) {
        let cb = this.acceptCallback.get(serviceId)

        if (!cb) {
            return;
        }

        cb(channelId, ipEndPoint)
    }

    public OnRead(serviceId: number, channelId: number, actorId: Long, message: any) {
        let cb = this.readCallback.get(serviceId)

        if (!cb) {
            return;
        }

        cb(channelId, actorId, message)
    }

    public OnError(serviceId: number, channelId: number, error: number) {
        let cb = this.errorCallback.get(serviceId)

        if (!cb) {
            return;
        }

        cb(channelId, error)
    }

    public Get(id: number): AService {
        return this.services.get(id);
    }

    private Add(aService: AService): void {
        this.services.set(aService.Id, aService);
        this.queue.push(aService.Id);
    }

    private Remove(id: number) {
        let service = this.services.get(id)
        if (service) {
            service.Dispose();
        }
    }

    public GetOpcode(type: Ctor): number {
        return this.typeOpcode.GetValueByKey(type);
    }

    public GetType(opcode: number): Ctor {
        return this.typeOpcode.GetKeyByValue(opcode);
    }

    public CreateAcceptChannelId(): number
    {
        return --this.acceptIdGenerator;
    }
}