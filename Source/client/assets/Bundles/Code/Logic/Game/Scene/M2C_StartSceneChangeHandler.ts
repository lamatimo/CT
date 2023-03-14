import { SceneType } from "../../../../../Scripts/Core/Entity/SceneType";
import { ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { AMHandler } from "../../Module/Message/AMHandler";
import { MessageHandlerDecorator } from "../../Module/Message/MessageHandlerDecorator";
import { Session } from "../../Module/Message/Session";
import { M2C_StartSceneChange } from "../Generate/Message/OuterMessage";

@MessageHandlerDecorator(M2C_StartSceneChange, SceneType.Client)
export class M2C_StartSceneChangeHandler extends AMHandler<M2C_StartSceneChange>
{
    protected async run(session: Session, args: M2C_StartSceneChange) {
        ctLog(`收到了消息，我该怎么办呢`)
        // await SceneChangeHelper.SceneChangeTo(session.ClientScene(), message.SceneName, message.SceneInstanceId);
    }
}