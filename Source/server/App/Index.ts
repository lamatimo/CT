import { ctError } from "../../client/assets/Scripts/Core/Log/Logger";
import { Init } from "../Loader/Init";

async function main() {
    Init.start();

    setInterval(() => {
        try {
            Init.update();
            Init.lateUpdate();
        }
        catch (e) {
            ctError(e);
        }
    }, 1)
}

main();