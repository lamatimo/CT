import { Entity } from "./Entity";
import { Scene } from "./Scene";

declare module "./Entity" {
    interface Entity {
        domainScene(): Scene;

        /**
         * 组件添加后立即调用
         */
        awake(): void
        /**
         * 每帧调用
         */
        update(): void
        lateUpdate(): void
        /**
         * 组件销毁调用
         */
        destroy(): void
    }
}

Entity.prototype.domainScene = function () {
    let self: Entity = this;

    return self.domain as Scene;
}