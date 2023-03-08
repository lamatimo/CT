import { GComponent } from "fairygui-cc"
import { AsyncButtonListener } from "../../../../../../Scripts/Loader/UI/AsyncButtonListener"
import { WindowBase } from "../../../../../../Scripts/Loader/UI/WindowBase"
import { WindowComponent } from "../../../../../../Scripts/Loader/UI/WindowComponent"
import { LoginHelper } from "../../../../Logic/Game/Login/LoginHelper"
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
        let listener = new AsyncButtonListener(async () => {
            LoginHelper.Login(
                this.clientScene(),
                this.uiNode.Account.text,
                this.uiNode.password.text)
        })

        this.uiNode.LoginBtn.onClick(listener.invoke, listener)
    }

    protected async onShownAsync() {

    }

    protected async onHideAsync() {

    }

    protected async onDisposeAsync() {

    }
}