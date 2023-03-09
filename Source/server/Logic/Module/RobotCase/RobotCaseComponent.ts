import { Entity } from "../../../../client/assets/Scripts/Core/Entity/Entity";
import { RobotCase } from "./RobotCase";

export class RobotCaseComponent extends Entity {
    public static inst: RobotCaseComponent;
    public RobotCases: Map<number, RobotCase> = new Map();
    public N = 10000;

    awake() {
        RobotCaseComponent.inst = this
    }

    destroy(): void {
        RobotCaseComponent.inst = null
    }

    public GetN() {
        return ++this.N;
    }

    public async New(): Promise<RobotCase> {
        let robotCase = this.addChild(RobotCase);
        return robotCase;
    }
}