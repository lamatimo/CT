import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { MailboxType } from "./MailboxType";

export class MailBoxComponent extends Entity {
    public MailboxType: MailboxType

    awake(): void {
        this.MailboxType = MailboxType.MessageDispatcher;
    }

    init(mailboxType: MailboxType) {
        this.MailboxType = mailboxType;
    }
}