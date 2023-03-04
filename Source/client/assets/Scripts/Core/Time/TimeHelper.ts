import { TimeInfo } from "./TimeInfo";

export class TimeHelper {
    public static readonly OneDay: number = 86400000;
    public static readonly Hour: number = 3600000;
    public static readonly Minute: number = 60000;

    public static clientNow(): number {
        return TimeInfo.inst.clientNow();
    }

    public static clientNowSeconds(): number {
        return Math.floor(TimeHelper.clientNow() / 1000);
    }

    public static dateTimeNow(): Date {
        return new Date();
    }

    public static serverNow(): number {
        return TimeInfo.inst.serverNow();
    }

    public static clientFrameTime(): number {
        return TimeInfo.inst.clientFrameTime();
    }

    public static serverFrameTime(): number {
        return TimeInfo.inst.serverFrameTime();
    }
}
