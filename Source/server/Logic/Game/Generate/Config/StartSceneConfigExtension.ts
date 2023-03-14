import { SceneType } from "../../../../../client/assets/Scripts/Core/Entity/SceneType";
import { InstanceIdStruct } from "../../../../../client/assets/Scripts/Core/IdGenerater/IdGenerater";
import { MultiMap } from "../../../../../client/assets/Scripts/Core/MultiMap";
import { IPEndPoint } from "../../../../../client/assets/Scripts/Core/Network/IPEndPoint";
import { Options } from "../../../../../client/assets/Scripts/Core/Options/Options";
import { StartSceneConfig, StartSceneConfigCategory, Tables } from "./Types";

declare module "./Types" {
    interface StartSceneConfigCategory {
        Realms: StartSceneConfig[]
        Robots: StartSceneConfig[]
        Gates: StartSceneConfig[]
        Maps: StartSceneConfig[]
        ProcessScenes: MultiMap<number, StartSceneConfig>
        LocationConfig: StartSceneConfig
        ClientScenesByName: Map<string, StartSceneConfig>

        afterEndInit(): void
        GetByProcess(process: number): Array<StartSceneConfig>
        GetBySceneName(name: string): StartSceneConfig
    }

    interface StartSceneConfig {
        Type: SceneType;
        InstanceId: number;
        // 内网地址外网端口，通过防火墙映射端口过来
        _innerIPOutPort: IPEndPoint;
        _outerIPPort: IPEndPoint;

        afterEndInit(): void
        getStartProcessConfig(): StartProcessConfig
        getInnerIPOutPort(): IPEndPoint
        getOuterIPPort(): IPEndPoint
    }
}

StartSceneConfigCategory.prototype.afterEndInit = function () {
    let self: StartSceneConfigCategory = this;

    self.Realms = []
    self.Robots = []
    self.Gates = []
    self.Maps = []
    self.ClientScenesByName = new Map
    self.ProcessScenes = new MultiMap

    let zone = Options.inst.zone

    for (let startSceneConfig of self.getDataList()) {
        if(startSceneConfig.Zone != zone){
            continue
        }

        self.ProcessScenes.Add(startSceneConfig.Process, startSceneConfig);
        self.ClientScenesByName.set(startSceneConfig.Name, startSceneConfig);

        switch (startSceneConfig.Type) {
            case SceneType.Realm:
                self.Realms.push(startSceneConfig);
                break;
            case SceneType.Gate:
                self.Gates.push(startSceneConfig);
                break;
            case SceneType.Location:
                self.LocationConfig = startSceneConfig;
                break;
            case SceneType.Robot:
                self.Robots.push(startSceneConfig);
                break;
            case SceneType.Map:
                self.Maps.push(startSceneConfig);
                break;
        }
    }
}

StartSceneConfigCategory.prototype.GetByProcess = function (process: number) {
    let self: StartSceneConfigCategory = this;

    return self.ProcessScenes.get(process)
}

StartSceneConfigCategory.prototype.GetBySceneName = function (name: string) {
    let self: StartSceneConfigCategory = this;

    return self.ClientScenesByName.get(name)
}

////////////////////////////////////////////////////////////////////////
StartSceneConfig.prototype.afterEndInit = function () {
    let self: StartSceneConfig = this

    self.Type = SceneType[self.SceneType]

    let instanceIdStruct = new InstanceIdStruct();
    instanceIdStruct.initArgs2(self.Process, self.Id)
    self.InstanceId = instanceIdStruct.ToLong();
}

StartSceneConfig.prototype.getStartProcessConfig = function () {
    let self: StartSceneConfig = this

    return Tables.StartProcessConfigCategory.getStartProcessConfig(self.Process);
}

StartSceneConfig.prototype.getInnerIPOutPort = function () {
    let self: StartSceneConfig = this

    if (self._innerIPOutPort == null) {
        self._innerIPOutPort = new IPEndPoint(self.getStartProcessConfig().getInnerIP(), self.OuterPort);
    }

    return self._innerIPOutPort;
}

StartSceneConfig.prototype.getOuterIPPort = function () {
    let self: StartSceneConfig = this

    if (self._outerIPPort == null) {
        self._outerIPPort = new IPEndPoint(self.getStartProcessConfig().getOuterIP(), self.OuterPort);
    }

    return self._outerIPPort;
}
