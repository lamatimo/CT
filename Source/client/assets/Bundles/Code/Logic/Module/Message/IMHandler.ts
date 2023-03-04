import { Session } from "./Session";

export interface IMHandler {
    Handle(session: Session, message: any): void;
    GetMessageType(): any;
    GetResponseType(): any;
}