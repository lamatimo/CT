/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "CT";

/** using */

/** ResponseType ObjectQueryResponse */
export interface ObjectQueryRequest {
  RpcId: number;
  Key: number;
  InstanceId: number;
}

/** ResponseType A2M_Reload */
export interface M2AReload {
  RpcId: number;
}

export interface A2MReload {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType G2G_LockResponse */
export interface G2GLockRequest {
  RpcId: number;
  Id: number;
  Address: string;
}

export interface G2GLockResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType G2G_LockReleaseResponse */
export interface G2GLockReleaseRequest {
  RpcId: number;
  Id: number;
  Address: string;
}

export interface G2GLockReleaseResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType ObjectAddResponse */
export interface ObjectAddRequest {
  RpcId: number;
  Key: number;
  InstanceId: number;
}

export interface ObjectAddResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType ObjectLockResponse */
export interface ObjectLockRequest {
  RpcId: number;
  Key: number;
  InstanceId: number;
  Time: number;
}

export interface ObjectLockResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType ObjectUnLockResponse */
export interface ObjectUnLockRequest {
  RpcId: number;
  Key: number;
  OldInstanceId: number;
  InstanceId: number;
}

export interface ObjectUnLockResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType ObjectRemoveResponse */
export interface ObjectRemoveRequest {
  RpcId: number;
  Key: number;
}

export interface ObjectRemoveResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType ObjectGetResponse */
export interface ObjectGetRequest {
  RpcId: number;
  Key: number;
}

export interface ObjectGetResponse {
  RpcId: number;
  Error: number;
  Message: string;
  InstanceId: number;
}

/** ResponseType G2R_GetLoginKey */
export interface R2GGetLoginKey {
  RpcId: number;
  Account: string;
}

export interface G2RGetLoginKey {
  RpcId: number;
  Error: number;
  Message: string;
  Key: number;
  GateId: number;
}

export interface G2MSessionDisconnect {
  RpcId: number;
}

export interface ObjectQueryResponse {
  RpcId: number;
  Error: number;
  Message: string;
  Entity: Uint8Array;
}

/** ResponseType M2M_UnitTransferResponse */
export interface M2MUnitTransferRequest {
  RpcId: number;
  OldInstanceId: number;
  Unit: Uint8Array;
  Entitys: Uint8Array[];
}

export interface M2MUnitTransferResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

function createBaseObjectQueryRequest(): ObjectQueryRequest {
  return { RpcId: 0, Key: 0, InstanceId: 0 };
}

export const ObjectQueryRequest = {
  encode(message: ObjectQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    if (message.InstanceId !== 0) {
      writer.uint32(24).int64(message.InstanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectQueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.InstanceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectQueryRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      InstanceId: isSet(object.InstanceId) ? Number(object.InstanceId) : 0,
    };
  },

  toJSON(message: ObjectQueryRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.InstanceId !== undefined && (obj.InstanceId = Math.round(message.InstanceId));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectQueryRequest>, I>>(base?: I): ObjectQueryRequest {
    return ObjectQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectQueryRequest>, I>>(object: I): ObjectQueryRequest {
    const message = createBaseObjectQueryRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    message.InstanceId = object.InstanceId ?? 0;
    return message;
  },
};

function createBaseM2AReload(): M2AReload {
  return { RpcId: 0 };
}

export const M2AReload = {
  encode(message: M2AReload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2AReload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2AReload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2AReload {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: M2AReload): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<M2AReload>, I>>(base?: I): M2AReload {
    return M2AReload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2AReload>, I>>(object: I): M2AReload {
    const message = createBaseM2AReload();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseA2MReload(): A2MReload {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const A2MReload = {
  encode(message: A2MReload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): A2MReload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseA2MReload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): A2MReload {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: A2MReload): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<A2MReload>, I>>(base?: I): A2MReload {
    return A2MReload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<A2MReload>, I>>(object: I): A2MReload {
    const message = createBaseA2MReload();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseG2GLockRequest(): G2GLockRequest {
  return { RpcId: 0, Id: 0, Address: "" };
}

export const G2GLockRequest = {
  encode(message: G2GLockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Id !== 0) {
      writer.uint32(16).int64(message.Id);
    }
    if (message.Address !== "") {
      writer.uint32(26).string(message.Address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2GLockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2GLockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Id = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2GLockRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Id: isSet(object.Id) ? Number(object.Id) : 0,
      Address: isSet(object.Address) ? String(object.Address) : "",
    };
  },

  toJSON(message: G2GLockRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Id !== undefined && (obj.Id = Math.round(message.Id));
    message.Address !== undefined && (obj.Address = message.Address);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2GLockRequest>, I>>(base?: I): G2GLockRequest {
    return G2GLockRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2GLockRequest>, I>>(object: I): G2GLockRequest {
    const message = createBaseG2GLockRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Id = object.Id ?? 0;
    message.Address = object.Address ?? "";
    return message;
  },
};

function createBaseG2GLockResponse(): G2GLockResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const G2GLockResponse = {
  encode(message: G2GLockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2GLockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2GLockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2GLockResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: G2GLockResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2GLockResponse>, I>>(base?: I): G2GLockResponse {
    return G2GLockResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2GLockResponse>, I>>(object: I): G2GLockResponse {
    const message = createBaseG2GLockResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseG2GLockReleaseRequest(): G2GLockReleaseRequest {
  return { RpcId: 0, Id: 0, Address: "" };
}

export const G2GLockReleaseRequest = {
  encode(message: G2GLockReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Id !== 0) {
      writer.uint32(16).int64(message.Id);
    }
    if (message.Address !== "") {
      writer.uint32(26).string(message.Address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2GLockReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2GLockReleaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Id = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2GLockReleaseRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Id: isSet(object.Id) ? Number(object.Id) : 0,
      Address: isSet(object.Address) ? String(object.Address) : "",
    };
  },

  toJSON(message: G2GLockReleaseRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Id !== undefined && (obj.Id = Math.round(message.Id));
    message.Address !== undefined && (obj.Address = message.Address);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2GLockReleaseRequest>, I>>(base?: I): G2GLockReleaseRequest {
    return G2GLockReleaseRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2GLockReleaseRequest>, I>>(object: I): G2GLockReleaseRequest {
    const message = createBaseG2GLockReleaseRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Id = object.Id ?? 0;
    message.Address = object.Address ?? "";
    return message;
  },
};

function createBaseG2GLockReleaseResponse(): G2GLockReleaseResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const G2GLockReleaseResponse = {
  encode(message: G2GLockReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2GLockReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2GLockReleaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2GLockReleaseResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: G2GLockReleaseResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2GLockReleaseResponse>, I>>(base?: I): G2GLockReleaseResponse {
    return G2GLockReleaseResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2GLockReleaseResponse>, I>>(object: I): G2GLockReleaseResponse {
    const message = createBaseG2GLockReleaseResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseObjectAddRequest(): ObjectAddRequest {
  return { RpcId: 0, Key: 0, InstanceId: 0 };
}

export const ObjectAddRequest = {
  encode(message: ObjectAddRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    if (message.InstanceId !== 0) {
      writer.uint32(24).int64(message.InstanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectAddRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectAddRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.InstanceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectAddRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      InstanceId: isSet(object.InstanceId) ? Number(object.InstanceId) : 0,
    };
  },

  toJSON(message: ObjectAddRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.InstanceId !== undefined && (obj.InstanceId = Math.round(message.InstanceId));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectAddRequest>, I>>(base?: I): ObjectAddRequest {
    return ObjectAddRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectAddRequest>, I>>(object: I): ObjectAddRequest {
    const message = createBaseObjectAddRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    message.InstanceId = object.InstanceId ?? 0;
    return message;
  },
};

function createBaseObjectAddResponse(): ObjectAddResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const ObjectAddResponse = {
  encode(message: ObjectAddResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectAddResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectAddResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectAddResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: ObjectAddResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectAddResponse>, I>>(base?: I): ObjectAddResponse {
    return ObjectAddResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectAddResponse>, I>>(object: I): ObjectAddResponse {
    const message = createBaseObjectAddResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseObjectLockRequest(): ObjectLockRequest {
  return { RpcId: 0, Key: 0, InstanceId: 0, Time: 0 };
}

export const ObjectLockRequest = {
  encode(message: ObjectLockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    if (message.InstanceId !== 0) {
      writer.uint32(24).int64(message.InstanceId);
    }
    if (message.Time !== 0) {
      writer.uint32(32).int32(message.Time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectLockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectLockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.InstanceId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.Time = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectLockRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      InstanceId: isSet(object.InstanceId) ? Number(object.InstanceId) : 0,
      Time: isSet(object.Time) ? Number(object.Time) : 0,
    };
  },

  toJSON(message: ObjectLockRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.InstanceId !== undefined && (obj.InstanceId = Math.round(message.InstanceId));
    message.Time !== undefined && (obj.Time = Math.round(message.Time));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectLockRequest>, I>>(base?: I): ObjectLockRequest {
    return ObjectLockRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectLockRequest>, I>>(object: I): ObjectLockRequest {
    const message = createBaseObjectLockRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    message.InstanceId = object.InstanceId ?? 0;
    message.Time = object.Time ?? 0;
    return message;
  },
};

function createBaseObjectLockResponse(): ObjectLockResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const ObjectLockResponse = {
  encode(message: ObjectLockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectLockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectLockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectLockResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: ObjectLockResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectLockResponse>, I>>(base?: I): ObjectLockResponse {
    return ObjectLockResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectLockResponse>, I>>(object: I): ObjectLockResponse {
    const message = createBaseObjectLockResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseObjectUnLockRequest(): ObjectUnLockRequest {
  return { RpcId: 0, Key: 0, OldInstanceId: 0, InstanceId: 0 };
}

export const ObjectUnLockRequest = {
  encode(message: ObjectUnLockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    if (message.OldInstanceId !== 0) {
      writer.uint32(24).int64(message.OldInstanceId);
    }
    if (message.InstanceId !== 0) {
      writer.uint32(32).int64(message.InstanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectUnLockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectUnLockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.OldInstanceId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.InstanceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectUnLockRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      OldInstanceId: isSet(object.OldInstanceId) ? Number(object.OldInstanceId) : 0,
      InstanceId: isSet(object.InstanceId) ? Number(object.InstanceId) : 0,
    };
  },

  toJSON(message: ObjectUnLockRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.OldInstanceId !== undefined && (obj.OldInstanceId = Math.round(message.OldInstanceId));
    message.InstanceId !== undefined && (obj.InstanceId = Math.round(message.InstanceId));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectUnLockRequest>, I>>(base?: I): ObjectUnLockRequest {
    return ObjectUnLockRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectUnLockRequest>, I>>(object: I): ObjectUnLockRequest {
    const message = createBaseObjectUnLockRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    message.OldInstanceId = object.OldInstanceId ?? 0;
    message.InstanceId = object.InstanceId ?? 0;
    return message;
  },
};

function createBaseObjectUnLockResponse(): ObjectUnLockResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const ObjectUnLockResponse = {
  encode(message: ObjectUnLockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectUnLockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectUnLockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectUnLockResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: ObjectUnLockResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectUnLockResponse>, I>>(base?: I): ObjectUnLockResponse {
    return ObjectUnLockResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectUnLockResponse>, I>>(object: I): ObjectUnLockResponse {
    const message = createBaseObjectUnLockResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseObjectRemoveRequest(): ObjectRemoveRequest {
  return { RpcId: 0, Key: 0 };
}

export const ObjectRemoveRequest = {
  encode(message: ObjectRemoveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectRemoveRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectRemoveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectRemoveRequest {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0, Key: isSet(object.Key) ? Number(object.Key) : 0 };
  },

  toJSON(message: ObjectRemoveRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectRemoveRequest>, I>>(base?: I): ObjectRemoveRequest {
    return ObjectRemoveRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectRemoveRequest>, I>>(object: I): ObjectRemoveRequest {
    const message = createBaseObjectRemoveRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    return message;
  },
};

function createBaseObjectRemoveResponse(): ObjectRemoveResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const ObjectRemoveResponse = {
  encode(message: ObjectRemoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectRemoveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectRemoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectRemoveResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: ObjectRemoveResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectRemoveResponse>, I>>(base?: I): ObjectRemoveResponse {
    return ObjectRemoveResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectRemoveResponse>, I>>(object: I): ObjectRemoveResponse {
    const message = createBaseObjectRemoveResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseObjectGetRequest(): ObjectGetRequest {
  return { RpcId: 0, Key: 0 };
}

export const ObjectGetRequest = {
  encode(message: ObjectGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectGetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectGetRequest {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0, Key: isSet(object.Key) ? Number(object.Key) : 0 };
  },

  toJSON(message: ObjectGetRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectGetRequest>, I>>(base?: I): ObjectGetRequest {
    return ObjectGetRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectGetRequest>, I>>(object: I): ObjectGetRequest {
    const message = createBaseObjectGetRequest();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    return message;
  },
};

function createBaseObjectGetResponse(): ObjectGetResponse {
  return { RpcId: 0, Error: 0, Message: "", InstanceId: 0 };
}

export const ObjectGetResponse = {
  encode(message: ObjectGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.InstanceId !== 0) {
      writer.uint32(32).int64(message.InstanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectGetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        case 4:
          message.InstanceId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectGetResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      InstanceId: isSet(object.InstanceId) ? Number(object.InstanceId) : 0,
    };
  },

  toJSON(message: ObjectGetResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.InstanceId !== undefined && (obj.InstanceId = Math.round(message.InstanceId));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectGetResponse>, I>>(base?: I): ObjectGetResponse {
    return ObjectGetResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectGetResponse>, I>>(object: I): ObjectGetResponse {
    const message = createBaseObjectGetResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.InstanceId = object.InstanceId ?? 0;
    return message;
  },
};

function createBaseR2GGetLoginKey(): R2GGetLoginKey {
  return { RpcId: 0, Account: "" };
}

export const R2GGetLoginKey = {
  encode(message: R2GGetLoginKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Account !== "") {
      writer.uint32(18).string(message.Account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): R2GGetLoginKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseR2GGetLoginKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): R2GGetLoginKey {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Account: isSet(object.Account) ? String(object.Account) : "",
    };
  },

  toJSON(message: R2GGetLoginKey): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Account !== undefined && (obj.Account = message.Account);
    return obj;
  },

  create<I extends Exact<DeepPartial<R2GGetLoginKey>, I>>(base?: I): R2GGetLoginKey {
    return R2GGetLoginKey.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<R2GGetLoginKey>, I>>(object: I): R2GGetLoginKey {
    const message = createBaseR2GGetLoginKey();
    message.RpcId = object.RpcId ?? 0;
    message.Account = object.Account ?? "";
    return message;
  },
};

function createBaseG2RGetLoginKey(): G2RGetLoginKey {
  return { RpcId: 0, Error: 0, Message: "", Key: 0, GateId: 0 };
}

export const G2RGetLoginKey = {
  encode(message: G2RGetLoginKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.Key !== 0) {
      writer.uint32(32).int64(message.Key);
    }
    if (message.GateId !== 0) {
      writer.uint32(40).int64(message.GateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2RGetLoginKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2RGetLoginKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        case 4:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.GateId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2RGetLoginKey {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      GateId: isSet(object.GateId) ? Number(object.GateId) : 0,
    };
  },

  toJSON(message: G2RGetLoginKey): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.GateId !== undefined && (obj.GateId = Math.round(message.GateId));
    return obj;
  },

  create<I extends Exact<DeepPartial<G2RGetLoginKey>, I>>(base?: I): G2RGetLoginKey {
    return G2RGetLoginKey.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2RGetLoginKey>, I>>(object: I): G2RGetLoginKey {
    const message = createBaseG2RGetLoginKey();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.Key = object.Key ?? 0;
    message.GateId = object.GateId ?? 0;
    return message;
  },
};

function createBaseG2MSessionDisconnect(): G2MSessionDisconnect {
  return { RpcId: 0 };
}

export const G2MSessionDisconnect = {
  encode(message: G2MSessionDisconnect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2MSessionDisconnect {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2MSessionDisconnect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2MSessionDisconnect {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: G2MSessionDisconnect): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<G2MSessionDisconnect>, I>>(base?: I): G2MSessionDisconnect {
    return G2MSessionDisconnect.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2MSessionDisconnect>, I>>(object: I): G2MSessionDisconnect {
    const message = createBaseG2MSessionDisconnect();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseObjectQueryResponse(): ObjectQueryResponse {
  return { RpcId: 0, Error: 0, Message: "", Entity: new Uint8Array() };
}

export const ObjectQueryResponse = {
  encode(message: ObjectQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.Entity.length !== 0) {
      writer.uint32(34).bytes(message.Entity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectQueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        case 4:
          message.Entity = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectQueryResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      Entity: isSet(object.Entity) ? bytesFromBase64(object.Entity) : new Uint8Array(),
    };
  },

  toJSON(message: ObjectQueryResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.Entity !== undefined &&
      (obj.Entity = base64FromBytes(message.Entity !== undefined ? message.Entity : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<ObjectQueryResponse>, I>>(base?: I): ObjectQueryResponse {
    return ObjectQueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ObjectQueryResponse>, I>>(object: I): ObjectQueryResponse {
    const message = createBaseObjectQueryResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.Entity = object.Entity ?? new Uint8Array();
    return message;
  },
};

function createBaseM2MUnitTransferRequest(): M2MUnitTransferRequest {
  return { RpcId: 0, OldInstanceId: 0, Unit: new Uint8Array(), Entitys: [] };
}

export const M2MUnitTransferRequest = {
  encode(message: M2MUnitTransferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.OldInstanceId !== 0) {
      writer.uint32(16).int64(message.OldInstanceId);
    }
    if (message.Unit.length !== 0) {
      writer.uint32(26).bytes(message.Unit);
    }
    for (const v of message.Entitys) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2MUnitTransferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2MUnitTransferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.OldInstanceId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.Unit = reader.bytes();
          break;
        case 4:
          message.Entitys.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2MUnitTransferRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      OldInstanceId: isSet(object.OldInstanceId) ? Number(object.OldInstanceId) : 0,
      Unit: isSet(object.Unit) ? bytesFromBase64(object.Unit) : new Uint8Array(),
      Entitys: Array.isArray(object?.Entitys) ? object.Entitys.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: M2MUnitTransferRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.OldInstanceId !== undefined && (obj.OldInstanceId = Math.round(message.OldInstanceId));
    message.Unit !== undefined &&
      (obj.Unit = base64FromBytes(message.Unit !== undefined ? message.Unit : new Uint8Array()));
    if (message.Entitys) {
      obj.Entitys = message.Entitys.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.Entitys = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<M2MUnitTransferRequest>, I>>(base?: I): M2MUnitTransferRequest {
    return M2MUnitTransferRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2MUnitTransferRequest>, I>>(object: I): M2MUnitTransferRequest {
    const message = createBaseM2MUnitTransferRequest();
    message.RpcId = object.RpcId ?? 0;
    message.OldInstanceId = object.OldInstanceId ?? 0;
    message.Unit = object.Unit ?? new Uint8Array();
    message.Entitys = object.Entitys?.map((e) => e) || [];
    return message;
  },
};

function createBaseM2MUnitTransferResponse(): M2MUnitTransferResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const M2MUnitTransferResponse = {
  encode(message: M2MUnitTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2MUnitTransferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2MUnitTransferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Error = reader.int32();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2MUnitTransferResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: M2MUnitTransferResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2MUnitTransferResponse>, I>>(base?: I): M2MUnitTransferResponse {
    return M2MUnitTransferResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2MUnitTransferResponse>, I>>(object: I): M2MUnitTransferResponse {
    const message = createBaseM2MUnitTransferResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
