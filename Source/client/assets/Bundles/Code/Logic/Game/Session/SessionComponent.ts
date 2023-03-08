import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Session } from "../../Module/Message/Session";

export class SessionComponent extends Entity{
    public Session: Session

    destroy(): void {
        this.Session.dispose()
    }
}