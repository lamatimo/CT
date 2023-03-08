import { ctError } from "../../client/assets/Scripts/Core/Log/Logger";
import { AppType, Options } from "../../client/assets/Scripts/Core/Options/Options";
import { Game } from "../../client/assets/Scripts/Core/Singleton/Game";
import { Init as ServerInit } from "../Loader/Init";
import { Init as Proto2TsInit } from "../../tool/Proto2Ts/Init";
import { Init as TsImportInit } from "../../tool/TsImport/Init";
import "./Import"

async function main() {
    Game.addSingleton(Options)

    if (Options.inst.appType == AppType.Proto2Ts) {
        Proto2TsInit.start()
        return
    }else if(Options.inst.appType == AppType.TsImport){
        TsImportInit.start()
        return
    }

    ServerInit.start();

    setInterval(() => {
        try {
            ServerInit.update();
            ServerInit.lateUpdate();
        }
        catch (e) {
            ctError(e);
        }
    }, 1)
}

main();