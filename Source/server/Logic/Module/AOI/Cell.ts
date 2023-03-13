import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { AOIEntity } from "./AOIEntity";

export class Cell extends Entity
{
    // 处在这个cell的单位
    public AOIUnits: Map<number, AOIEntity> = new Map();

    // 订阅了这个Cell的进入事件
    public SubsEnterEntities: Map<number, AOIEntity> = new Map();

    // 订阅了这个Cell的退出事件
    public SubsLeaveEntities: Map<number, AOIEntity> = new Map();
}