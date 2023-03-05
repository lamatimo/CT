import { ChildProcess } from "child_process";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { NetworkHelper } from "../../Module/Network/NetworkHelper";
import { Tables } from "../Generate/Config/Types";
import { WatcherHelper } from "./WatcherHelper";

export class WatcherComponent extends Entity {
    public static inst: WatcherComponent

    public Processes: Map<number, ChildProcess> = new Map

    awake(): void {
        WatcherComponent.inst = this
    }

    destroy(): void {
        WatcherComponent.inst = null
    }

    public Start()
    {
        let localIP = NetworkHelper.getAddressIP();
        var processConfigs = Tables.StartProcessConfigCategory.getDataList();

        for (let startProcessConfig of processConfigs)
        {
            // 只启动这台机器的
            if(startProcessConfig.getInnerIP() != localIP){
                continue
            }

            let process = WatcherHelper.StartProcess(startProcessConfig.Id);
            this.Processes.set(startProcessConfig.Id, process);
        }
    }
}