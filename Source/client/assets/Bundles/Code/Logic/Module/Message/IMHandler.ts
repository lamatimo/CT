import { Session } from "./Session";

export interface IMHandler {
    Handle(session: Session, message: any, responseCtor: any): void;
}