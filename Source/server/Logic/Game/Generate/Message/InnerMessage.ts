import { ResponseTypeDecorator } from '../../../../../client/assets/Bundles/Code/Logic/Module/Message/ResponseTypeDecorator';
import { MessageDecorator } from '../../../../../client/assets/Scripts/Core/Network/MessageDecorator';
import { MessageType } from '../../../../../client/assets/Scripts/Core/Network/MessageType';
import { Field, Message } from '../../../../../client/assets/Scripts/Core/Network/Protobuf';


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
export class Message_TestInner666 extends Message<Message_TestInner666> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner666
}

/**
 * Message_TestInner1的注释
 * MessageType IMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner1, MessageType.IMessage)
export class Message_TestInner1 extends Message<Message_TestInner1> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner1
}

/**
 * Message_TestInner2的注释
 * MessageType IResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner2, MessageType.IResponse)
export class Message_TestInner2 extends Message<Message_TestInner2> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner2
	@Field.d(2, "int32", "required")
	public RpcId: number
	@Field.d(3, "int32", "optional")
	public Error: number
	@Field.d(4, "string", "optional")
	public Message: string
}

/**
 * Message_TestInner3的注释
 * MessageType IRequest
 * ResponseType Message_TestInner2
 */
@MessageDecorator(InnerMessage.Message_TestInner3, MessageType.IRequest)
@ResponseTypeDecorator(Message_TestInner2)
export class Message_TestInner3 extends Message<Message_TestInner3> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner3
	@Field.d(2, "int32", "required")
	public RpcId: number
}

/**
 * MessageType IActorMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner4, MessageType.IActorMessage)
export class Message_TestInner4 extends Message<Message_TestInner4> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner4
}

/**
 * 这个消息的注释
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner5, MessageType.IActorResponse)
export class Message_TestInner5 extends Message<Message_TestInner5> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner5
	@Field.d(2, "int32", "required")
	public RpcId: number
	@Field.d(3, "int32", "optional")
	public Error: number
	@Field.d(4, "string", "optional")
	public Message: string
}

/**
 * MessageType IActorRequest
 * ResponseType Message_TestInner5
 */
@MessageDecorator(InnerMessage.Message_TestInner6, MessageType.IActorRequest)
@ResponseTypeDecorator(Message_TestInner5)
export class Message_TestInner6 extends Message<Message_TestInner6> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner6
	@Field.d(2, "int32", "required")
	public RpcId: number
}

/**
 * MessageType IActorLocationMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner7, MessageType.IActorLocationMessage)
export class Message_TestInner7 extends Message<Message_TestInner7> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner7
}

/**
 * MessageType IActorLocationResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner8, MessageType.IActorLocationResponse)
export class Message_TestInner8 extends Message<Message_TestInner8> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner8
	@Field.d(2, "int32", "required")
	public RpcId: number
	@Field.d(3, "int32", "optional")
	public Error: number
	@Field.d(4, "string", "optional")
	public Message: string
}

/**
 * MessageType IActorLocationRequest
 * ResponseType Message_TestInner8
 */
@MessageDecorator(InnerMessage.Message_TestInner9, MessageType.IActorLocationRequest)
@ResponseTypeDecorator(Message_TestInner8)
export class Message_TestInner9 extends Message<Message_TestInner9> {
	public messageType: MessageType
	@Field.d(1, "uint32", "required")
	public readonly opcode = InnerMessage.Message_TestInner9
	@Field.d(2, "int32", "required")
	public RpcId: number
}