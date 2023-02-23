import { EntryEvent } from "../../../client/assets/Bundles/Code/Logic/Game/EventType/EventTypes";
import { Scene } from "../../../client/assets/Scripts/Core/Entity/Scene";
import { AEvent } from "../../../client/assets/Scripts/Core/EventSystem/AEvent";
import { EventDecorator } from "../../../client/assets/Scripts/Core/EventSystem/EventDecorator";
import { ctLog } from "../../../client/assets/Scripts/Core/Log/Logger";

import { Field, Message, OneOf, Type } from "protobufjs"
import { Person } from "./Generate/Message/person";

export class AwesomeSubMessage extends Message<AwesomeSubMessage> {

    @Field.d(1, "string")
    public awesomeString: string;

}

export enum AwesomeEnum {
    ONE = 1,
    TWO = 2
}

@Type.d("SuperAwesomeMessage")
export class AwesomeMessage extends Message<AwesomeMessage> {

    @Field.d(1, "string", "optional", "awesome default string")
    public awesomeField: string;

    @Field.d(2, AwesomeSubMessage)
    public awesomeSubMessage: AwesomeSubMessage;

    @Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE)
    public awesomeEnum: AwesomeEnum;

    @OneOf.d("awesomeSubMessage", "awesomeEnum")
    public which: string;

}

@EventDecorator(EntryEvent)
class EntryEvent_InitServer extends AEvent<EntryEvent>{
    protected async run(scene: Scene, args: EntryEvent) {

        let message = new AwesomeMessage({ awesomeField: "hello" });
        let buffer = AwesomeMessage.encode(message).finish();
        let decoded = AwesomeMessage.decode(buffer);

        ctLog(buffer)
        ctLog(decoded)

        let p = Person.encode({name: "liming", age: 15}).finish()
        let q = Person.decode(p)

        ctLog(p)
        ctLog(q)

    }
}