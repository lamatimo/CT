import pb from 'protobufjs'
import Long from 'long';
import { Message } from "../../../../../../Scripts/Core/Message/Message"
import { MessageDecorator } from "../../../../../../Scripts/Core/Network/MessageDecorator"
import { MessageType } from "../../../../../../Scripts/Core/Network/MessageType"
import { ResponseTypeDecorator } from "../../../Module/Message/ResponseTypeDecorator"
import { MessageParseHelper } from '../../../Module/Message/MessageParseHelper';
import { Vec3 } from '../../../Module/Math/vec3';

const r = new pb.Reader(new Uint8Array())
const w = new pb.Writer()

export class OuterMessage {
	public static readonly R2C_Login = 10002
	public static readonly C2R_Login = 10003
	public static readonly G2C_LoginGate = 10004
	public static readonly C2G_LoginGate = 10005
	public static readonly G2C_Ping = 10006
	public static readonly C2G_Ping = 10007
	public static readonly G2C_EnterMap = 10008
	public static readonly C2G_EnterMap = 10009
	public static readonly M2C_StartSceneChange = 10010
	public static readonly MoveInfo = 10011
	public static readonly UnitInfo_KVKV = 10012
	public static readonly UnitInfo = 10013
}

/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.R2C_Login, MessageType.IResponse)
export class R2C_Login extends Message {
	public opcode = OuterMessage.R2C_Login
	public Address: string
	public Key: number
	public GateId: number
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<R2C_Login>) {
		super()
		if(!args){
			return
		}
		if(args.Address){
			this.Address = args.Address
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
		if(this.Address){
			w.uint32(26).string(this.Address)
		}
		if(this.Key){
			w.uint32(32).int64(this.Key)
		}
		if(this.GateId){
			w.uint32(40).int64(this.GateId)
		}
		if(this.RpcId){
			w.uint32(48).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(56).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(66).string(this.Message)
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
					this.Address = r.string()
					break
				case 4:
					this.Key = (r.int64() as Long).toNumber()
					break
				case 5:
					this.GateId = (r.int64() as Long).toNumber()
					break
				case 6:
					this.RpcId = r.uint32()
					break
				case 7:
					this.Error = r.uint32()
					break
				case 8:
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
 * MessageType IRequest
 * ResponseType R2C_Login
 */
@ResponseTypeDecorator(R2C_Login)
@MessageDecorator(OuterMessage.C2R_Login, MessageType.IRequest)
export class C2R_Login extends Message {
	public opcode = OuterMessage.C2R_Login
	public Account: string
	public Password: string
	public RpcId: number
	constructor(args?: pb.Properties<C2R_Login>) {
		super()
		if(!args){
			return
		}
		if(args.Account){
			this.Account = args.Account
		}
		if(args.Password){
			this.Password = args.Password
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
		if(this.Password){
			w.uint32(34).string(this.Password)
		}
		if(this.RpcId){
			w.uint32(40).uint32(this.RpcId)
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
					this.Password = r.string()
					break
				case 5:
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
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.G2C_LoginGate, MessageType.IResponse)
export class G2C_LoginGate extends Message {
	public opcode = OuterMessage.G2C_LoginGate
	public PlayerId: number
	public Maps: string[]
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<G2C_LoginGate>) {
		super()
		if(!args){
			return
		}
		if(args.PlayerId){
			this.PlayerId = args.PlayerId
		}
		if(args.Maps){
			this.Maps = args.Maps
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
		if(this.PlayerId){
			w.uint32(24).int64(this.PlayerId)
		}
		if(this.Maps && this.Maps.length > 0){
			for (const v of this.Maps) {
				w.uint32(34).string(v)
			}
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
		this.Maps = []
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.PlayerId = (r.int64() as Long).toNumber()
					break
				case 4:
					this.Maps.push(r.string())
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
 * MessageType IRequest
 * ResponseType G2C_LoginGate
 */
@ResponseTypeDecorator(G2C_LoginGate)
@MessageDecorator(OuterMessage.C2G_LoginGate, MessageType.IRequest)
export class C2G_LoginGate extends Message {
	public opcode = OuterMessage.C2G_LoginGate
	public Key: number
	public GateId: number
	public RpcId: number
	constructor(args?: pb.Properties<C2G_LoginGate>) {
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
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.G2C_Ping, MessageType.IResponse)
export class G2C_Ping extends Message {
	public opcode = OuterMessage.G2C_Ping
	public Time: number
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<G2C_Ping>) {
		super()
		if(!args){
			return
		}
		if(args.Time){
			this.Time = args.Time
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
		if(this.Time){
			w.uint32(24).int64(this.Time)
		}
		if(this.RpcId){
			w.uint32(32).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(40).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(50).string(this.Message)
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
					this.Time = (r.int64() as Long).toNumber()
					break
				case 4:
					this.RpcId = r.uint32()
					break
				case 5:
					this.Error = r.uint32()
					break
				case 6:
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
 * MessageType IRequest
 * ResponseType G2C_Ping
 */
@ResponseTypeDecorator(G2C_Ping)
@MessageDecorator(OuterMessage.C2G_Ping, MessageType.IRequest)
export class C2G_Ping extends Message {
	public opcode = OuterMessage.C2G_Ping
	public RpcId: number
	constructor(args?: pb.Properties<C2G_Ping>) {
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
 * MessageType IResponse
 */
@MessageDecorator(OuterMessage.G2C_EnterMap, MessageType.IResponse)
export class G2C_EnterMap extends Message {
	public opcode = OuterMessage.G2C_EnterMap
	public MyId: number
	public RpcId: number
	public Error: number = 0
	public Message: string
	constructor(args?: pb.Properties<G2C_EnterMap>) {
		super()
		if(!args){
			return
		}
		if(args.MyId){
			this.MyId = args.MyId
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
		if(this.MyId){
			w.uint32(24).int64(this.MyId)
		}
		if(this.RpcId){
			w.uint32(32).uint32(this.RpcId)
		}
		if(this.Error){
			w.uint32(40).uint32(this.Error)
		}
		if(this.Message){
			w.uint32(50).string(this.Message)
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
					this.MyId = (r.int64() as Long).toNumber()
					break
				case 4:
					this.RpcId = r.uint32()
					break
				case 5:
					this.Error = r.uint32()
					break
				case 6:
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
 * MessageType IRequest
 * ResponseType G2C_EnterMap
 */
@ResponseTypeDecorator(G2C_EnterMap)
@MessageDecorator(OuterMessage.C2G_EnterMap, MessageType.IRequest)
export class C2G_EnterMap extends Message {
	public opcode = OuterMessage.C2G_EnterMap
	public MapName: string
	public RpcId: number
	constructor(args?: pb.Properties<C2G_EnterMap>) {
		super()
		if(!args){
			return
		}
		if(args.MapName){
			this.MapName = args.MapName
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
		if(this.MapName){
			w.uint32(26).string(this.MapName)
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
					this.MapName = r.string()
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
 * MessageType IActorMessage
 */
@MessageDecorator(OuterMessage.M2C_StartSceneChange, MessageType.IActorMessage)
export class M2C_StartSceneChange extends Message {
	public opcode = OuterMessage.M2C_StartSceneChange
	public SceneInstanceId: number
	public SceneName: string
	constructor(args?: pb.Properties<M2C_StartSceneChange>) {
		super()
		if(!args){
			return
		}
		if(args.SceneInstanceId){
			this.SceneInstanceId = args.SceneInstanceId
		}
		if(args.SceneName){
			this.SceneName = args.SceneName
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
		if(this.SceneInstanceId){
			w.uint32(24).int64(this.SceneInstanceId)
		}
		if(this.SceneName){
			w.uint32(34).string(this.SceneName)
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
					this.SceneInstanceId = (r.int64() as Long).toNumber()
					break
				case 4:
					this.SceneName = r.string()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 */
@MessageDecorator(OuterMessage.MoveInfo, MessageType.IMessage)
export class MoveInfo extends Message {
	public opcode = OuterMessage.MoveInfo
	public Points: Vec3[]
	public Rotation: Vec3
	public TurnSpeed: number
	constructor(args?: pb.Properties<MoveInfo>) {
		super()
		if(!args){
			return
		}
		if(args.Points){
			this.Points = args.Points
		}
		if(args.Rotation){
			this.Rotation = args.Rotation
		}
		if(args.TurnSpeed){
			this.TurnSpeed = args.TurnSpeed
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
		if(this.Points && this.Points.length > 0){
			for (const v of this.Points) {
				w.uint32(26).fork()
				MessageParseHelper.encodeVec3(w, v)
				w.ldelim()
			}
		}
		if(this.Rotation){
			w.uint32(34).fork()
			MessageParseHelper.encodeVec3(w, this.Rotation)
			w.ldelim()
		}
		if(this.TurnSpeed){
			w.uint32(40).int32(this.TurnSpeed)
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		this.Points = []
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.Points.push(MessageParseHelper.docodeVec3(r, r.uint32()))
					break
				case 4:
					this.Rotation = MessageParseHelper.docodeVec3(r, r.uint32())
					break
				case 5:
					this.TurnSpeed = r.int32()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 */
export class UnitInfo_KVKV extends Message {
	public key: number
	public value: number
	constructor(args?: pb.Properties<UnitInfo_KVKV>) {
		super()
		if(!args){
			return
		}
		if(args.key){
			this.key = args.key
		}
		if(args.value){
			this.value = args.value
		}
	}
	public encode(actorId?: number) {
		return w.finish()
	}
	public innerEncode() {
		if(this.key){
			w.uint32(24).int32(this.key)
		}
		if(this.value){
			w.uint32(32).int64(this.value)
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
					this.key = r.int32()
					break
				case 4:
					this.value = (r.int64() as Long).toNumber()
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
/**
 */
@MessageDecorator(OuterMessage.UnitInfo, MessageType.IMessage)
export class UnitInfo extends Message {
	public opcode = OuterMessage.UnitInfo
	public UnitId: number
	public ConfigId: number
	public Type: number
	public Position: Vec3
	public Forward: Vec3
	public KV: Map<number, number> = new Map
	public MoveInfo: MoveInfo
	constructor(args?: pb.Properties<UnitInfo>) {
		super()
		if(!args){
			return
		}
		if(args.UnitId){
			this.UnitId = args.UnitId
		}
		if(args.ConfigId){
			this.ConfigId = args.ConfigId
		}
		if(args.Type){
			this.Type = args.Type
		}
		if(args.Position){
			this.Position = args.Position
		}
		if(args.Forward){
			this.Forward = args.Forward
		}
		if(args.KV){
			this.KV = args.KV
		}
		if(args.MoveInfo){
			this.MoveInfo = args.MoveInfo
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
		if(this.UnitId){
			w.uint32(24).int64(this.UnitId)
		}
		if(this.ConfigId){
			w.uint32(32).int32(this.ConfigId)
		}
		if(this.Type){
			w.uint32(40).int32(this.Type)
		}
		if(this.Position){
			w.uint32(50).fork()
			MessageParseHelper.encodeVec3(w, this.Position)
			w.ldelim()
		}
		if(this.Forward){
			w.uint32(58).fork()
			MessageParseHelper.encodeVec3(w, this.Forward)
			w.ldelim()
		}
		for (const [k,v] of this.KV) {
			let obj = new UnitInfo_KVKV({key: k, value: v})
			w.uint32(66).fork()
			obj.innerEncode()
			w.ldelim()
		}
		if(this.MoveInfo){
			w.uint32(74).fork()
			this.MoveInfo.innerEncode()
			w.ldelim()
		}
	}

	public decode(bytes: Uint8Array, length?: number) {
		if(!length){
			r.pos = 0
			r.buf = bytes
			r.len = bytes.length
		}
		let end = length === undefined ? r.len : r.pos + length;
		this.KV.clear()
		while (r.pos < end) {
			const tag = r.uint32()
			switch (tag >>> 3) {
				case 3:
					this.UnitId = (r.int64() as Long).toNumber()
					break
				case 4:
					this.ConfigId = r.int32()
					break
				case 5:
					this.Type = r.int32()
					break
				case 6:
					this.Position = MessageParseHelper.docodeVec3(r, r.uint32())
					break
				case 7:
					this.Forward = MessageParseHelper.docodeVec3(r, r.uint32())
					break
				case 8:
					let msg_UnitInfo_KVKV = new UnitInfo_KVKV()
					msg_UnitInfo_KVKV.decode(bytes, r.uint32())
					this.KV.set(msg_UnitInfo_KVKV.key, msg_UnitInfo_KVKV.value)
					break
				case 9:
					let msg_MoveInfo = new MoveInfo()
					msg_MoveInfo.decode(bytes, r.uint32())
					this.MoveInfo = msg_MoveInfo
					break
				default:
					r.skipType(tag & 7)
					break
			}
		}
	}
}
