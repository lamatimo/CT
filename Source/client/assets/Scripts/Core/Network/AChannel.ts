import { IPEndPoint } from "./IPEndPoint";

export enum ChannelType {
    Connect,
    Accept,
}

export abstract class AChannel {
    public Id: number

    public ChannelType: ChannelType

    public Error: number

    /**
     * 发送端的ip
     */
    public RemoteAddress: IPEndPoint


    public get IsDisposed(): boolean {
        return this.Id == 0;

    }

    public abstract Dispose();
}