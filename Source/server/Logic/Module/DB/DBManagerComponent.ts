import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { IdGenerater } from "../../../../client/assets/Scripts/Core/IdGenerater/IdGenerater";
import { Options } from "../../../../client/assets/Scripts/Core/Options/Options";
import { Tables } from "../../Game/Generate/Config/Types";
import { DBComponent } from "./DBComponent";

export class DBManagerComponent extends Entity {
    public static inst: DBManagerComponent
    public DBComponents: DBComponent[] = new Array(IdGenerater.MaxZone);

    awake(): void {
        DBManagerComponent.inst = this
    }

    destroy(): void {
        DBManagerComponent.inst = null
    }

    public async GetZoneDB(): Promise<DBComponent> {
        let zone = Options.inst.zone
        let dbComponent = this.DBComponents[zone];

        if (dbComponent != null) {
            return dbComponent;
        }

        let startZoneConfig = Tables.StartZoneConfigCategory.get(zone);
        if (startZoneConfig.DBConnection == "") {
            throw new Error(`zone: ${zone} not found mongo connect string`);
        }

        dbComponent = await this.addChild(DBComponent).init(startZoneConfig.DBConnection, startZoneConfig.DBName)
        this.DBComponents[zone] = dbComponent;
        return dbComponent;
    }
}