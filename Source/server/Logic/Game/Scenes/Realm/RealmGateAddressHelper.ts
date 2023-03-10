import { RandomGenerator } from "../../../../../client/assets/Scripts/Core/Helper/RandomGenerator";
import { StartSceneConfig, Tables } from "../../Generate/Config/Types";

export class RealmGateAddressHelper {
    public static GetGate(zone: number): StartSceneConfig {
        let zoneGates = Tables.StartSceneConfigCategory.Gates.get(zone);

        let n = RandomGenerator.RandomInt(0, zoneGates.length - 1);

        return zoneGates[n];
    }
}