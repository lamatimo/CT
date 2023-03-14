//@ts-nocheck
import * as ProtoParser from 'proto-parser';
import * as fs from 'fs'

interface protoTypeInfo {
    isCustomType: boolean,
    wireType: number,
    tsType: string
    encode: string
    decode: string
}

const protoTypeMap: Map<string, protoTypeInfo> = new Map([
    ['int32', { isCustomType: false, wireType: 0, tsType: 'number' }],
    ['uint32', { isCustomType: false, wireType: 0, tsType: 'number' }],
    ['int64', { isCustomType: false, wireType: 0, tsType: 'number' }],
    ['uint64', { isCustomType: false, wireType: 0, tsType: 'number' }],
    ['bool', { isCustomType: false, wireType: 0, tsType: 'boolean' }],
    ['double', { isCustomType: false, wireType: 1, tsType: 'number' }],
    ['string', { isCustomType: false, wireType: 2, tsType: 'string' }],
    ['bytes', { isCustomType: false, wireType: 2, tsType: 'Uint8Array' }],
    ['float', { isCustomType: false, wireType: 5, tsType: 'number' }],
    ['Vec3', { isCustomType: true, wireType: 2, tsType: 'Vec3', encode: 'MessageParseHelper.encodeVec3', decode: 'MessageParseHelper.docodeVec3' }],
])

class MessageInfo {
    responseType: MessageInfo
    responseTypeName: MessageInfo
    msgName: string
    msgType: string
    comment: string[] = []
    parseObj: any
    fieldInfos: FieldInfo[] = []
    mapFields: MessageInfo[] = []
    isDepend: boolean = false

    constructor(obj: any) {
        this.msgName = obj.name
        this.parseObj = obj

        if (obj.isDepend) {
            this.isDepend = true
        }

        this.parseComment(obj)

        // 插入rpcid等信息
        let messageType = this.msgType
        if (messageType == "IRequest" || messageType == "IActorRequest" || messageType == "IActorLocationRequest") {
            obj.fields.RpcId = { name: 'RpcId', type: { value: 'uint32' } }
        } else if (messageType == "IResponse" || messageType == "IActorResponse" || messageType == "IActorLocationResponse") {
            obj.fields.RpcId = { name: 'RpcId', type: { value: 'uint32' } }
            obj.fields.Error = { name: 'Error', type: { value: 'uint32' }, required: true }
            obj.fields.Message = { name: 'Message', type: { value: 'string' } }
        }

        // 前面两个留个opcode和actorid
        let idStart = 3

        for (const key in obj.fields) {
            let field = obj.fields[key];
            let fieldInfo = new FieldInfo(field, idStart++)

            this.fieldInfos.push(fieldInfo)
        }
    }

    private parseComment(element: any) {
        if (this.isDepend) {
            return
        }

        let comment: string = element.comment

        this.msgType = 'IMessage'

        if (!comment) {
            return
        }

        let commentList = comment.split('\n')
        const responsePrefix = "ResponseType "
        const typePrefix = "MessageType "

        for (const str of commentList) {
            if (str.startsWith(responsePrefix)) {
                this.responseTypeName = str.substring(responsePrefix.length)
            } else if (str.startsWith(typePrefix)) {
                this.msgType = str.substring(typePrefix.length)
            }

            this.comment.push(str)
        }

    }
}


class FieldInfo {
    isCustomType: boolean
    protoType: string
    tsType: string
    typeStr: string
    isArray: boolean
    isMap: boolean
    fieldName: string
    id: number
    comment: string
    wireType: number
    defaultValue: string
    mapKeytypeStr: string
    mapValuetypeStr: string

    constructor(obj: any, id: number) {
        let info = protoTypeMap.get(obj.type.value)
        let messageInfo = Init.MsgMap.get(obj.type.value)
        // 类型是其他消息
        if (messageInfo) {
            info = { tsType: messageInfo.msgName, isCustomType: false, wireType: 2 }
        }

        if (!info) {
            console.error(`类型${obj.type.value}没有配置`)
        }

        if (obj.map) {
            this.isMap = true

            this.mapKeytypeStr = protoTypeMap.get(obj.keyType.value).tsType

            let v2 = protoTypeMap.get(obj.type.value2)

            if (v2) {
                this.mapValuetypeStr = v2.tsType
            } else {
                this.mapValuetypeStr = obj.type.value2
            }
        }

        this.protoType = obj.type.value
        this.isCustomType = info.isCustomType
        this.tsType = info.tsType
        this.isArray = obj.repeated
        this.fieldName = obj.name
        this.id = id
        this.comment = obj.comment

        if (this.isArray) {
            this.wireType = 2
        } else {
            this.wireType = info.wireType
        }

        this.typeStr = this.getTypeStr()
        this.defaultValue = this.getDefaultValue(obj)
    }

    private getTypeStr() {
        if (this.isArray) {
            return `${this.tsType}[]`
        } else {
            return `${this.tsType}`
        }
    }

    private getDefaultValue(field): string {
        if (!field.required) {
            return
        }

        let typeStr = field.type.value

        if (field.repeated) {
            return `[]`
        } {
        }

        switch (typeStr) {
            case 'int32':
            case 'uint32':
            case 'int64':
            case 'uint64':
            case 'float':
            case 'double':
                return '0'
            case 'string':
                return ''
            default:
                break;
        }
    }

    public encodeStr(): string {
        let info = protoTypeMap.get(this.protoType)
        let content = ''
        let tag = this.id << 3 | this.wireType
        let messageInfo = Init.MsgMap.get(this.protoType)

        if (this.isCustomType) {
            if (this.isArray) {
                content += `\t\tif(this.${this.fieldName} && this.${this.fieldName}.length > 0){\n`
                content += `\t\t\tfor (const v of this.${this.fieldName}) {\n`
                content += `\t\t\t\tw.uint32(${tag}).fork()\n`
                content += `\t\t\t\t${info.encode}(w, v)\n`
                content += `\t\t\t\tw.ldelim()\n`
                content += `\t\t\t}\n`
                content += `\t\t}\n`
            } else {
                content += `\t\tif(this.${this.fieldName}){\n`
                content += `\t\t\tw.uint32(${tag}).fork()\n`
                content += `\t\t\t${info.encode}(w, this.${this.fieldName})\n`
                content += `\t\t\tw.ldelim()\n`
                content += `\t\t}\n`
            }
        } else {
            if (this.isMap) {
                content += `\t\tfor (const [k,v] of this.${this.fieldName}) {\n`
                content += `\t\t\tlet obj = new ${this.tsType}({key: k, value: v})\n`
                content += `\t\t\tw.uint32(${tag}).fork()\n`
                content += `\t\t\tobj.innerEncode()\n`
                content += `\t\t\tw.ldelim()\n`
                content += `\t\t}\n`
            }
            else if (this.isArray) {
                if (messageInfo) {
                    content += `\t\tif(this.${this.fieldName} && this.${this.fieldName}.length > 0){\n`
                    content += `\t\t\tfor (const v of this.${this.fieldName}) {\n`
                    content += `\t\t\t\tw.uint32(${tag}).fork()\n`
                    content += `\t\t\t\tv.innerEncode()\n`
                    content += `\t\t\t\tw.ldelim()\n`
                    content += `\t\t\t}\n`
                    content += `\t\t}\n`
                } else {
                    content += `\t\tif(this.${this.fieldName} && this.${this.fieldName}.length > 0){\n`
                    content += `\t\t\tfor (const v of this.${this.fieldName}) {\n`
                    content += `\t\t\t\tw.uint32(${tag}).${this.protoType}(v)\n`
                    content += `\t\t\t}\n`
                    content += `\t\t}\n`
                }
            } else {
                if (messageInfo) {
                    content += `\t\tif(this.${this.fieldName}){\n`
                    content += `\t\t\tw.uint32(${tag}).fork()\n`
                    content += `\t\t\tthis.${this.fieldName}.innerEncode()\n`
                    content += `\t\t\tw.ldelim()\n`
                    content += `\t\t}\n`
                } else {
                    content += `\t\tif(this.${this.fieldName}){\n`
                    content += `\t\t\tw.uint32(${tag}).${this.protoType}(this.${this.fieldName})\n`
                    content += `\t\t}\n`
                }
            }
        }

        return content
    }

    public decodeStr(): string {
        let info = protoTypeMap.get(this.protoType)
        let content = ''
        let tag = this.id << 3 | this.wireType
        let messageInfo = Init.MsgMap.get(this.protoType)

        if (this.isCustomType) {
            if (this.isArray) {
                content += `\t\t\t\t\tthis.${this.fieldName}.push(${info.decode}(r, r.uint32()))\n`

            } else {
                content += `\t\t\t\t\tthis.${this.fieldName} = ${info.decode}(r, r.uint32())\n`
            }
        } else {
            if (this.isMap) {
                content += `\t\t\t\t\tlet msg_${this.tsType} = new ${this.tsType}()\n`
                content += `\t\t\t\t\tmsg_${this.tsType}.decode(bytes, r.uint32())\n`
                content += `\t\t\t\t\tthis.${this.fieldName}.set(msg_${this.tsType}.key, msg_${this.tsType}.value)\n`
            }
            else if (this.isArray) {
                if (messageInfo) {
                    content += `\t\t\t\t\tlet msg_${this.protoType} = new ${this.protoType}()\n`
                    content += `\t\t\t\t\tmsg_${this.protoType}.decode(bytes, r.uint32())\n`
                    content += `\t\t\t\t\tthis.${this.fieldName}.push(msg_${this.protoType})\n`
                } else {
                    content += `\t\t\t\t\tthis.${this.fieldName}.push(r.${this.protoType}())\n`
                }
            } else {
                if (messageInfo) {
                    content += `\t\t\t\t\tlet msg_${this.protoType} = new ${this.protoType}()\n`
                    content += `\t\t\t\t\tmsg_${this.protoType}.decode(bytes, r.uint32())\n`
                    content += `\t\t\t\t\tthis.${this.fieldName} = msg_${this.protoType}\n`
                }
                else if (this.protoType == "int64" || this.protoType == "uint64") {
                    content += `\t\t\t\t\tthis.${this.fieldName} = (r.${this.protoType}() as Long).toNumber()\n`
                } else {
                    content += `\t\t\t\t\tthis.${this.fieldName} = r.${this.protoType}()\n`
                }
            }
        }

        return content
    }
}

export class Init {
    public static MsgMap: Map<string, MessageInfo> = new Map
    private static MsgList: MessageInfo[] = []
    private static MsgIteratorMap: Map<string, MessageInfo> = new Map
    private static namespace: string
    private static startOpcode: number

    public static start() {
        this.generateInner()
        this.generateOuter()
    }

    private static generateInner() {
        let writePath = `./server/Logic/Game/Generate/Message/InnerMessage.ts`
        let readPath = `./config/proto/InnerMessage.proto`
        let templatePath = `./tool/Proto2Ts/InnerMessageTemplate.txt`

        this.namespace = 'InnerMessage'
        this.startOpcode = 20002

        this.generate(writePath, readPath, templatePath)
    }

    private static generateOuter() {
        let writePath = `./client/assets/Bundles/Code/Logic/Game/Generate/Message/OuterMessage.ts`
        let readPath = `./config/proto/OuterMessage.proto`
        let templatePath = `./tool/Proto2Ts/OuterMessageTemplate.txt`

        this.namespace = 'OuterMessage'
        this.startOpcode = 10002

        this.generate(writePath, readPath, templatePath)
    }

    private static generate(writePath: string, readPath: string, templatePath: string) {
        this.MsgList = []
        this.MsgIteratorMap.clear()

        let text = fs.readFileSync(readPath)
        let document = ProtoParser.parse(text.toString(), { alternateCommentMode: true, resolve: false })
        let content = fs.readFileSync(templatePath, 'utf8')

        if (document.error) {
            console.log(document.error)
            return
        }

        let map = document.root.nested.CT.nested
        let keys = Object.keys(map)

        // 所有的map类型数据转换成单个对象
        for (const k of keys) {
            let v = map[k];
            v.dependTypes = []

            for (let kk in v.fields) {
                let vv = v.fields[kk]

                if (vv.map) {
                    let newTypeKey = `${v.name}_KV${vv.name}`
                    let newTypeValue = {
                        name: newTypeKey,
                        isDepend: true,
                        fields: {
                            key: {
                                name: 'key',
                                type: {
                                    value: vv.keyType.value,
                                }
                            },
                            value: {
                                name: 'value',
                                type: {
                                    value: vv.type.value,
                                }
                            },
                        }
                    }

                    vv.type.value2 = vv.type.value
                    vv.type.value = newTypeKey

                    v.dependTypes.push(newTypeValue)
                }
            }
        }

        for (const key in map) {
            let element = map[key];

            for (const dependType of element.dependTypes) {
                let msg2 = new MessageInfo(dependType)

                this.MsgIteratorMap.set(msg2.msgName, msg2)
                this.MsgMap.set(msg2.msgName, msg2)
                this.MsgList.push(msg2)
            }

            let msg = new MessageInfo(element)

            this.MsgIteratorMap.set(msg.msgName, msg)
            this.MsgMap.set(msg.msgName, msg)
            this.MsgList.push(msg)
        }

        for (let msg of this.MsgList) {
            if (!msg.responseTypeName) {
                continue
            }

            let response = this.MsgIteratorMap.get(msg.responseTypeName)

            msg.responseType = response

            this.MsgIteratorMap.delete(msg.responseTypeName)
        }

        let opcodeStr = this.generateOpcode()
        content = content.replace('//**opcode**', opcodeStr)

        let classStr = this.generateClass()
        content = content.replace('//**class**', classStr)

        fs.writeFileSync(writePath, content)
    }

    private static generateOpcode(): string {
        let content = `export class ${this.namespace} {\n`
        let count = 0;

        for (let msg of this.MsgList) {
            content += `\tpublic static readonly ${msg.msgName} = ${count++ + this.startOpcode}\n`
        }

        content += `}\n`

        return content
    }

    private static generateClass(): string {
        let content = ''

        for (let [_, msg] of this.MsgIteratorMap) {
            if (msg.responseType) {
                content += this.generateSingleClass(msg.responseType)
            }
            content += this.generateSingleClass(msg)
        }

        return content
    }

    private static generateSingleClass(msg: MessageInfo): string {
        let content = `/**\n`

        for (let comment of msg.comment) {
            content += ` * ${comment}\n`
        }

        content += ` */\n`

        if (!msg.isDepend && msg.responseType) {
            content += `@ResponseTypeDecorator(${msg.responseTypeName})\n`
        }

        if (!msg.isDepend) {
            content += `@MessageDecorator(${this.namespace}.${msg.msgName}, MessageType.${msg.msgType})\n`
        }

        content += `export class ${msg.msgName} extends Message {\n`

        if (!msg.isDepend) {
            content += `\tpublic opcode = ${this.namespace}.${msg.msgName}\n`
        }
        // 插入rpcid等信息
        let messageType = msg.msgType
        if (messageType == "IRequest" || messageType == "IActorRequest" || messageType == "IActorLocationRequest") {
            msg.parseObj.fields.RpcId = { name: 'RpcId', type: { value: 'uint32' } }
        } else if (messageType == "IResponse" || messageType == "IActorResponse" || messageType == "IActorLocationResponse") {
            msg.parseObj.fields.RpcId = { name: 'RpcId', type: { value: 'uint32' } }
            msg.parseObj.fields.Error = { name: 'Error', type: { value: 'uint32' }, required: true }
            msg.parseObj.fields.Message = { name: 'Message', type: { value: 'string' } }
        }

        for (let fieldInfo of msg.fieldInfos) {
            let defaultValue = fieldInfo.defaultValue

            if (fieldInfo.isMap) {
                content += `\tpublic ${fieldInfo.fieldName}: Map<${fieldInfo.mapKeytypeStr}, ${fieldInfo.mapValuetypeStr}> = new Map\n`
            }
            else if (!defaultValue) {
                content += `\tpublic ${fieldInfo.fieldName}: ${fieldInfo.typeStr}\n`
            } else {
                content += `\tpublic ${fieldInfo.fieldName}: ${fieldInfo.typeStr} = ${defaultValue}\n`
            }
        }

        content += `\tconstructor(args?: pb.Properties<${msg.msgName}>) {\n`
        content += `\t\tsuper()\n`
        content += `\t\tif(!args){\n`
        content += `\t\t\treturn\n`
        content += `\t\t}\n`

        for (let fieldInfo of msg.fieldInfos) {
            content += `\t\tif(args.${fieldInfo.fieldName}){\n`
            content += `\t\t\tthis.${fieldInfo.fieldName} = args.${fieldInfo.fieldName}\n`
            content += `\t\t}\n`
        }

        content += `\t}\n`

        content += `\tpublic encode(actorId?: number) {\n`
        if (!msg.isDepend) {
            content += `\t\tw.reset()\n`
            content += `\t\tw.uint32(8).uint32(this.opcode)\n`
            content += `\t\tif(actorId){\n`
            content += `\t\t\tw.uint32(16).uint64(actorId)\n`
            content += `\t\t}\n`
            content += `\t\tthis.innerEncode()\n`
        }

        content += `\t\treturn w.finish()\n`
        content += `\t}\n`

        content += `\tpublic innerEncode() {\n`

        for (let fieldInfo of msg.fieldInfos) {
            content += fieldInfo.encodeStr()
        }

        content += `\t}\n`
        content += `\n`

        content += `\tpublic decode(bytes: Uint8Array, length?: number) {\n`
        content += `\t\tif(!length){\n`
        content += `\t\t\tr.pos = 0\n`
        content += `\t\t\tr.buf = bytes\n`
        content += `\t\t\tr.len = bytes.length\n`
        content += `\t\t}\n`
        content += `\t\tlet end = length === undefined ? r.len : r.pos + length;\n`

        for (let fieldInfo of msg.fieldInfos) {
            if (fieldInfo.isArray) {
                content += `\t\tthis.${fieldInfo.fieldName} = []\n`
            } else if (fieldInfo.isMap) {
                content += `\t\tthis.${fieldInfo.fieldName}.clear()\n`
            }
        }

        content += `\t\twhile (r.pos < end) {\n`
        content += `\t\t\tconst tag = r.uint32()\n`
        content += `\t\t\tswitch (tag >>> 3) {\n`

        for (let fieldInfo of msg.fieldInfos) {

            content += `\t\t\t\tcase ${fieldInfo.id}:\n`
            content += fieldInfo.decodeStr()
            content += `\t\t\t\t\tbreak\n`
        }

        content += `\t\t\t\tdefault:\n`
        content += `\t\t\t\t\tr.skipType(tag & 7)\n`
        content += `\t\t\t\t\tbreak\n`
        content += `\t\t\t}\n`
        content += `\t\t}\n`
        content += `\t}\n`
        content += `}\n`

        return content
    }
}