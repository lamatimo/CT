import { StartSceneConfig, Tables } from "../../Generate/Config/Types";

export class RealmGateAddressHelper {
    public static GetGate(account: string, zone: number): StartSceneConfig {
        let zoneGates = Tables.StartSceneConfigCategory.Gates.get(zone);
        let n = account.mode(zoneGates.length)

        return zoneGates[n];
    }
}