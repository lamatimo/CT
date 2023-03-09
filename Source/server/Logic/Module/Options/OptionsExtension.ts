import mri from "mri";
import { AppType, Options } from "../../../../client/assets/Scripts/Core/Options/Options";

Options.prototype.awake = function () {
    let self: Options = this

    let args = mri(process.argv.slice(2))

    for (const key in args) {
        let value = args[key]
        let keyL = key.toLowerCase()

        switch (keyL) {
            case "apptype":
                self.appType = AppType[value as string]
                break;
            case "loglevel":
                self.logLevel = value
                break;
            case "develop":
                self.develop = (value == "true")
                break;
            case "console":
                self.console = (value == "true")
                break;
            case "process":
                self.process = value
                break;
            default:
                break;
        }
    }

    console.log(self)
}