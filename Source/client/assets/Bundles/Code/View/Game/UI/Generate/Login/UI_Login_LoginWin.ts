// This is an automatically generated class by FairyGUI. Please do not modify it. 

import { GComponent, GTextField, UIPackage, GButton, GTextInput } from "fairygui-cc";

export default class UI_Login_LoginWin extends GComponent {
	public static URL:string = "ui://t9puaifrt5v13";
	public Title: GTextField
	public Account: GTextInput
	public Title1: GTextField
	public Title2: GTextField
	public password: GTextInput
	public LoginBtn: GButton

	public static create():UI_Login_LoginWin {
		return <UI_Login_LoginWin>(UIPackage.createObject("Login", "LoginWin"));
	}

	protected onConstruct():void {
		this.Title = <GTextField>(this.getChildAt(1));
		this.Account = <GTextInput>(this.getChildAt(4));
		this.Title1 = <GTextField>(this.getChildAt(5));
		this.Title2 = <GTextField>(this.getChildAt(6));
		this.password = <GTextInput>(this.getChildAt(7));
		this.LoginBtn = <GButton>(this.getChildAt(8));
	}
}