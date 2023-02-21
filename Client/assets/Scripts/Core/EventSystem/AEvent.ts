import { Scene } from "../Entity/Scene";
import { Logger } from "../Log/Logger";

export abstract class AEvent<A>{
    protected abstract run(scene: Scene, args: A);

    public async handle(scene: Scene, a: A)
    {
        try
        {
            await this.run(scene, a);
        }
        catch (e)
        {
            Logger.inst.error(e)
        }
    }
}