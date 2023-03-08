import { readdirSync, statSync, writeFile } from "fs";
import path from "path";

export class Init {
    private static tsFiles = []
    // 定义要遍历的目录
    private static dir = './';
    // 定义要新建的文件名
    private static file = './server/App/Import.ts';

    private static importIncludeDirs = [
        'client\\assets\\Bundles\\Code\\Logic',
        'client\\assets\\Scripts\\Core',
        'server\\Logic',
    ]

    private static walkExcludeDir = new Set([
        'node_modules',
        'tool',
        'server\\App',
        'dist',
        'config',
        'logs',
        'configExport',
        'client\\temp',
        'client\\node_modules',
        'client\\profiles',
        'client\\settings',
        'client\\local',
        'client\\library',
        'client\\FGUIProject',
        'client\\assets\\Scripts\\Loader',
        'client\\assets\\Scripts\\ThirdPart',
        'client\\assets\\Bundles\\Code\\View',
    ])

    public static start() {

        // 定义一个空数组来存储ts文件名

        // 定义一个递归函数来遍历目录


        // 调用walk函数遍历目录
        this.walk(this.dir);

        // 定义一个空字符串来存储引入语句
        let importStr = '// 不要手动添加 运行根目录脚本自动引入\n';

        // 遍历ts文件数组，生成引入语句并拼接到字符串中
        this.tsFiles.forEach(function (item) {
            importStr += `import '${item}';\n`;
        });

        // 使用fs.writeFile方法新建一个文件并写入引入语句字符串，如果有错误则打印错误信息，否则打印成功信息。
        writeFile(this.file, importStr,  (err) =>{
            if (err) {
                console.error(err);
            } else {
                console.log('成功创建' + this.file + '并写入' + this.tsFiles.length + '个引入语句。');
            }
        });
    }

    private static walk(dir) {
        // 读取目录下的所有文件和子目录
        let files = readdirSync(dir);
        // 遍历每个文件或子目录
        files.forEach((item) => {
            // 获取当前文件或子目录的绝对路径
            let filePath = path.join(dir, item);
            // 获取当前文件或子目录的状态信息
            let stat = statSync(filePath);
            // 判断是否是文件夹
            if (stat.isDirectory()) {
                
                if(!this.walkExcludeDir.has(filePath)){
                    // console.log(filePath)
                    // 如果是文件夹，继续递归遍历
                    this.walk(filePath);
                }
            } else {
                // 如果是文件，判断是否是ts文件
                if (path.extname(filePath) === '.ts') {
                    let isNeedImport =false

                    for (const importIncludeDir of this.importIncludeDirs) {
                        if(filePath.startsWith(importIncludeDir)){
                            isNeedImport = true
                            break
                        }
                    }
                    if(isNeedImport){
                        // 如果是ts文件，将其相对路径添加到数组中
                        filePath = this.handlePath(filePath)
                        this.tsFiles.push(filePath);
                    }
                }
            }
        });
    }

    private static handlePath(filePath: string){
        filePath = path.relative('.', filePath)
        filePath = filePath.replaceAll(`\\`, '/')

        if(filePath.startsWith('client/assets')){
            filePath = filePath.replace('client/assets', '../../client/assets')
        }
        else if(filePath.startsWith('server/Logic')){
            filePath = filePath.replace('server/Logic', '../Logic')
        }

        filePath = filePath.substring(0, filePath.length - 3)

        return filePath
    }
}