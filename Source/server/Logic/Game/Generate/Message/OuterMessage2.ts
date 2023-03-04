/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "CT";

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Vector4 {
  x: number;
  y: number;
  z: number;
  r: number;
}

export interface HttpGetRouterResponse {
  Realms: string[];
  Routers: string[];
}

export interface RouterSync {
  ConnectId: number;
  Address: string;
}

/** ResponseType M2C_TestResponse */
export interface C2MTestRequest {
  RpcId: number;
  request: string;
}

export interface M2CTestResponse {
  RpcId: number;
  Error: number;
  Message: string;
  response: string;
}

/** ResponseType Actor_TransferResponse */
export interface ActorTransferRequest {
  RpcId: number;
  MapIndex: number;
}

export interface ActorTransferResponse {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType G2C_EnterMap */
export interface C2GEnterMap {
  RpcId: number;
}

export interface G2CEnterMap {
  RpcId: number;
  Error: number;
  Message: string;
  /** 自己unitId */
  MyId: number;
}

export interface MoveInfo {
  Points: Vector3[];
  Rotation: Vector4 | undefined;
  TurnSpeed: number;
}

export interface UnitInfo {
  UnitId: number;
  ConfigId: number;
  Type: number;
  Position: Vector3 | undefined;
  Forward: Vector3 | undefined;
  KV: { [key: number]: number };
  MoveInfo: MoveInfo | undefined;
}

export interface UnitInfo_KVEntry {
  key: number;
  value: number;
}

export interface M2CCreateUnits {
  Units: UnitInfo[];
}

export interface M2CCreateMyUnit {
  Unit: UnitInfo | undefined;
}

export interface M2CStartSceneChange {
  SceneInstanceId: number;
  SceneName: string;
}

export interface M2CRemoveUnits {
  Units: number[];
}

export interface C2MPathfindingResult {
  RpcId: number;
  Position: Vector3 | undefined;
}

export interface C2MStop {
  RpcId: number;
}

export interface M2CPathfindingResult {
  Id: number;
  Position: Vector3 | undefined;
  Points: Vector3[];
}

export interface M2CStop {
  Error: number;
  Id: number;
  Position: Vector3 | undefined;
  Rotation: Vector4 | undefined;
}

/** ResponseType G2C_Ping */
export interface C2GPing {
  RpcId: number;
}

export interface G2CPing {
  RpcId: number;
  Error: number;
  Message: string;
  Time: number;
}

export interface G2CTest {
}

/** ResponseType M2C_Reload */
export interface C2MReload {
  RpcId: number;
  Account: string;
  Password: string;
}

export interface M2CReload {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType R2C_Login */
export interface C2RLogin {
  RpcId: number;
  /** 帐号 */
  Account: string;
  /** 密码 */
  Password: string;
}

export interface R2CLogin {
  RpcId: number;
  Error: number;
  Message: string;
  Address: string;
  Key: number;
  GateId: number;
}

/** ResponseType G2C_LoginGate */
export interface C2GLoginGate {
  RpcId: number;
  /** 帐号 */
  Key: number;
  GateId: number;
}

export interface G2CLoginGate {
  RpcId: number;
  Error: number;
  Message: string;
  PlayerId: number;
}

export interface G2CTestHotfixMessage {
  Info: string;
}

/** ResponseType M2C_TestRobotCase */
export interface C2MTestRobotCase {
  RpcId: number;
  N: number;
}

export interface M2CTestRobotCase {
  RpcId: number;
  Error: number;
  Message: string;
  N: number;
}

/** ResponseType M2C_TransferMap */
export interface C2MTransferMap {
  RpcId: number;
}

export interface M2CTransferMap {
  RpcId: number;
  Error: number;
  Message: string;
}

/** ResponseType G2C_Benchmark */
export interface C2GBenchmark {
  RpcId: number;
}

export interface G2CBenchmark {
  RpcId: number;
  Error: number;
  Message: string;
}

function createBaseVector3(): Vector3 {
  return { x: 0, y: 0, z: 0 };
}

export const Vector3 = {
  encode(message: Vector3, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vector3 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVector3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        case 3:
          message.z = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vector3 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
    };
  },

  toJSON(message: Vector3): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },

  create<I extends Exact<DeepPartial<Vector3>, I>>(base?: I): Vector3 {
    return Vector3.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Vector3>, I>>(object: I): Vector3 {
    const message = createBaseVector3();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    return message;
  },
};

function createBaseVector4(): Vector4 {
  return { x: 0, y: 0, z: 0, r: 0 };
}

export const Vector4 = {
  encode(message: Vector4, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    if (message.r !== 0) {
      writer.uint32(37).float(message.r);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vector4 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVector4();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        case 3:
          message.z = reader.float();
          break;
        case 4:
          message.r = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vector4 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
      r: isSet(object.r) ? Number(object.r) : 0,
    };
  },

  toJSON(message: Vector4): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    message.r !== undefined && (obj.r = message.r);
    return obj;
  },

  create<I extends Exact<DeepPartial<Vector4>, I>>(base?: I): Vector4 {
    return Vector4.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Vector4>, I>>(object: I): Vector4 {
    const message = createBaseVector4();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    message.r = object.r ?? 0;
    return message;
  },
};

function createBaseHttpGetRouterResponse(): HttpGetRouterResponse {
  return { Realms: [], Routers: [] };
}

export const HttpGetRouterResponse = {
  encode(message: HttpGetRouterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Realms) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.Routers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HttpGetRouterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHttpGetRouterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Realms.push(reader.string());
          break;
        case 2:
          message.Routers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HttpGetRouterResponse {
    return {
      Realms: Array.isArray(object?.Realms) ? object.Realms.map((e: any) => String(e)) : [],
      Routers: Array.isArray(object?.Routers) ? object.Routers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: HttpGetRouterResponse): unknown {
    const obj: any = {};
    if (message.Realms) {
      obj.Realms = message.Realms.map((e) => e);
    } else {
      obj.Realms = [];
    }
    if (message.Routers) {
      obj.Routers = message.Routers.map((e) => e);
    } else {
      obj.Routers = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HttpGetRouterResponse>, I>>(base?: I): HttpGetRouterResponse {
    return HttpGetRouterResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HttpGetRouterResponse>, I>>(object: I): HttpGetRouterResponse {
    const message = createBaseHttpGetRouterResponse();
    message.Realms = object.Realms?.map((e) => e) || [];
    message.Routers = object.Routers?.map((e) => e) || [];
    return message;
  },
};

function createBaseRouterSync(): RouterSync {
  return { ConnectId: 0, Address: "" };
}

export const RouterSync = {
  encode(message: RouterSync, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ConnectId !== 0) {
      writer.uint32(8).uint32(message.ConnectId);
    }
    if (message.Address !== "") {
      writer.uint32(18).string(message.Address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RouterSync {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouterSync();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ConnectId = reader.uint32();
          break;
        case 2:
          message.Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RouterSync {
    return {
      ConnectId: isSet(object.ConnectId) ? Number(object.ConnectId) : 0,
      Address: isSet(object.Address) ? String(object.Address) : "",
    };
  },

  toJSON(message: RouterSync): unknown {
    const obj: any = {};
    message.ConnectId !== undefined && (obj.ConnectId = Math.round(message.ConnectId));
    message.Address !== undefined && (obj.Address = message.Address);
    return obj;
  },

  create<I extends Exact<DeepPartial<RouterSync>, I>>(base?: I): RouterSync {
    return RouterSync.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RouterSync>, I>>(object: I): RouterSync {
    const message = createBaseRouterSync();
    message.ConnectId = object.ConnectId ?? 0;
    message.Address = object.Address ?? "";
    return message;
  },
};

function createBaseC2MTestRequest(): C2MTestRequest {
  return { RpcId: 0, request: "" };
}

export const C2MTestRequest = {
  encode(message: C2MTestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.request !== "") {
      writer.uint32(18).string(message.request);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MTestRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);

    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MTestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.request = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2MTestRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      request: isSet(object.request) ? String(object.request) : "",
    };
  },

  toJSON(message: C2MTestRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.request !== undefined && (obj.request = message.request);
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MTestRequest>, I>>(base?: I): C2MTestRequest {
    return C2MTestRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MTestRequest>, I>>(object: I): C2MTestRequest {
    const message = createBaseC2MTestRequest();
    message.RpcId = object.RpcId ?? 0;
    message.request = object.request ?? "";
    return message;
  },
};

function createBaseM2CTestResponse(): M2CTestResponse {
  return { RpcId: 0, Error: 0, Message: "", response: "" };
}

export const M2CTestResponse = {
  encode(message: M2CTestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.response !== "") {
      writer.uint32(34).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CTestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CTestResponse();
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
          message.response = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CTestResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      response: isSet(object.response) ? String(object.response) : "",
    };
  },

  toJSON(message: M2CTestResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.response !== undefined && (obj.response = message.response);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CTestResponse>, I>>(base?: I): M2CTestResponse {
    return M2CTestResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CTestResponse>, I>>(object: I): M2CTestResponse {
    const message = createBaseM2CTestResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.response = object.response ?? "";
    return message;
  },
};

function createBaseActorTransferRequest(): ActorTransferRequest {
  return { RpcId: 0, MapIndex: 0 };
}

export const ActorTransferRequest = {
  encode(message: ActorTransferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.MapIndex !== 0) {
      writer.uint32(16).int32(message.MapIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActorTransferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActorTransferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.MapIndex = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActorTransferRequest {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      MapIndex: isSet(object.MapIndex) ? Number(object.MapIndex) : 0,
    };
  },

  toJSON(message: ActorTransferRequest): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.MapIndex !== undefined && (obj.MapIndex = Math.round(message.MapIndex));
    return obj;
  },

  create<I extends Exact<DeepPartial<ActorTransferRequest>, I>>(base?: I): ActorTransferRequest {
    return ActorTransferRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ActorTransferRequest>, I>>(object: I): ActorTransferRequest {
    const message = createBaseActorTransferRequest();
    message.RpcId = object.RpcId ?? 0;
    message.MapIndex = object.MapIndex ?? 0;
    return message;
  },
};

function createBaseActorTransferResponse(): ActorTransferResponse {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const ActorTransferResponse = {
  encode(message: ActorTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ActorTransferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActorTransferResponse();
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

  fromJSON(object: any): ActorTransferResponse {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: ActorTransferResponse): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ActorTransferResponse>, I>>(base?: I): ActorTransferResponse {
    return ActorTransferResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ActorTransferResponse>, I>>(object: I): ActorTransferResponse {
    const message = createBaseActorTransferResponse();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseC2GEnterMap(): C2GEnterMap {
  return { RpcId: 0 };
}

export const C2GEnterMap = {
  encode(message: C2GEnterMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2GEnterMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2GEnterMap();
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

  fromJSON(object: any): C2GEnterMap {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: C2GEnterMap): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2GEnterMap>, I>>(base?: I): C2GEnterMap {
    return C2GEnterMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2GEnterMap>, I>>(object: I): C2GEnterMap {
    const message = createBaseC2GEnterMap();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseG2CEnterMap(): G2CEnterMap {
  return { RpcId: 0, Error: 0, Message: "", MyId: 0 };
}

export const G2CEnterMap = {
  encode(message: G2CEnterMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.MyId !== 0) {
      writer.uint32(32).int64(message.MyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CEnterMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CEnterMap();
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
          message.MyId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2CEnterMap {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      MyId: isSet(object.MyId) ? Number(object.MyId) : 0,
    };
  },

  toJSON(message: G2CEnterMap): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.MyId !== undefined && (obj.MyId = Math.round(message.MyId));
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CEnterMap>, I>>(base?: I): G2CEnterMap {
    return G2CEnterMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CEnterMap>, I>>(object: I): G2CEnterMap {
    const message = createBaseG2CEnterMap();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.MyId = object.MyId ?? 0;
    return message;
  },
};

function createBaseMoveInfo(): MoveInfo {
  return { Points: [], Rotation: undefined, TurnSpeed: 0 };
}

export const MoveInfo = {
  encode(message: MoveInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Points) {
      Vector3.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.Rotation !== undefined) {
      Vector4.encode(message.Rotation, writer.uint32(18).fork()).ldelim();
    }
    if (message.TurnSpeed !== 0) {
      writer.uint32(24).int32(message.TurnSpeed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MoveInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoveInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Points.push(Vector3.decode(reader, reader.uint32()));
          break;
        case 2:
          message.Rotation = Vector4.decode(reader, reader.uint32());
          break;
        case 3:
          message.TurnSpeed = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MoveInfo {
    return {
      Points: Array.isArray(object?.Points) ? object.Points.map((e: any) => Vector3.fromJSON(e)) : [],
      Rotation: isSet(object.Rotation) ? Vector4.fromJSON(object.Rotation) : undefined,
      TurnSpeed: isSet(object.TurnSpeed) ? Number(object.TurnSpeed) : 0,
    };
  },

  toJSON(message: MoveInfo): unknown {
    const obj: any = {};
    if (message.Points) {
      obj.Points = message.Points.map((e) => e ? Vector3.toJSON(e) : undefined);
    } else {
      obj.Points = [];
    }
    message.Rotation !== undefined && (obj.Rotation = message.Rotation ? Vector4.toJSON(message.Rotation) : undefined);
    message.TurnSpeed !== undefined && (obj.TurnSpeed = Math.round(message.TurnSpeed));
    return obj;
  },

  create<I extends Exact<DeepPartial<MoveInfo>, I>>(base?: I): MoveInfo {
    return MoveInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MoveInfo>, I>>(object: I): MoveInfo {
    const message = createBaseMoveInfo();
    message.Points = object.Points?.map((e) => Vector3.fromPartial(e)) || [];
    message.Rotation = (object.Rotation !== undefined && object.Rotation !== null)
      ? Vector4.fromPartial(object.Rotation)
      : undefined;
    message.TurnSpeed = object.TurnSpeed ?? 0;
    return message;
  },
};

function createBaseUnitInfo(): UnitInfo {
  return { UnitId: 0, ConfigId: 0, Type: 0, Position: undefined, Forward: undefined, KV: {}, MoveInfo: undefined };
}

export const UnitInfo = {
  encode(message: UnitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UnitId !== 0) {
      writer.uint32(8).int64(message.UnitId);
    }
    if (message.ConfigId !== 0) {
      writer.uint32(16).int32(message.ConfigId);
    }
    if (message.Type !== 0) {
      writer.uint32(24).int32(message.Type);
    }
    if (message.Position !== undefined) {
      Vector3.encode(message.Position, writer.uint32(34).fork()).ldelim();
    }
    if (message.Forward !== undefined) {
      Vector3.encode(message.Forward, writer.uint32(42).fork()).ldelim();
    }
    Object.entries(message.KV).forEach(([key, value]) => {
      UnitInfo_KVEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    if (message.MoveInfo !== undefined) {
      MoveInfo.encode(message.MoveInfo, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnitInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UnitId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.ConfigId = reader.int32();
          break;
        case 3:
          message.Type = reader.int32();
          break;
        case 4:
          message.Position = Vector3.decode(reader, reader.uint32());
          break;
        case 5:
          message.Forward = Vector3.decode(reader, reader.uint32());
          break;
        case 6:
          const entry6 = UnitInfo_KVEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.KV[entry6.key] = entry6.value;
          }
          break;
        case 7:
          message.MoveInfo = MoveInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnitInfo {
    return {
      UnitId: isSet(object.UnitId) ? Number(object.UnitId) : 0,
      ConfigId: isSet(object.ConfigId) ? Number(object.ConfigId) : 0,
      Type: isSet(object.Type) ? Number(object.Type) : 0,
      Position: isSet(object.Position) ? Vector3.fromJSON(object.Position) : undefined,
      Forward: isSet(object.Forward) ? Vector3.fromJSON(object.Forward) : undefined,
      KV: isObject(object.KV)
        ? Object.entries(object.KV).reduce<{ [key: number]: number }>((acc, [key, value]) => {
          acc[Number(key)] = Number(value);
          return acc;
        }, {})
        : {},
      MoveInfo: isSet(object.MoveInfo) ? MoveInfo.fromJSON(object.MoveInfo) : undefined,
    };
  },

  toJSON(message: UnitInfo): unknown {
    const obj: any = {};
    message.UnitId !== undefined && (obj.UnitId = Math.round(message.UnitId));
    message.ConfigId !== undefined && (obj.ConfigId = Math.round(message.ConfigId));
    message.Type !== undefined && (obj.Type = Math.round(message.Type));
    message.Position !== undefined && (obj.Position = message.Position ? Vector3.toJSON(message.Position) : undefined);
    message.Forward !== undefined && (obj.Forward = message.Forward ? Vector3.toJSON(message.Forward) : undefined);
    obj.KV = {};
    if (message.KV) {
      Object.entries(message.KV).forEach(([k, v]) => {
        obj.KV[k] = Math.round(v);
      });
    }
    message.MoveInfo !== undefined && (obj.MoveInfo = message.MoveInfo ? MoveInfo.toJSON(message.MoveInfo) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UnitInfo>, I>>(base?: I): UnitInfo {
    return UnitInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UnitInfo>, I>>(object: I): UnitInfo {
    const message = createBaseUnitInfo();
    message.UnitId = object.UnitId ?? 0;
    message.ConfigId = object.ConfigId ?? 0;
    message.Type = object.Type ?? 0;
    message.Position = (object.Position !== undefined && object.Position !== null)
      ? Vector3.fromPartial(object.Position)
      : undefined;
    message.Forward = (object.Forward !== undefined && object.Forward !== null)
      ? Vector3.fromPartial(object.Forward)
      : undefined;
    message.KV = Object.entries(object.KV ?? {}).reduce<{ [key: number]: number }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = Number(value);
      }
      return acc;
    }, {});
    message.MoveInfo = (object.MoveInfo !== undefined && object.MoveInfo !== null)
      ? MoveInfo.fromPartial(object.MoveInfo)
      : undefined;
    return message;
  },
};

function createBaseUnitInfo_KVEntry(): UnitInfo_KVEntry {
  return { key: 0, value: 0 };
}

export const UnitInfo_KVEntry = {
  encode(message: UnitInfo_KVEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnitInfo_KVEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnitInfo_KVEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnitInfo_KVEntry {
    return { key: isSet(object.key) ? Number(object.key) : 0, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: UnitInfo_KVEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  create<I extends Exact<DeepPartial<UnitInfo_KVEntry>, I>>(base?: I): UnitInfo_KVEntry {
    return UnitInfo_KVEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UnitInfo_KVEntry>, I>>(object: I): UnitInfo_KVEntry {
    const message = createBaseUnitInfo_KVEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseM2CCreateUnits(): M2CCreateUnits {
  return { Units: [] };
}

export const M2CCreateUnits = {
  encode(message: M2CCreateUnits, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Units) {
      UnitInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CCreateUnits {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CCreateUnits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Units.push(UnitInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CCreateUnits {
    return { Units: Array.isArray(object?.Units) ? object.Units.map((e: any) => UnitInfo.fromJSON(e)) : [] };
  },

  toJSON(message: M2CCreateUnits): unknown {
    const obj: any = {};
    if (message.Units) {
      obj.Units = message.Units.map((e) => e ? UnitInfo.toJSON(e) : undefined);
    } else {
      obj.Units = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CCreateUnits>, I>>(base?: I): M2CCreateUnits {
    return M2CCreateUnits.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CCreateUnits>, I>>(object: I): M2CCreateUnits {
    const message = createBaseM2CCreateUnits();
    message.Units = object.Units?.map((e) => UnitInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseM2CCreateMyUnit(): M2CCreateMyUnit {
  return { Unit: undefined };
}

export const M2CCreateMyUnit = {
  encode(message: M2CCreateMyUnit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Unit !== undefined) {
      UnitInfo.encode(message.Unit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CCreateMyUnit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CCreateMyUnit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Unit = UnitInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CCreateMyUnit {
    return { Unit: isSet(object.Unit) ? UnitInfo.fromJSON(object.Unit) : undefined };
  },

  toJSON(message: M2CCreateMyUnit): unknown {
    const obj: any = {};
    message.Unit !== undefined && (obj.Unit = message.Unit ? UnitInfo.toJSON(message.Unit) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CCreateMyUnit>, I>>(base?: I): M2CCreateMyUnit {
    return M2CCreateMyUnit.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CCreateMyUnit>, I>>(object: I): M2CCreateMyUnit {
    const message = createBaseM2CCreateMyUnit();
    message.Unit = (object.Unit !== undefined && object.Unit !== null) ? UnitInfo.fromPartial(object.Unit) : undefined;
    return message;
  },
};

function createBaseM2CStartSceneChange(): M2CStartSceneChange {
  return { SceneInstanceId: 0, SceneName: "" };
}

export const M2CStartSceneChange = {
  encode(message: M2CStartSceneChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SceneInstanceId !== 0) {
      writer.uint32(8).int64(message.SceneInstanceId);
    }
    if (message.SceneName !== "") {
      writer.uint32(18).string(message.SceneName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CStartSceneChange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CStartSceneChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SceneInstanceId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.SceneName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CStartSceneChange {
    return {
      SceneInstanceId: isSet(object.SceneInstanceId) ? Number(object.SceneInstanceId) : 0,
      SceneName: isSet(object.SceneName) ? String(object.SceneName) : "",
    };
  },

  toJSON(message: M2CStartSceneChange): unknown {
    const obj: any = {};
    message.SceneInstanceId !== undefined && (obj.SceneInstanceId = Math.round(message.SceneInstanceId));
    message.SceneName !== undefined && (obj.SceneName = message.SceneName);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CStartSceneChange>, I>>(base?: I): M2CStartSceneChange {
    return M2CStartSceneChange.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CStartSceneChange>, I>>(object: I): M2CStartSceneChange {
    const message = createBaseM2CStartSceneChange();
    message.SceneInstanceId = object.SceneInstanceId ?? 0;
    message.SceneName = object.SceneName ?? "";
    return message;
  },
};

function createBaseM2CRemoveUnits(): M2CRemoveUnits {
  return { Units: [] };
}

export const M2CRemoveUnits = {
  encode(message: M2CRemoveUnits, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(18).fork();
    for (const v of message.Units) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CRemoveUnits {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CRemoveUnits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.Units.push(longToNumber(reader.int64() as Long));
            }
          } else {
            message.Units.push(longToNumber(reader.int64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CRemoveUnits {
    return { Units: Array.isArray(object?.Units) ? object.Units.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: M2CRemoveUnits): unknown {
    const obj: any = {};
    if (message.Units) {
      obj.Units = message.Units.map((e) => Math.round(e));
    } else {
      obj.Units = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CRemoveUnits>, I>>(base?: I): M2CRemoveUnits {
    return M2CRemoveUnits.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CRemoveUnits>, I>>(object: I): M2CRemoveUnits {
    const message = createBaseM2CRemoveUnits();
    message.Units = object.Units?.map((e) => e) || [];
    return message;
  },
};

function createBaseC2MPathfindingResult(): C2MPathfindingResult {
  return { RpcId: 0, Position: undefined };
}

export const C2MPathfindingResult = {
  encode(message: C2MPathfindingResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Position !== undefined) {
      Vector3.encode(message.Position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MPathfindingResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MPathfindingResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Position = Vector3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2MPathfindingResult {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Position: isSet(object.Position) ? Vector3.fromJSON(object.Position) : undefined,
    };
  },

  toJSON(message: C2MPathfindingResult): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Position !== undefined && (obj.Position = message.Position ? Vector3.toJSON(message.Position) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MPathfindingResult>, I>>(base?: I): C2MPathfindingResult {
    return C2MPathfindingResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MPathfindingResult>, I>>(object: I): C2MPathfindingResult {
    const message = createBaseC2MPathfindingResult();
    message.RpcId = object.RpcId ?? 0;
    message.Position = (object.Position !== undefined && object.Position !== null)
      ? Vector3.fromPartial(object.Position)
      : undefined;
    return message;
  },
};

function createBaseC2MStop(): C2MStop {
  return { RpcId: 0 };
}

export const C2MStop = {
  encode(message: C2MStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MStop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MStop();
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

  fromJSON(object: any): C2MStop {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: C2MStop): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MStop>, I>>(base?: I): C2MStop {
    return C2MStop.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MStop>, I>>(object: I): C2MStop {
    const message = createBaseC2MStop();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseM2CPathfindingResult(): M2CPathfindingResult {
  return { Id: 0, Position: undefined, Points: [] };
}

export const M2CPathfindingResult = {
  encode(message: M2CPathfindingResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Id !== 0) {
      writer.uint32(8).int64(message.Id);
    }
    if (message.Position !== undefined) {
      Vector3.encode(message.Position, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.Points) {
      Vector3.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CPathfindingResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CPathfindingResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.Position = Vector3.decode(reader, reader.uint32());
          break;
        case 3:
          message.Points.push(Vector3.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CPathfindingResult {
    return {
      Id: isSet(object.Id) ? Number(object.Id) : 0,
      Position: isSet(object.Position) ? Vector3.fromJSON(object.Position) : undefined,
      Points: Array.isArray(object?.Points) ? object.Points.map((e: any) => Vector3.fromJSON(e)) : [],
    };
  },

  toJSON(message: M2CPathfindingResult): unknown {
    const obj: any = {};
    message.Id !== undefined && (obj.Id = Math.round(message.Id));
    message.Position !== undefined && (obj.Position = message.Position ? Vector3.toJSON(message.Position) : undefined);
    if (message.Points) {
      obj.Points = message.Points.map((e) => e ? Vector3.toJSON(e) : undefined);
    } else {
      obj.Points = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CPathfindingResult>, I>>(base?: I): M2CPathfindingResult {
    return M2CPathfindingResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CPathfindingResult>, I>>(object: I): M2CPathfindingResult {
    const message = createBaseM2CPathfindingResult();
    message.Id = object.Id ?? 0;
    message.Position = (object.Position !== undefined && object.Position !== null)
      ? Vector3.fromPartial(object.Position)
      : undefined;
    message.Points = object.Points?.map((e) => Vector3.fromPartial(e)) || [];
    return message;
  },
};

function createBaseM2CStop(): M2CStop {
  return { Error: 0, Id: 0, Position: undefined, Rotation: undefined };
}

export const M2CStop = {
  encode(message: M2CStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Error !== 0) {
      writer.uint32(8).int32(message.Error);
    }
    if (message.Id !== 0) {
      writer.uint32(16).int64(message.Id);
    }
    if (message.Position !== undefined) {
      Vector3.encode(message.Position, writer.uint32(26).fork()).ldelim();
    }
    if (message.Rotation !== undefined) {
      Vector4.encode(message.Rotation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CStop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CStop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Error = reader.int32();
          break;
        case 2:
          message.Id = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.Position = Vector3.decode(reader, reader.uint32());
          break;
        case 4:
          message.Rotation = Vector4.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CStop {
    return {
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Id: isSet(object.Id) ? Number(object.Id) : 0,
      Position: isSet(object.Position) ? Vector3.fromJSON(object.Position) : undefined,
      Rotation: isSet(object.Rotation) ? Vector4.fromJSON(object.Rotation) : undefined,
    };
  },

  toJSON(message: M2CStop): unknown {
    const obj: any = {};
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Id !== undefined && (obj.Id = Math.round(message.Id));
    message.Position !== undefined && (obj.Position = message.Position ? Vector3.toJSON(message.Position) : undefined);
    message.Rotation !== undefined && (obj.Rotation = message.Rotation ? Vector4.toJSON(message.Rotation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CStop>, I>>(base?: I): M2CStop {
    return M2CStop.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CStop>, I>>(object: I): M2CStop {
    const message = createBaseM2CStop();
    message.Error = object.Error ?? 0;
    message.Id = object.Id ?? 0;
    message.Position = (object.Position !== undefined && object.Position !== null)
      ? Vector3.fromPartial(object.Position)
      : undefined;
    message.Rotation = (object.Rotation !== undefined && object.Rotation !== null)
      ? Vector4.fromPartial(object.Rotation)
      : undefined;
    return message;
  },
};

function createBaseC2GPing(): C2GPing {
  return { RpcId: 0 };
}

export const C2GPing = {
  encode(message: C2GPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2GPing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2GPing();
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

  fromJSON(object: any): C2GPing {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: C2GPing): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2GPing>, I>>(base?: I): C2GPing {
    return C2GPing.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2GPing>, I>>(object: I): C2GPing {
    const message = createBaseC2GPing();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseG2CPing(): G2CPing {
  return { RpcId: 0, Error: 0, Message: "", Time: 0 };
}

export const G2CPing = {
  encode(message: G2CPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.Time !== 0) {
      writer.uint32(32).int64(message.Time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CPing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CPing();
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
          message.Time = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2CPing {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      Time: isSet(object.Time) ? Number(object.Time) : 0,
    };
  },

  toJSON(message: G2CPing): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.Time !== undefined && (obj.Time = Math.round(message.Time));
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CPing>, I>>(base?: I): G2CPing {
    return G2CPing.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CPing>, I>>(object: I): G2CPing {
    const message = createBaseG2CPing();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.Time = object.Time ?? 0;
    return message;
  },
};

function createBaseG2CTest(): G2CTest {
  return {};
}

export const G2CTest = {
  encode(_: G2CTest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CTest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CTest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): G2CTest {
    return {};
  },

  toJSON(_: G2CTest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CTest>, I>>(base?: I): G2CTest {
    return G2CTest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CTest>, I>>(_: I): G2CTest {
    const message = createBaseG2CTest();
    return message;
  },
};

function createBaseC2MReload(): C2MReload {
  return { RpcId: 0, Account: "", Password: "" };
}

export const C2MReload = {
  encode(message: C2MReload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Account !== "") {
      writer.uint32(18).string(message.Account);
    }
    if (message.Password !== "") {
      writer.uint32(26).string(message.Password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MReload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MReload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Account = reader.string();
          break;
        case 3:
          message.Password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2MReload {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Account: isSet(object.Account) ? String(object.Account) : "",
      Password: isSet(object.Password) ? String(object.Password) : "",
    };
  },

  toJSON(message: C2MReload): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Account !== undefined && (obj.Account = message.Account);
    message.Password !== undefined && (obj.Password = message.Password);
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MReload>, I>>(base?: I): C2MReload {
    return C2MReload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MReload>, I>>(object: I): C2MReload {
    const message = createBaseC2MReload();
    message.RpcId = object.RpcId ?? 0;
    message.Account = object.Account ?? "";
    message.Password = object.Password ?? "";
    return message;
  },
};

function createBaseM2CReload(): M2CReload {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const M2CReload = {
  encode(message: M2CReload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CReload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CReload();
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

  fromJSON(object: any): M2CReload {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: M2CReload): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CReload>, I>>(base?: I): M2CReload {
    return M2CReload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CReload>, I>>(object: I): M2CReload {
    const message = createBaseM2CReload();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseC2RLogin(): C2RLogin {
  return { RpcId: 0, Account: "", Password: "" };
}

export const C2RLogin = {
  encode(message: C2RLogin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Account !== "") {
      writer.uint32(18).string(message.Account);
    }
    if (message.Password !== "") {
      writer.uint32(26).string(message.Password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2RLogin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2RLogin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.Account = reader.string();
          break;
        case 3:
          message.Password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2RLogin {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Account: isSet(object.Account) ? String(object.Account) : "",
      Password: isSet(object.Password) ? String(object.Password) : "",
    };
  },

  toJSON(message: C2RLogin): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Account !== undefined && (obj.Account = message.Account);
    message.Password !== undefined && (obj.Password = message.Password);
    return obj;
  },

  create<I extends Exact<DeepPartial<C2RLogin>, I>>(base?: I): C2RLogin {
    return C2RLogin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2RLogin>, I>>(object: I): C2RLogin {
    const message = createBaseC2RLogin();
    message.RpcId = object.RpcId ?? 0;
    message.Account = object.Account ?? "";
    message.Password = object.Password ?? "";
    return message;
  },
};

function createBaseR2CLogin(): R2CLogin {
  return { RpcId: 0, Error: 0, Message: "", Address: "", Key: 0, GateId: 0 };
}

export const R2CLogin = {
  encode(message: R2CLogin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.Address !== "") {
      writer.uint32(34).string(message.Address);
    }
    if (message.Key !== 0) {
      writer.uint32(40).int64(message.Key);
    }
    if (message.GateId !== 0) {
      writer.uint32(48).int64(message.GateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): R2CLogin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseR2CLogin();
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
          message.Address = reader.string();
          break;
        case 5:
          message.Key = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.GateId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): R2CLogin {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      Address: isSet(object.Address) ? String(object.Address) : "",
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      GateId: isSet(object.GateId) ? Number(object.GateId) : 0,
    };
  },

  toJSON(message: R2CLogin): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.Address !== undefined && (obj.Address = message.Address);
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.GateId !== undefined && (obj.GateId = Math.round(message.GateId));
    return obj;
  },

  create<I extends Exact<DeepPartial<R2CLogin>, I>>(base?: I): R2CLogin {
    return R2CLogin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<R2CLogin>, I>>(object: I): R2CLogin {
    const message = createBaseR2CLogin();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.Address = object.Address ?? "";
    message.Key = object.Key ?? 0;
    message.GateId = object.GateId ?? 0;
    return message;
  },
};

function createBaseC2GLoginGate(): C2GLoginGate {
  return { RpcId: 0, Key: 0, GateId: 0 };
}

export const C2GLoginGate = {
  encode(message: C2GLoginGate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Key !== 0) {
      writer.uint32(16).int64(message.Key);
    }
    if (message.GateId !== 0) {
      writer.uint32(24).int64(message.GateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2GLoginGate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2GLoginGate();
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
          message.GateId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2GLoginGate {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Key: isSet(object.Key) ? Number(object.Key) : 0,
      GateId: isSet(object.GateId) ? Number(object.GateId) : 0,
    };
  },

  toJSON(message: C2GLoginGate): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Key !== undefined && (obj.Key = Math.round(message.Key));
    message.GateId !== undefined && (obj.GateId = Math.round(message.GateId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2GLoginGate>, I>>(base?: I): C2GLoginGate {
    return C2GLoginGate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2GLoginGate>, I>>(object: I): C2GLoginGate {
    const message = createBaseC2GLoginGate();
    message.RpcId = object.RpcId ?? 0;
    message.Key = object.Key ?? 0;
    message.GateId = object.GateId ?? 0;
    return message;
  },
};

function createBaseG2CLoginGate(): G2CLoginGate {
  return { RpcId: 0, Error: 0, Message: "", PlayerId: 0 };
}

export const G2CLoginGate = {
  encode(message: G2CLoginGate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.PlayerId !== 0) {
      writer.uint32(32).int64(message.PlayerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CLoginGate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CLoginGate();
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
          message.PlayerId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2CLoginGate {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      PlayerId: isSet(object.PlayerId) ? Number(object.PlayerId) : 0,
    };
  },

  toJSON(message: G2CLoginGate): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.PlayerId !== undefined && (obj.PlayerId = Math.round(message.PlayerId));
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CLoginGate>, I>>(base?: I): G2CLoginGate {
    return G2CLoginGate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CLoginGate>, I>>(object: I): G2CLoginGate {
    const message = createBaseG2CLoginGate();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.PlayerId = object.PlayerId ?? 0;
    return message;
  },
};

function createBaseG2CTestHotfixMessage(): G2CTestHotfixMessage {
  return { Info: "" };
}

export const G2CTestHotfixMessage = {
  encode(message: G2CTestHotfixMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Info !== "") {
      writer.uint32(10).string(message.Info);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CTestHotfixMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CTestHotfixMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Info = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): G2CTestHotfixMessage {
    return { Info: isSet(object.Info) ? String(object.Info) : "" };
  },

  toJSON(message: G2CTestHotfixMessage): unknown {
    const obj: any = {};
    message.Info !== undefined && (obj.Info = message.Info);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CTestHotfixMessage>, I>>(base?: I): G2CTestHotfixMessage {
    return G2CTestHotfixMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CTestHotfixMessage>, I>>(object: I): G2CTestHotfixMessage {
    const message = createBaseG2CTestHotfixMessage();
    message.Info = object.Info ?? "";
    return message;
  },
};

function createBaseC2MTestRobotCase(): C2MTestRobotCase {
  return { RpcId: 0, N: 0 };
}

export const C2MTestRobotCase = {
  encode(message: C2MTestRobotCase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.N !== 0) {
      writer.uint32(16).int32(message.N);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MTestRobotCase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MTestRobotCase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RpcId = reader.int32();
          break;
        case 2:
          message.N = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): C2MTestRobotCase {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0, N: isSet(object.N) ? Number(object.N) : 0 };
  },

  toJSON(message: C2MTestRobotCase): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.N !== undefined && (obj.N = Math.round(message.N));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MTestRobotCase>, I>>(base?: I): C2MTestRobotCase {
    return C2MTestRobotCase.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MTestRobotCase>, I>>(object: I): C2MTestRobotCase {
    const message = createBaseC2MTestRobotCase();
    message.RpcId = object.RpcId ?? 0;
    message.N = object.N ?? 0;
    return message;
  },
};

function createBaseM2CTestRobotCase(): M2CTestRobotCase {
  return { RpcId: 0, Error: 0, Message: "", N: 0 };
}

export const M2CTestRobotCase = {
  encode(message: M2CTestRobotCase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    if (message.Error !== 0) {
      writer.uint32(16).int32(message.Error);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    if (message.N !== 0) {
      writer.uint32(32).int32(message.N);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CTestRobotCase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CTestRobotCase();
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
          message.N = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): M2CTestRobotCase {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
      N: isSet(object.N) ? Number(object.N) : 0,
    };
  },

  toJSON(message: M2CTestRobotCase): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    message.N !== undefined && (obj.N = Math.round(message.N));
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CTestRobotCase>, I>>(base?: I): M2CTestRobotCase {
    return M2CTestRobotCase.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CTestRobotCase>, I>>(object: I): M2CTestRobotCase {
    const message = createBaseM2CTestRobotCase();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    message.N = object.N ?? 0;
    return message;
  },
};

function createBaseC2MTransferMap(): C2MTransferMap {
  return { RpcId: 0 };
}

export const C2MTransferMap = {
  encode(message: C2MTransferMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2MTransferMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2MTransferMap();
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

  fromJSON(object: any): C2MTransferMap {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: C2MTransferMap): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2MTransferMap>, I>>(base?: I): C2MTransferMap {
    return C2MTransferMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2MTransferMap>, I>>(object: I): C2MTransferMap {
    const message = createBaseC2MTransferMap();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseM2CTransferMap(): M2CTransferMap {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const M2CTransferMap = {
  encode(message: M2CTransferMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): M2CTransferMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseM2CTransferMap();
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

  fromJSON(object: any): M2CTransferMap {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: M2CTransferMap): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<M2CTransferMap>, I>>(base?: I): M2CTransferMap {
    return M2CTransferMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<M2CTransferMap>, I>>(object: I): M2CTransferMap {
    const message = createBaseM2CTransferMap();
    message.RpcId = object.RpcId ?? 0;
    message.Error = object.Error ?? 0;
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseC2GBenchmark(): C2GBenchmark {
  return { RpcId: 0 };
}

export const C2GBenchmark = {
  encode(message: C2GBenchmark, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RpcId !== 0) {
      writer.uint32(8).int32(message.RpcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): C2GBenchmark {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseC2GBenchmark();
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

  fromJSON(object: any): C2GBenchmark {
    return { RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0 };
  },

  toJSON(message: C2GBenchmark): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    return obj;
  },

  create<I extends Exact<DeepPartial<C2GBenchmark>, I>>(base?: I): C2GBenchmark {
    return C2GBenchmark.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<C2GBenchmark>, I>>(object: I): C2GBenchmark {
    const message = createBaseC2GBenchmark();
    message.RpcId = object.RpcId ?? 0;
    return message;
  },
};

function createBaseG2CBenchmark(): G2CBenchmark {
  return { RpcId: 0, Error: 0, Message: "" };
}

export const G2CBenchmark = {
  encode(message: G2CBenchmark, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): G2CBenchmark {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseG2CBenchmark();
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

  fromJSON(object: any): G2CBenchmark {
    return {
      RpcId: isSet(object.RpcId) ? Number(object.RpcId) : 0,
      Error: isSet(object.Error) ? Number(object.Error) : 0,
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: G2CBenchmark): unknown {
    const obj: any = {};
    message.RpcId !== undefined && (obj.RpcId = Math.round(message.RpcId));
    message.Error !== undefined && (obj.Error = Math.round(message.Error));
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<G2CBenchmark>, I>>(base?: I): G2CBenchmark {
    return G2CBenchmark.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<G2CBenchmark>, I>>(object: I): G2CBenchmark {
    const message = createBaseG2CBenchmark();
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
