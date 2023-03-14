import { LoadAllConfigBytes } from "../../../client/assets/Scripts/Core/Config/ConfigComponent";
import { Scene } from "../../../client/assets/Scripts/Core/Entity/Scene";
import { AEvent } from "../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { Tables as ServerTables } from "./Generate/Config/Types";
import * as fs from 'fs'
import { SceneType } from "../../../client/assets/Scripts/Core/Entity/SceneType";
import { Tables as ClientTables } from "../../../client/assets/Bundles/Code/Logic/Game/Generate/Config/Types";

@EventDecorator(LoadAllConfigBytes, SceneType.Process)
class LoadAllConfigBytesEventHandler extends AEvent<LoadAllConfigBytes>{
    protected async run(scene: Scene, args: LoadAllConfigBytes) {
        await ServerTables.init((resNameList: string[])=>{
            let dataMap: Map<string, any> = new Map

            for (const resName of resNameList) {
                let content = fs.readFileSync(`./configExport/${resName}.json`, 'utf8')

                dataMap.set(resName, JSON.parse(content))
            }

            return dataMap
        })

        await ClientTables.init((resNameList: string[])=>{
            let dataMap: Map<string, any> = new Map

            for (const resName of resNameList) {
                let content = fs.readFileSync(`./client/assets/Bundles/Config/${resName}.json`, 'utf8')

                dataMap.set(resName, JSON.parse(content))
            }

            return dataMap
        })
    }
}