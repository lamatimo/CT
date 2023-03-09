
export abstract class AInvokeHandler<A, T>{
    public abstract Handle(args: A): T;
}