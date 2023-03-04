import { Singleton } from "./Singleton";

declare module "./Singleton" {
    interface Singleton {
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