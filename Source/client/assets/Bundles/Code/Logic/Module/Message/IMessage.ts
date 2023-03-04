export interface IMessage{
}

export interface IRequest extends IMessage{
    RpcId: number
}

export interface IResponse extends IMessage {
    RpcId: number
    Error: number
    Message: string
}