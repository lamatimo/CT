import pb from 'protobufjs';
import { ResponseTypeDecorator } from '../../../../../client/assets/Bundles/Code/Logic/Module/Message/ResponseTypeDecorator';
import { MessageDecorator } from '../../../../../client/assets/Scripts/Core/Network/MessageDecorator';
import { MessageType } from '../../../../../client/assets/Scripts/Core/Network/MessageType';


export class InnerMessage {
	public static readonly Message_TestInner666 = 20002
	public static readonly Message_TestInner1 = 20003
	public static readonly Message_TestInner2 = 20004
	public static readonly Message_TestInner3 = 20005
	public static readonly Message_TestInner4 = 20006
	public static readonly Message_TestInner5 = 20007
	public static readonly Message_TestInner6 = 20008
	public static readonly Message_TestInner7 = 20009
	public static readonly Message_TestInner8 = 20010
	public static readonly Message_TestInner9 = 20011
}


@MessageDecorator(InnerMessage.Message_TestInner666, MessageType.IMessage)
export class Message_TestInner666 extends pb.Message<Message_TestInner666> {

	constructor(args?: pb.Properties<Message_TestInner666>){
		super();
		if(args){
		}
	}

}

/**
 * Message_TestInner1的注释
 * MessageType IMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner1, MessageType.IMessage)
export class Message_TestInner1 extends pb.Message<Message_TestInner1> {

	constructor(args?: pb.Properties<Message_TestInner1>){
		super();
		if(args){
		}
	}

}

/**
 * Message_TestInner2的注释
 * MessageType IResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner2, MessageType.IResponse)
export class Message_TestInner2 extends pb.Message<Message_TestInner2> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner2>){
		super();
		if(args){
			this.RpcId = args.RpcId
			this.Error = args.Error
			this.Message = args.Message
		}
	}

}

/**
 * Message_TestInner3的注释
 * MessageType IRequest
 * ResponseType Message_TestInner2
 */
@MessageDecorator(InnerMessage.Message_TestInner3, MessageType.IRequest)
@ResponseTypeDecorator(Message_TestInner2)
export class Message_TestInner3 extends pb.Message<Message_TestInner3> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner3>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}

/**
 * MessageType IActorMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner4, MessageType.IActorMessage)
export class Message_TestInner4 extends pb.Message<Message_TestInner4> {

	constructor(args?: pb.Properties<Message_TestInner4>){
		super();
		if(args){
		}
	}

}

/**
 * 这个消息的注释
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner5, MessageType.IActorResponse)
export class Message_TestInner5 extends pb.Message<Message_TestInner5> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner5>){
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
 * ResponseType Message_TestInner5
 */
@MessageDecorator(InnerMessage.Message_TestInner6, MessageType.IActorRequest)
@ResponseTypeDecorator(Message_TestInner5)
export class Message_TestInner6 extends pb.Message<Message_TestInner6> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner6>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}

/**
 * MessageType IActorLocationMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner7, MessageType.IActorLocationMessage)
export class Message_TestInner7 extends pb.Message<Message_TestInner7> {

	constructor(args?: pb.Properties<Message_TestInner7>){
		super();
		if(args){
		}
	}

}

/**
 * MessageType IActorLocationResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner8, MessageType.IActorLocationResponse)
export class Message_TestInner8 extends pb.Message<Message_TestInner8> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	@pb.Field.d(2, "int32", "optional")
	public Error: number
	@pb.Field.d(3, "string", "optional")
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner8>){
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
 * ResponseType Message_TestInner8
 */
@MessageDecorator(InnerMessage.Message_TestInner9, MessageType.IActorLocationRequest)
@ResponseTypeDecorator(Message_TestInner8)
export class Message_TestInner9 extends pb.Message<Message_TestInner9> {

	@pb.Field.d(1, "int32", "required")
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner9>){
		super();
		if(args){
			this.RpcId = args.RpcId
		}
	}

}