import { Entity } from "./assets/Script/Core/Entity/Entity";
import { Singleton } from "./assets/Script/Core/Singleton/Singleton";

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
        lateUpdate(): void
        /**
         * 组件销毁调用
         */
        destroy(): void
    }
}

declare module "./assets/Script/Core/Singleton/Singleton"{
    interface Singleton{
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