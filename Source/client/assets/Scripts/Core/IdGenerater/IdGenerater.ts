import { ctError } from "../Log/Logger";
import { Options } from "../Options/Options";
import { Singleton } from "../Singleton/Singleton";

export class IdGenerater extends Singleton{
    public static get inst(): IdGenerater {
        return this._inst as IdGenerater
    }

    /**
     * （基准时间）：指定一个时间点作为时间戳计算的起点。一般选择一个过去的时间点，以便时间戳能够尽可能地小。
     */
    private static readonly EPOCH = 1609459200000; // 2021-01-01 00:00:00 UTC
    /**
     * 用于存储节点 ID 的二进制位数。默认为 5 位，可以表示最多 32 个节点
     */
    private static readonly NODE_ID_BITS = 5;
    /**
    * 用于存储序列号的二进制位数。默认为 12 位，可以表示每个节点每毫秒最多生成 4096 个 ID
    */
    private static readonly SEQUENCE_BITS = 12;
    private static readonly NODE_ID_SHIFT = IdGenerater.SEQUENCE_BITS;
    private static readonly TIMESTAMP_SHIFT = IdGenerater.NODE_ID_BITS + IdGenerater.SEQUENCE_BITS;
    private static readonly SEQUENCE_MASK = (1 << IdGenerater.SEQUENCE_BITS) - 1;

    private instanceIdSequence: number = 0
    private instanceIdLastTimestamp: number = 0
    private unitIdSequence: number = 0
    private unitIdLastTimestamp: number = 0

    public generateInstanceId(): number {
        let timestamp = Date.now() - IdGenerater.EPOCH;
        if (timestamp < this.instanceIdLastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.instanceIdLastTimestamp - timestamp} milliseconds.`);
        }
        if (timestamp === this.instanceIdLastTimestamp) {
            this.instanceIdSequence = (this.instanceIdSequence + 1) & IdGenerater.SEQUENCE_MASK;
            if (this.instanceIdSequence === 0) {
                ctError(`instanceid count per sec overflow: ${timestamp}`);
                timestamp = this.waitInstanceIdUntilNextMillis();
            }
        } else {
            this.instanceIdSequence = 0;
        }
        this.instanceIdLastTimestamp = timestamp;
        return (timestamp << IdGenerater.TIMESTAMP_SHIFT) | (Options.inst.process << IdGenerater.NODE_ID_SHIFT) | this.instanceIdSequence;
    }
    
    public generateUnitId(): number {
        let timestamp = Date.now() - IdGenerater.EPOCH;
        if (timestamp < this.unitIdLastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.unitIdLastTimestamp - timestamp} milliseconds.`);
        }
        if (timestamp === this.unitIdLastTimestamp) {
            this.unitIdSequence = (this.unitIdSequence + 1) & IdGenerater.SEQUENCE_MASK;
            if (this.unitIdSequence === 0) {
                ctError(`unitid count per sec overflow: ${timestamp}`);
                timestamp = this.waitUnitIdUntilNextMillis();
            }
        } else {
            this.unitIdSequence = 0;
        }
        this.unitIdLastTimestamp = timestamp;
        return (timestamp << IdGenerater.TIMESTAMP_SHIFT) | (Options.inst.process << IdGenerater.NODE_ID_SHIFT) | this.unitIdSequence;
    }

    private waitInstanceIdUntilNextMillis(): number {
        let timestamp = Date.now() - IdGenerater.EPOCH;
        while (timestamp <= this.instanceIdLastTimestamp) {
            timestamp = Date.now() - IdGenerater.EPOCH;
        }
        return timestamp;
    }

    private waitUnitIdUntilNextMillis(): number {
        let timestamp = Date.now() - IdGenerater.EPOCH;
        while (timestamp <= this.unitIdLastTimestamp) {
            timestamp = Date.now() - IdGenerater.EPOCH;
        }
        return timestamp;
    }
}