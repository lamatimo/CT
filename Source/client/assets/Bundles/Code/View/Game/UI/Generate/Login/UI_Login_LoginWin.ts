// This is an automatically generated class by FairyGUI. Please do not modify it. 

import { GComponent, GTextField, UIPackage } from "fairygui-cc";

export default class UI_Login_LoginWin extends GComponent {
	public static URL:string = "ui://t9puaifrt5v13";
	public Title: GTextField

	public static create():UI_Login_LoginWin {
		return <UI_Login_LoginWin>(UIPackage.createObject("Login", "LoginWin"));
	}

	protected onConstruct():void {
		this.Title = <GTextField>(this.getChildAt(1));
	}
}