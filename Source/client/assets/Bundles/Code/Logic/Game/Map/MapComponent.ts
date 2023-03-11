import { Entity } from "../../../../../Scripts/Core/Entity/Entity";
import { Vec2 } from "../../Module/Math/vec2";

export class MapComponent extends Entity{
    public width: number
    public height: number
    private points: Vec2[][]
}