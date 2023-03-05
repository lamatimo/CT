import { EntryEvent } from "../../../client/assets/Bundles/Code/Logic/Game/EventType/EventTypes";
import { Scene } from "../../../client/assets/Scripts/Core/Entity/Scene";
import { AEvent } from "../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { ctLog } from "../../../client/assets/Scripts/Core/Log/Logger";
import { Message_TestInner8 } from "./Generate/Message/InnerMessage";
import { networkInterfaces } from "os"
import pb from 'protobufjs';
import Long from 'long';


@EventDecorator(EntryEvent)
class EntryEvent_InitServer extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {
        let ifaces = networkInterfaces()
        for (var dev in ifaces) {
            let iface = ifaces[dev]

            for (let i = 0; i < iface.length; i++) {
                let { family, address, internal } = iface[i]

                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                    ctLog(address)
                    break
                }
            }
        }


        let qa: Long = Long.fromInt(123465789)

        let message = new Message_TestInner8()

        message.RpcId = 1234
        // let message = new MoveInfo({RpcId: 99, TurnSpeed: 123});
        // message.Points = [];

        // // message.Points.push(new Vector3({x: 11, y: 22, z: 33}))
        // // message.Points.push(new Vector3({x: 66, y: 77, z: 88}))

        let writer = pb.Writer.create()
        let encodedMessage = Message_TestInner8.encode(message).finish()

        writer.uint32(13456)
        writer.bytes(encodedMessage)

        let sendBuffer = writer.finish()
        let reader: pb.Reader = new pb.Reader(sendBuffer)

        reader.buf = sendBuffer
        ctLog(reader.uint32())
        reader.pos = 0
        // writer.reset()
        writer.uint32(999)
        reader.buf = writer.finish()
        ctLog(reader.uint32())
        reader.pos = 0
        reader.buf = sendBuffer

        let decoded = Message_TestInner8.decode(reader);

        ctLog(sendBuffer)
        ctLog(decoded)
        // ctLog(decoded.RpcId)
    }
}