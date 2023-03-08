import pb from 'protobufjs'
import { ctError } from '../../../../../Scripts/Core/Log/Logger';
import { IMHandler } from './IMHandler';
import { Session } from './Session';

export abstract class AMHandler<A> implements IMHandler{
    GetMessageType() {
    }
    GetResponseType() {
        throw new Error('Method not implemented.');
    }
    protected abstract run(session: Session, args: A);

    public Handle(session: Session, msg: A)
    {

        if (session.isDisposed)
        {
            ctError(`session disconnect ${msg}`);
            return;
        }

        this.run(session, msg)
    }
}