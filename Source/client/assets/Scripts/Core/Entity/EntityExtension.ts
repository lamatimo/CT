import { Entity } from "./Entity";
import { Scene } from "./Scene";

declare module "./Entity" {
    interface Entity {
        domainZone(): number;
        domainScene(): Scene;
    }
}

Entity.prototype.domainZone = function () {
    let self: Entity = this;

    return (self.domain as Scene)?.zone ?? 0;
}

Entity.prototype.domainScene = function () {
    let self: Entity = this;

    return self.domain as Scene;
}