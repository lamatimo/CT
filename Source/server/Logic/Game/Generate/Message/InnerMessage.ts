import pb from 'protobufjs'
import Long from 'long';
import { MessageDecorator } from '../../../../../client/assets/Scripts/Core/Network/MessageDecorator';
import { MessageType } from '../../../../../client/assets/Scripts/Core/Network/MessageType';
import { Message } from '../../../../../client/assets/Scripts/Core/Message/Message';
import { ResponseTypeDecorator } from '../../../../../client/assets/Bundles/Code/Logic/Module/Message/ResponseTypeDecorator';

const r = new pb.Reader(new Uint8Array())
const w = new pb.Writer()

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
	public static readonly G2R_GetLoginKey = 20012
	public static readonly R2G_GetLoginKey = 20013
	public static readonly M2M_UnitTransferResponse = 20014
	public static readonly M2M_UnitTransferRequest = 20015
	public static readonly ObjectLockResponse = 20016
	public static readonly ObjectLockRequest = 20017
}

/**
 */
@MessageDecorator(InnerMessage.Message_TestInner666, MessageType.IMessage)
export class Message_TestInner666 extends Message {
	public opcode = InnerMessage.Message_TestInner666
	constructor(args?: pb.Properties<Message_TestInner666>) {
		super()
		if(!args){
			return
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * Message_TestInner1的注释
 * MessageType IMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner1, MessageType.IMessage)
export class Message_TestInner1 extends Message {
	public opcode = InnerMessage.Message_TestInner1
	constructor(args?: pb.Properties<Message_TestInner1>) {
		super()
		if(!args){
			return
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * Message_TestInner2的注释
 * MessageType IResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner2, MessageType.IResponse)
export class Message_TestInner2 extends Message {
	public opcode = InnerMessage.Message_TestInner2
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner2>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(32).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(42).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				case 4:
					this.Error = r.uint32()
					break
				case 5:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * Message_TestInner3的注释
 * MessageType IRequest
 * ResponseType Message_TestInner2
 */
@ResponseTypeDecorator(Message_TestInner2)
@MessageDecorator(InnerMessage.Message_TestInner3, MessageType.IRequest)
export class Message_TestInner3 extends Message {
	public opcode = InnerMessage.Message_TestInner3
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner3>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner4, MessageType.IActorMessage)
export class Message_TestInner4 extends Message {
	public opcode = InnerMessage.Message_TestInner4
	constructor(args?: pb.Properties<Message_TestInner4>) {
		super()
		if(!args){
			return
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * 这个消息的注释
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner5, MessageType.IActorResponse)
export class Message_TestInner5 extends Message {
	public opcode = InnerMessage.Message_TestInner5
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner5>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(32).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(42).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				case 4:
					this.Error = r.uint32()
					break
				case 5:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorRequest
 * ResponseType Message_TestInner5
 */
@ResponseTypeDecorator(Message_TestInner5)
@MessageDecorator(InnerMessage.Message_TestInner6, MessageType.IActorRequest)
export class Message_TestInner6 extends Message {
	public opcode = InnerMessage.Message_TestInner6
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner6>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorLocationMessage
 */
@MessageDecorator(InnerMessage.Message_TestInner7, MessageType.IActorLocationMessage)
export class Message_TestInner7 extends Message {
	public opcode = InnerMessage.Message_TestInner7
	constructor(args?: pb.Properties<Message_TestInner7>) {
		super()
		if(!args){
			return
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorLocationResponse
 */
@MessageDecorator(InnerMessage.Message_TestInner8, MessageType.IActorLocationResponse)
export class Message_TestInner8 extends Message {
	public opcode = InnerMessage.Message_TestInner8
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<Message_TestInner8>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(32).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(42).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				case 4:
					this.Error = r.uint32()
					break
				case 5:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorLocationRequest
 * ResponseType Message_TestInner8
 */
@ResponseTypeDecorator(Message_TestInner8)
@MessageDecorator(InnerMessage.Message_TestInner9, MessageType.IActorLocationRequest)
export class Message_TestInner9 extends Message {
	public opcode = InnerMessage.Message_TestInner9
	public RpcId: number
	constructor(args?: pb.Properties<Message_TestInner9>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.G2R_GetLoginKey, MessageType.IActorResponse)
export class G2R_GetLoginKey extends Message {
	public opcode = InnerMessage.G2R_GetLoginKey
	public Key: number
	public GateId: number
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<G2R_GetLoginKey>) {
		super()
		if(!args){
			return
		}
		if(args.Key){
			this.Key = args.Key
		}
		if(args.GateId){
			this.GateId = args.GateId
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.Key){
			w.uint32(24).int64(this.Key)
		}
		if(this.GateId){
			w.uint32(32).int64(this.GateId)
		}
		if(this.RpcId){
			w.uint32(40).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(48).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(58).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.Key = (r.int64() as Long).toNumber()
					break
				case 4:
					this.GateId = (r.int64() as Long).toNumber()
					break
				case 5:
					this.RpcId = r.uint32()
					break
				case 6:
					this.Error = r.uint32()
					break
				case 7:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorRequest
 * ResponseType G2R_GetLoginKey
 */
@ResponseTypeDecorator(G2R_GetLoginKey)
@MessageDecorator(InnerMessage.R2G_GetLoginKey, MessageType.IActorRequest)
export class R2G_GetLoginKey extends Message {
	public opcode = InnerMessage.R2G_GetLoginKey
	public Account: string
	public RpcId: number
	constructor(args?: pb.Properties<R2G_GetLoginKey>) {
		super()
		if(!args){
			return
		}
		if(args.Account){
			this.Account = args.Account
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.Account){
			w.uint32(26).string(this.Account)
		}
		if(this.RpcId){
			w.uint32(32).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.Account = r.string()
					break
				case 4:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.M2M_UnitTransferResponse, MessageType.IActorResponse)
export class M2M_UnitTransferResponse extends Message {
	public opcode = InnerMessage.M2M_UnitTransferResponse
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<M2M_UnitTransferResponse>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(32).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(42).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				case 4:
					this.Error = r.uint32()
					break
				case 5:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorRequest
 * ResponseType M2M_UnitTransferResponse
 */
@ResponseTypeDecorator(M2M_UnitTransferResponse)
@MessageDecorator(InnerMessage.M2M_UnitTransferRequest, MessageType.IActorRequest)
export class M2M_UnitTransferRequest extends Message {
	public opcode = InnerMessage.M2M_UnitTransferRequest
	public OldInstanceId: number
	public Unit: Uint8Array
	public Entitys: Uint8Array[]
	public RpcId: number
	constructor(args?: pb.Properties<M2M_UnitTransferRequest>) {
		super()
		if(!args){
			return
		}
		if(args.OldInstanceId){
			this.OldInstanceId = args.OldInstanceId
		}
		if(args.Unit){
			this.Unit = args.Unit
		}
		if(args.Entitys){
			this.Entitys = args.Entitys
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.OldInstanceId){
			w.uint32(24).int64(this.OldInstanceId)
		}
		if(this.Unit){
			w.uint32(34).bytes(this.Unit)
		}
		if(this.Entitys && this.Entitys.length > 0){
			for (const v of this.Entitys) {
				w.uint32(42).bytes(v)
			}
		}
		if(this.RpcId){
			w.uint32(48).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		this.Entitys = []
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.OldInstanceId = (r.int64() as Long).toNumber()
					break
				case 4:
					this.Unit = r.bytes()
					break
				case 5:
					this.Entitys.push(r.bytes())
					break
				case 6:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorResponse
 */
@MessageDecorator(InnerMessage.ObjectLockResponse, MessageType.IActorResponse)
export class ObjectLockResponse extends Message {
	public opcode = InnerMessage.ObjectLockResponse
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<ObjectLockResponse>) {
		super()
		if(!args){
			return
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
		if(args.Error){
			this.Error = args.Error
		}
		if(args.Message){
			this.Message = args.Message
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.RpcId){
			w.uint32(24).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(32).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(42).string(this.Message)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.RpcId = r.uint32()
					break
				case 4:
					this.Error = r.uint32()
					break
				case 5:
					this.Message = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IActorRequest
 * ResponseType ObjectLockResponse
 */
@ResponseTypeDecorator(ObjectLockResponse)
@MessageDecorator(InnerMessage.ObjectLockRequest, MessageType.IActorRequest)
export class ObjectLockRequest extends Message {
	public opcode = InnerMessage.ObjectLockRequest
	public Key: number
	public InstanceId: number
	public Time: number
	public RpcId: number
	constructor(args?: pb.Properties<ObjectLockRequest>) {
		super()
		if(!args){
			return
		}
		if(args.Key){
			this.Key = args.Key
		}
		if(args.InstanceId){
			this.InstanceId = args.InstanceId
		}
		if(args.Time){
			this.Time = args.Time
		}
		if(args.RpcId){
			this.RpcId = args.RpcId
		}
	}
	public encode(actorId?: number) {
		w.reset()
		w.uint32(8).uint32(this.opcode)
		if(actorId){
			w.uint32(16).uint64(actorId)
		}
		this.innerEncode()
		return w.finish()
	}
	public innerEncode() {
		if(this.Key){
			w.uint32(24).int64(this.Key)
		}
		if(this.InstanceId){
			w.uint32(32).int64(this.InstanceId)
		}
		if(this.Time){
			w.uint32(40).int32(this.Time)
		}
		if(this.RpcId){
			w.uint32(48).uint32(this.RpcId)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.Key = (r.int64() as Long).toNumber()
					break
				case 4:
					this.InstanceId = (r.int64() as Long).toNumber()
					break
				case 5:
					this.Time = r.int32()
					break
				case 6:
					this.RpcId = r.uint32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
