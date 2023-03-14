import { StartSceneConfig, Tables } from "../../Generate/Config/Types";

export class RealmGateAddressHelper {
    public static GetGate(account: string): StartSceneConfig {
        let zoneGates = Tables.StartSceneConfigCategory.Gates;
        let n = account.mode(zoneGates.length)

        return zoneGates[n];
    }
}