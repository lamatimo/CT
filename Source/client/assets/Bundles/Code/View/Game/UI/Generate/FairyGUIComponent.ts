import { Entity } from "../../../../../../Scripts/Core/Entity/Entity";
import {InitCommonUI} from "./Common/InitCommonUI";
import {InitLoginUI} from "./Login/InitLoginUI";
// importflag
export class FairyGUIComponent extends Entity {
    awake(): void {
		InitCommonUI();
		InitLoginUI();
// bindFlag
        this.dispose()
    }
}