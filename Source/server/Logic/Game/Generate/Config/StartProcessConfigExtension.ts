
import { InstanceIdStruct } from "../../../../../client/assets/Scripts/Core/IdGenerater/IdGenerater";
import { IPEndPoint } from "../../../../../client/assets/Scripts/Core/Network/IPEndPoint";
import { StartProcessConfig, Tables } from "./Types";

declare module "./Types" {
    interface StartProcessConfig {
        _innerIPPort: IPEndPoint
        SceneId: number

        afterEndInit(): void
        getStartMachineConfig(): StartMachineConfig
        getInnerIP(): string
        getOuterIP(): string
        getInnerIPPort(): IPEndPoint
    }
}

StartProcessConfig.prototype.afterEndInit = function () {
    let self: StartProcessConfig = this;

    let instanceIdStruct = new InstanceIdStruct();
    instanceIdStruct.initArgs2(self.Id, 0)

    self.SceneId = instanceIdStruct.ToLong();
}

StartProcessConfig.prototype.getStartMachineConfig = function () {
    let self: StartProcessConfig = this;

    return Tables.StartMachineConfigCategory.get(self.MachineId)
}

StartProcessConfig.prototype.getInnerIP = function () {
    let self: StartProcessConfig = this;

    return self.getStartMachineConfig().InnerIP
}

StartProcessConfig.prototype.getOuterIP = function () {
    let self: StartProcessConfig = this;

    return self.getStartMachineConfig().OuterIP
}

StartProcessConfig.prototype.getInnerIPPort = function () {
    let self: StartProcessConfig = this;

    if(!self._innerIPPort){
        self._innerIPPort = new IPEndPoint(self.getInnerIP(), self.InnerPort)
    }

    return self._innerIPPort
}