import pb from 'protobufjs';
import { MessageDecorator } from '../../../../../../Scripts/Core/Network/MessageDecorator';
import { ResponseTypeDecorator } from '../../../Module/Message/ResponseTypeDecorator';
import { MessageType } from '../../../../../../Scripts/Core/Network/MessageType';


export class OuterMessage {
	public static readonly R2C_Login = 10002
	public static readonly C2R_Login = 10003
	public static readonly G2C_LoginGate = 10004
	public static readonly C2G_LoginGate = 10005
	public static readonly G2C_Ping = 10006
	public static readonly C2G_Ping = 10007
}


/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.R2C_Login, MessageType.IResponse)
export class R2C_Login extends pb.Message<R2C_Login> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "required")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	@pb.Field.d(4, "string", "optional")
	public Address: string
	@pb.Field.d(5, "int64", "optional")
	public Key: number
	@pb.Field.d(6, "int64", "optional")
	public GateId: number
	constructor(args?: pb.Properties<R2C_Login>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
			this.Address = args.Address
			this.Key = args.Key
			this.GateId = args.GateId
		}
	}

}

/**
 * MessageType IRequest
 * ResponseType R2C_Login
 */
@MessageDecorator(OuterMessage.C2R_Login, MessageType.IRequest)
@ResponseTypeDecorator(R2C_Login)
export class C2R_Login extends pb.Message<C2R_Login> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "string", "optional")
	public Account: string
	@pb.Field.d(3, "string", "optional")
	public Password: string
	constructor(args?: pb.Properties<C2R_Login>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Account = args.Account
			this.Password = args.Password
		}
	}

}

/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.G2C_LoginGate, MessageType.IResponse)
export class G2C_LoginGate extends pb.Message<G2C_LoginGate> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "required")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	@pb.Field.d(4, "int64", "optional")
	public PlayerId: number
	constructor(args?: pb.Properties<G2C_LoginGate>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
			this.PlayerId = args.PlayerId
		}
	}

}

/**
 * MessageType IRequest
 * ResponseType G2C_LoginGate
 */
@MessageDecorator(OuterMessage.C2G_LoginGate, MessageType.IRequest)
@ResponseTypeDecorator(G2C_LoginGate)
export class C2G_LoginGate extends pb.Message<C2G_LoginGate> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int64", "optional")
	public Key: number
	@pb.Field.d(3, "int64", "optional")
	public GateId: number
	constructor(args?: pb.Properties<C2G_LoginGate>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Key = args.Key
			this.GateId = args.GateId
		}
	}

}

/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.G2C_Ping, MessageType.IResponse)
export class G2C_Ping extends pb.Message<G2C_Ping> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "required")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	@pb.Field.d(4, "int64", "optional")
	public Time: number
	constructor(args?: pb.Properties<G2C_Ping>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
			this.Time = args.Time
		}
	}

}

/**
 * MessageType IRequest
 * ResponseType G2C_Ping
 */
@MessageDecorator(OuterMessage.C2G_Ping, MessageType.IRequest)
@ResponseTypeDecorator(G2C_Ping)
export class C2G_Ping extends pb.Message<C2G_Ping> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<C2G_Ping>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}