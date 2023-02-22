// This is an automatically generated class by FairyGUI. Please do not modify it. 

import { GComponent, GTextField, UIPackage } from "fairygui-cc";

export default class UI_Login_LoginNoticeWin extends GComponent {
	public static URL:string = "ui://t9puaifrt5v14";
	public Title: GTextField

	public static create():UI_Login_LoginNoticeWin {
		return <UI_Login_LoginNoticeWin>(UIPackage.createObject("Login", "LoginNoticeWin"));
	}

	protected onConstruct():void {
		this.Title = <GTextField>(this.getChildAt(1));
	}
}