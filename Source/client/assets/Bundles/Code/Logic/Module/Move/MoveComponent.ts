import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Task } from "../../../../../Scripts/Core/Task/Task";
import { Quat } from "../Math/quat";
import { Vec3 } from "../Math/vec3";

export class MoveComponent extends Entity {
    public get PreTarget(): Vec3 {
        return this.Targets[this.N - 1];
    }

    public get NextTarget(): Vec3 {
        return this.Targets[this.N];
    }

    // 开启移动协程的时间
    public BeginTime: number;

    // 每个点的开始时间
    public StartTime: number;

    // 开启移动协程的Unit的位置
    public StartPos: Vec3;

    public get RealPos(): Vec3 {
        return this.Targets[0];
    }

    private needTime: number;

    public get NeedTime(): number {
        return this.needTime;
    }

    public set NeedTime(value: number) {
        this.needTime = value;
    }

    public MoveTimer: number;

    public Speed: number; // m/s

    public tcs: Task<boolean>;

    public Targets: Vec3[] = [];

    public get FinalTarget(): Vec3 {
        return this.Targets[this.Targets.length - 1];
    }

    public N: number;

    public TurnTime: number;

    public IsTurnHorizontal: boolean;

    public From: Quat;

    public To: Quat;

    public IsArrived()
    {
        return this.Targets.length == 0;
    }
}    