import { LoginHelper } from "../../../../client/assets/Bundles/Code/Logic/Game/Login/LoginHelper";
import { SceneFactory } from "../../../../client/assets/Bundles/Code/Logic/Game/Scene/SceneFactory";
import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { Scene } from "../../../../client/assets/Scripts/Core/Entity/Scene";
import { ctError, ctLog } from "../../../../client/assets/Scripts/Core/Log/Logger";
import { CancellationToken } from "../../../../client/assets/Scripts/Core/Task/CancellationToken";
import { RobotCaseComponent } from "./RobotCaseComponent";

export class RobotCase extends Entity {
    public CancellationToken: CancellationToken;
    public CommandLine: string;

    // 创建机器人，生命周期是RobotCase
    public async CreateRobotWithNum(count: number, scenes: Array<Scene>) {
        let tasks = new Array;
        for (let i = 0; i < count; ++i) {
            tasks[i] = this.NewRobotToList(scenes);
        }

        await Promise.all(tasks);
    }

    private async NewRobotToList(scenes: Array<Scene>) {
        try {
            scenes.push(await this.NewRobot());
        }
        catch (e) {
            ctError(e);
        }
    }

    private async NewRobot(): Promise<Scene> {
        let id = this.getParent(RobotCaseComponent).GetN();
        let clientScene: Scene = null;

        try {
            clientScene = await SceneFactory.createClientScene(id, `Robot_${id}`);
            await LoginHelper.Login(clientScene, id.toString(), id.toString());
            ctLog(`create robot ok: ${id}`);
            return clientScene;
        }
        catch (e) {
            clientScene?.dispose();
            throw new Error(`RobotCase create robot fail, zone: ${id}, ${e}`);
        }
    }
}