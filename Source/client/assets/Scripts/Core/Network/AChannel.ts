export enum ChannelType {
    Connect,
    Accept,
}

export abstract class AChannel {
    public Id: number

    public ChannelType: ChannelType

    public Error: number

    public RemoteAddress: URL


    public get IsDisposed(): boolean {
        return this.Id == 0;

    }

    public abstract Dispose();
}