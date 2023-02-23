import { ILog } from '../../client/assets/Scripts/Core/Log/ILog';
import * as fs from 'fs';


export class WinstonLogger implements ILog {
    log(...data: any[]): void {
        let filepath = process.cwd() + '/log.txt';
        console.log(__dirname);
        console.log(process.cwd());
        console.log(filepath);
        // const stream = fs.createWriteStream(filepath, { flags: 'a' }); // 打开文件并追加写入
        const message = data.join(' ');

        fs.writeFile(filepath, "测试内容", (err) => {
            if (err) throw err;
            console.log('文件已保存');
        });

        // stream.write(message + '\n',(err)=>{
        //     console.log("写入结果")
        //     console.log(err)
        //     stream.end(()=>{
        //         console.log("关闭结果")
        //     }); // 结束写入操作
        // }); // 写入数据
        // console.log(message);
    }

    warn(...data: any[]): void {
        const message = data.join(' ');
        console.warn(message);
    }
    error(...data: any[]): void {
        const message = data.join(' ');
        console.error(message);
    }
}