import { GComponent } from "fairygui-cc"
import { WindowBase } from "../../../../../../Scripts/Loader/UI/WindowBase"
import { WindowComponent } from "../../../../../../Scripts/Loader/UI/WindowComponent"
import UI_Login_LoginWin from "../Generate/Login/UI_Login_LoginWin"

export class LoginWin extends WindowBase {
    private uiNode: UI_Login_LoginWin

    public async loadResAsync() {
        await WindowComponent.inst.loadPackageAsync("Login")
    }

    protected loadUI(): GComponent {
        this.uiNode = UI_Login_LoginWin.create()

        return this.uiNode
    }

    protected async onLoadAsync() {
    }

    protected async onShownAsync() {

    }

    protected async onHideAsync() {

    }

    protected async onDisposeAsync() {

    }
}