import { IPEndPoint } from "../../../../../client/assets/Scripts/Core/Network/IPEndPoint";
import { Options } from "../../../../../client/assets/Scripts/Core/Options/Options";
import { StartProcessConfig, Tables, StartProcessConfigCategory } from "./Types";

declare module "./Types" {
    interface StartProcessConfigCategory {
        processMap: Map<number, StartProcessConfig>
        afterEndInit(): void
        getStartProcessConfig(process: number): StartProcessConfig
    }

    interface StartProcessConfig {
        _innerIPPort: IPEndPoint

        getStartMachineConfig(): StartMachineConfig
        afterEndInit(): void
        getInnerIP(): string
        getOuterIP(): string
        getInnerIPPort(): IPEndPoint
    }
}

StartProcessConfigCategory.prototype.afterEndInit = function () {
    let self: StartProcessConfigCategory = this;

    let zone = Options.inst.zone
    self.processMap = new Map

    for (let startProcessConfig of self.getDataList()) {
        if (startProcessConfig.Zone != zone) {
            continue
        }

        self.processMap.set(startProcessConfig.Process, startProcessConfig)
    }
}

StartProcessConfigCategory.prototype.getStartProcessConfig = function (process: number): StartProcessConfig {
    let self: StartProcessConfigCategory = this;

    return self.processMap.get(process)
}

///////////////////////////////////////////////////////////////////////
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

    if (!self._innerIPPort) {
        self._innerIPPort = new IPEndPoint(self.getInnerIP(), self.InnerPort)
    }

    return self._innerIPPort
}