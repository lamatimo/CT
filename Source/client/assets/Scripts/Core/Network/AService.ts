import { ServiceType } from "./ServiceType";

export abstract class AService {
    public ServiceType: ServiceType
    public Id: number

    public abstract Send(channelId: number, actorId: number, message: any): void
    public abstract Create(id: number, address: URL): void
    public abstract Remove(id: number, error: number): void
    public abstract Dispose(): void
}