//@ts-nocheck
import * as ProtoParser from 'proto-parser';
import * as fs from 'fs'

export class Init {
    public static start() {
        this.generateTs("InnerMessage", 20002)
        this.generateTs("OuterMessage", 10002)
    }

    private static generateTs(fileName: string, startOpCode: number) {
        let readPath = `./config/proto/${fileName}.proto`
        let writePath = `./server/Logic/Game/Generate/Message/${fileName}.ts`

        if (fileName == "OuterMessage") {
            writePath = `./client/assets/Bundles/Code/Logic/Game/Generate/Message/${fileName}.ts`
        }

        let text = fs.readFileSync(readPath)
        let document = ProtoParser.parse(text.toString(), { alternateCommentMode: true })
        let map = document.root.nested.CT.nested
        let importContent = ''

        if (fileName == "OuterMessage") {
            importContent += `import protobufjs from 'protobufjs';
import { MessageDecorator } from '../../../../../../Scripts/Core/Network/MessageDecorator';
import { ResponseTypeDecorator } from '../../../Module/Message/ResponseTypeDecorator';
import { MessageType } from '../../../../../../Scripts/Core/Network/MessageType';
const { Message, Field } = protobufjs;`
        } else {
            importContent += `import protobufjs from 'protobufjs';
import { ResponseTypeDecorator } from '../../../../../client/assets/Bundles/Code/Logic/Module/Message/ResponseTypeDecorator';
import { MessageDecorator } from '../../../../../client/assets/Scripts/Core/Network/MessageDecorator';
import { MessageType } from '../../../../../client/assets/Scripts/Core/Network/MessageType';
const { Message, Field } = protobufjs;`
        }

        let content = importContent;
        let codeContent = `export class ${fileName} {`
        let classContent = ``

        for (const key in map) {
            let element = map[key];
            let classStr = this.generateClass(element, fileName);

            classContent += `\n\n${classStr}`

            codeContent += `\n\tpublic static readonly ${element.name} = ${startOpCode++}`
        }

        codeContent += "\n}"

        content += `\n\n\n${codeContent}`
        content += `\n${classContent}`

        fs.writeFileSync(writePath, content)
    }

    private static generateClass(obj: any, fileName: string): string {
        let content = ""
        let responseType = null
        let messageType = null

        if (obj.comment) {
            let commentList: Array<string> = obj.comment.split('\n')
            content += `/**\n`

            for (const str of commentList) {
                if (str.startsWith("ResponseType ")) {
                    responseType = str.substring("ResponseType ".length)
                } else if (str.startsWith("MessageType ")) {
                    messageType = str.substring("MessageType ".length)
                }

                content += ` * ${str}\n`
            }

            content += ` */\n`
        }

        if (!messageType) {
            messageType = "IMessage"
        }

        let messageTypeFields = ""
        let offset = 0

        if (messageType == "IRequest" || messageType == "IActorRequest" || messageType == "IActorLocationRequest") {
            messageTypeFields += `\n\t@Field.d(2, "int32", "required")`
            messageTypeFields += `\n\tpublic RpcId: number`
            offset = 1
        } else if (messageType == "IResponse" || messageType == "IActorResponse" || messageType == "IActorLocationResponse") {
            messageTypeFields += `\n\t@Field.d(2, "int32", "required")`
            messageTypeFields += `\n\tpublic RpcId: number`
            messageTypeFields += `\n\t@Field.d(3, "int32", "optional")`
            messageTypeFields += `\n\tpublic Error: number`
            messageTypeFields += `\n\t@Field.d(4, "string", "optional")`
            messageTypeFields += `\n\tpublic Message: string`
            offset = 3
        }

        content += `@MessageDecorator(${fileName}.${obj.name}, MessageType.${messageType})\n`

        if (responseType) {
            content += `@ResponseTypeDecorator(${responseType})\n`
        }

        content += `export class ${obj.name} extends Message<${obj.name}> {\n`

        // 生成操作码
        content += `\tpublic messageType: MessageType`
        content += `\n\t@Field.d(1, "uint32", "required")`
        content += `\n\tpublic readonly opcode = ${fileName}.${obj.name}`
        content += `${messageTypeFields}`

        let fields = obj.fields

        for (const key in fields) {
            let element = fields[key];

            content += `\t${this.getFieldStr(element, offset)}\n`
            content += `\tpublic ${element.name}: ${this.getFieldTypeStr(element)}\n`
        }

        content += `\n}`

        return content
    }

    private static getFieldStr(obj: any, offset: number): string {
        let content = `@Field.d(${obj.id + 1 + offset}`
        let typeStr: string

        switch (obj.type.value) {
            case "double":
            case "float":
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
            case "string":
            case "bool":
            case "bytes":
                typeStr = `"${obj.type.value}"`
                break
            default:
                typeStr = obj.type.value
        }

        content += `, ${typeStr}`

        if (obj.repeated) {
            content += `, "repeated"`
        } else if (obj.required) {
            content += `, "required"`
        } else if (obj.optional) {
            content += `, "optional"`
        }

        content += `)`

        return content

    }

    private static getFieldTypeStr(obj: any): string {
        let content: string
        let typeStr: string

        switch (obj.type.value) {
            case "double":
            case "float":
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                typeStr = "number"
                break
            case "string":
                typeStr = "string"
                break
            case "bool":
                typeStr = "boolean"
                break
            case "bytes":
                typeStr = "Uint8Array"
                break
            default:
                typeStr = `${obj.type.value}`
                break
        }

        content = typeStr

        if (obj.repeated) {
            content += "[]"
        }

        return content
    }
}