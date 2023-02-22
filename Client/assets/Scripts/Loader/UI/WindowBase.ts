import { Event, GComponent, GRoot, RelationType, Window } from "fairygui-cc";
import { Scene } from "../../Core/Entity/Scene";

export abstract class WindowBase extends Window {
    public static clientScene: Scene

    protected clientScene(): Scene {
        return WindowBase.clientScene
    }

    protected onInit(): void {
        this.onInitAsync()
    }

    private async onInitAsync() {
        let view = this.loadUI()

        view.setSize(GRoot.inst.width, GRoot.inst.height);
        view.addRelation(GRoot.inst, RelationType.Size);

        this.contentPane = view;

        this.center()

        this.onLoadAsync()
    }

    protected doShowAnimation(): void {
        this.doShowAnimationAsync()
    }

    protected async doShowAnimationAsync() {
        this.onShown()
    }

    protected doHideAnimation(): void {
        this.doHideAnimationAsync();
    }

    protected async doHideAnimationAsync() {
        this.hideImmediately()
    }

    protected onShown(): void {
        this.onShownAsync()
    }


    protected onHide(): void {
        this.onHideAsync()
    }

    protected closeEventHandler(evt: Event): void {
        this.hide()
    }


    public dispose(): void {
        super.dispose();
        this.onDisposeAsync();
    }

    public abstract loadResAsync(): Promise<void>;
    protected abstract loadUI(): GComponent;
    protected abstract onLoadAsync(): void;
    protected abstract onShownAsync(): void;
    protected abstract onHideAsync(): void;
    protected abstract onDisposeAsync(): void;
}
