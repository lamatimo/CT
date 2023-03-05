import { ChildProcess, exec } from "child_process";
import { Options } from "../../../../client/assets/Scripts/Core/Options/Options";

export class WatcherHelper {
    public static StartProcess(processId: number): ChildProcess {
        let cmd = `node dist/server/App/Program.js --apptype=Server --process=${processId} --develop=${Options.inst.develop}, --loglevel=${Options.inst.logLevel}`

        // 在当前目录下的scripts文件夹里执行hexo g命令
        let childProcess = exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`stdout: ${stdout}`);
        });

        return childProcess;
    }
}