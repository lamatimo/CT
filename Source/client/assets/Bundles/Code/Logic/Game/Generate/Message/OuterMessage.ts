import pb from 'protobufjs';
import { MessageDecorator } from '../../../../../../Scripts/Core/Network/MessageDecorator';
import { ResponseTypeDecorator } from '../../../Module/Message/ResponseTypeDecorator';
import { MessageType } from '../../../../../../Scripts/Core/Network/MessageType';


export class OuterMessage {
	public static readonly Message_TestOuter1 = 10002
	public static readonly Message_TestOuter2 = 10003
	public static readonly Message_TestOuter3 = 10004
	public static readonly Message_TestOuter4 = 10005
	public static readonly Message_TestOuter5 = 10006
	public static readonly Message_TestOuter6 = 10007
	public static readonly Message_TestOuter7 = 10008
	public static readonly Message_TestOuter8 = 10009
	public static readonly Message_TestOuter9 = 10010
	public static readonly R2C_Login = 10011
	public static readonly C2R_Login = 10012
}


/**
 * MessageType IMessage
 */
@MessageDecorator(OuterMessage.Message_TestOuter1, MessageType.IMessage)
export class Message_TestOuter1 extends pb.Message<Message_TestOuter1> {

	constructor(args?: pb.Properties<Message_TestOuter1>){
		super();
		if(args){
		}
	}

}

/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.Message_TestOuter2, MessageType.IResponse)
export class Message_TestOuter2 extends pb.Message<Message_TestOuter2> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestOuter2>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
		}
	}

}

/**
 * MessageType IRequest
 * ResponseType Message_TestOuter2
 */
@MessageDecorator(OuterMessage.Message_TestOuter3, MessageType.IRequest)
@ResponseTypeDecorator(Message_TestOuter2)
export class Message_TestOuter3 extends pb.Message<Message_TestOuter3> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestOuter3>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}

/**
 * MessageType IActorMessage
 */
@MessageDecorator(OuterMessage.Message_TestOuter4, MessageType.IActorMessage)
export class Message_TestOuter4 extends pb.Message<Message_TestOuter4> {

	constructor(args?: pb.Properties<Message_TestOuter4>){
		super();
		if(args){
		}
	}

}

/**
 * 这个消息的注释
 * MessageType IActorResponse
 */
@MessageDecorator(OuterMessage.Message_TestOuter5, MessageType.IActorResponse)
export class Message_TestOuter5 extends pb.Message<Message_TestOuter5> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestOuter5>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
		}
	}

}

/**
 * MessageType IActorRequest
 * ResponseType Message_TestOuter5
 */
@MessageDecorator(OuterMessage.Message_TestOuter6, MessageType.IActorRequest)
@ResponseTypeDecorator(Message_TestOuter5)
export class Message_TestOuter6 extends pb.Message<Message_TestOuter6> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestOuter6>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}

/**
 * MessageType IActorLocationMessage
 */
@MessageDecorator(OuterMessage.Message_TestOuter7, MessageType.IActorLocationMessage)
export class Message_TestOuter7 extends pb.Message<Message_TestOuter7> {

	constructor(args?: pb.Properties<Message_TestOuter7>){
		super();
		if(args){
		}
	}

}

/**
 * MessageType IActorLocationResponse
 */
@MessageDecorator(OuterMessage.Message_TestOuter8, MessageType.IActorLocationResponse)
export class Message_TestOuter8 extends pb.Message<Message_TestOuter8> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestOuter8>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
		}
	}

}

/**
 * MessageType IActorLocationRequest
 * ResponseType Message_TestOuter8
 */
@MessageDecorator(OuterMessage.Message_TestOuter9, MessageType.IActorLocationRequest)
@ResponseTypeDecorator(Message_TestOuter8)
export class Message_TestOuter9 extends pb.Message<Message_TestOuter9> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestOuter9>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}

/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.R2C_Login, MessageType.IResponse)
export class R2C_Login extends pb.Message<R2C_Login> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
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