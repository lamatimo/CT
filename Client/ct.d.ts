import { Entity } from "./assets/Script/Core/Entity/Entity";

declare module "./assets/Script/Core/Entity/Entity"{
    interface Entity{
        /**
         * 组件添加后立即调用
         */
        awake(): void
        /**
         * 每帧调用
         */
        update(): void
        /**
         * 组件销毁调用
         */
        destroy(): void
    }
}