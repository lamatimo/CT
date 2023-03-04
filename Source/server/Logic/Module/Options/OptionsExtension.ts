import { Options } from "../../../../client/assets/Scripts/Core/Options/Options";

Options.prototype.awake = function () {
    let self: Options = this

    process.argv.forEach((val, index) => {
        let vals = val.toLowerCase().split("=")
        let key = vals[0]

        if(key == '--apptype'){
            let apptype = parseInt(vals[1])

            self.appType = apptype

            return
        }

        if(key == '--loglevel'){
            let loglevel = parseInt(vals[1])

            self.logLevel = loglevel

            return
        }

        if(key == '--develop'){
            self.develop = vals[1] == "true"

            return
        }

        if(key == '--process'){
            let process = parseInt(vals[1])

            self.process = process

            return
        }
    });
}