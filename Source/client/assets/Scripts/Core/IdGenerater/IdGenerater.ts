import Long from 'long'
import { ctError, ctLog, ctWarn } from "../Log/Logger";
import { Options } from "../Options/Options";
import { Singleton } from "../Singleton/Singleton";
import { TimeInfo } from "../Time/TimeInfo";

export class IdStruct {
    public Time: number;   // 当年开始的tick 33bit
    public Process: number; // 10bit 最大进程数量
    public Value: number;  // 21bit 每秒可以生成id数量
    private result: Long;

    public ToLong(): number {
        let result = this.result.toNumber()

        return result;
    }

    public initArgs1(id: number) {
        this.result = Long.fromNumber(id, true)

        this.Time = this.result.and(8589934591).toNumber()
        this.Process = this.result.shiftRight(33).and(1023).toNumber()
        this.Value = this.result.shiftRight(43).and(2097151).toNumber()
    }

    public initArgs3(time: number, process: number, value: number) {
        this.Time = time;
        this.Process = process;
        this.Value = value;

        this.updateResult()
    }

    private updateResult() {
        this.result = Long.fromInt(0, true).or(this.Value).shiftLeft(10).or(this.Process).shiftLeft(33).or(this.Time)
    }
}

export class InstanceIdStruct {
    public Time: number;   // 当年开始的tick 32bit
    public Process: number; // 11bit 最大进程数量
    public Value: number;  // 21bit 每秒可以生成id数量
    private result: Long;

    public ToLong(): number {
        let result = this.result.toNumber()

        return result;
    }

    public initArgs1(id: number) {
        this.result = Long.fromNumber(id, true)

        this.Time = this.result.and(4294967295).toNumber()
        this.Process = this.result.shiftRight(32).and(2047).toNumber()
        this.Value = this.result.shiftRight(43).and(2097151).toNumber()
    }

    // 给SceneId使用
    public initArgs2(process: number, value: number) {
        this.Time = 0;
        this.Process = process;
        this.Value = value;

        this.updateResult()
    }

    public initArgs3(time: number, process: number, value: number) {
        this.Time = time;
        this.Process = process;
        this.Value = value;

        this.updateResult()
    }

    private updateResult() {
        this.result = Long.fromInt(0, true).or(this.Value).shiftLeft(11).or(this.Process).shiftLeft(32).or(this.Time)
    }
}

export class IdGenerater extends Singleton {
    public static get inst(): IdGenerater {
        return this._inst as IdGenerater
    }

    epoch2020: number;
    private value: number = 0;
    private lastIdTime: number;
    
    epochThisYear: number;
    private instanceIdValue: number = 0;
    private lastInstanceIdTime: number;

    awake(): void {
        this.epoch2020 = new Date(2020, 0, 1).getTime()
        this.epochThisYear = new Date(new Date().getFullYear(), 0, 1).getTime()

        this.lastInstanceIdTime = this.TimeSinceThisYear();
        if (this.lastInstanceIdTime <= 0) {
            ctWarn(`lastInstanceIdTime less than 0: ${this.lastInstanceIdTime}`);
            this.lastInstanceIdTime = 1;
        }

        this.lastIdTime = this.TimeSince2020();
        if (this.lastIdTime <= 0) {
            ctWarn(`lastIdTime less than 0: ${this.lastIdTime}`);
            this.lastIdTime = 1;
        }
    }


    private TimeSince2020(): number {
        let a = (TimeInfo.inst.frameTime - this.epoch2020) / 1000;
        return Math.floor(a);
    }

    private TimeSinceThisYear(): number {
        let a = (TimeInfo.inst.frameTime - this.epochThisYear) / 1000;
        return Math.floor(a);
    }

    public generateInstanceId(): number
    {
        let time = this.TimeSinceThisYear();

        if (time > this.lastInstanceIdTime)
        {
            this.lastInstanceIdTime = time;
            this.instanceIdValue = 0;
        }
        else
        {
            ++this.instanceIdValue;
            
            if (this.instanceIdValue > 2097151) // 18bit
            {
                ++this.lastInstanceIdTime; // 借用下一秒
                this.instanceIdValue = 0;

                ctError(`instanceid count per sec overflow: ${time} ${this.lastInstanceIdTime}`);
            }
        }

        let instanceIdStruct = new InstanceIdStruct();
        instanceIdStruct.initArgs3(this.lastInstanceIdTime, Options.inst.process, this.instanceIdValue)
        
        return instanceIdStruct.ToLong();
    }

    public generateId(): number
    {
        let time = this.TimeSince2020();

        if (time > this.lastIdTime)
        {
            this.lastIdTime = time;
            this.value = 0;
        }
        else
        {
            ++this.value;
            
            if (this.value > 2097151)
            {
                this.value = 0;
                ++this.lastIdTime; // 借用下一秒
                ctError(`id count per sec overflow: ${time} ${this.lastIdTime}`);
            }
        }
        
        let idStruct = new IdStruct();
        idStruct.initArgs3(this.lastIdTime, Options.inst.process, this.value)
        return idStruct.ToLong();
    }
}