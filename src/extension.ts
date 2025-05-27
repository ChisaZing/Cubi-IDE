import * as vscode from 'vscode';
import { App } from './App';
import { openocdInit } from './user/openocd';
import { cmakeInit } from './user/cmake';
import { commandInit } from './user/command';


export let isCMakeExist:boolean = true;

export async function activate(context: vscode.ExtensionContext) {
	await checkIOC();

	const app = new App(context);

	await openocdInit();
	await cmakeInit();

	commandInit();

	app.run();
}

export function deactivate() {}

async function checkIOC(){
	const hasIoc = await vscode.workspace.findFiles('**/*.ioc');
	if (hasIoc.length > 0) {
	vscode.commands.executeCommand('setContext', 'iocFileExists', true);
	} else {
	vscode.commands.executeCommand('setContext', 'iocFileExists', false);
	}
}