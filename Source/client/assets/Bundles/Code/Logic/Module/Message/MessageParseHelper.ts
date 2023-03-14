import pb from 'protobufjs'
import { quat, Quat } from '../Math/quat'
import { v3, Vec3 } from '../Math/vec3'

export class MessageParseHelper {
    public static encodeVec3(w: pb.Writer, vec: Vec3) {
        w.uint32(13).float(vec.x)
        w.uint32(21).float(vec.y)
        w.uint32(29).float(vec.z)
    }

    public static docodeVec3(r: pb.Reader, length: number) {
        let vec = v3()
        let end = length === undefined ? r.len : r.pos + length;

        while (r.pos < end) {
            const tag = r.uint32()
            switch (tag >>> 3) {
                case 1:
                    vec.x = r.float()
                    break
                case 2:
                    vec.y = r.float()
                    break
                case 3:
                    vec.z = r.float()
                    break
                default:
                    r.skipType(tag & 7)
                    break
            }
        }

        return vec
    }

    public static encodeQuat(w: pb.Writer, vec: Quat) {
        w.uint32(13).float(vec.x)
        w.uint32(21).float(vec.y)
        w.uint32(29).float(vec.z)
        w.uint32(37).float(vec.w)
    }

    public static docodeQuat(r: pb.Reader, length: number) {
        let vec = quat()
        let end = length === undefined ? r.len : r.pos + length;

        while (r.pos < end) {
            const tag = r.uint32()
            switch (tag >>> 3) {
                case 1:
                    vec.x = r.float()
                    break
                case 2:
                    vec.y = r.float()
                    break
                case 3:
                    vec.z = r.float()
                    break
                case 4:
                    vec.w = r.float()
                    break
                default:
                    r.skipType(tag & 7)
                    break
            }
        }

        return vec
    }
}