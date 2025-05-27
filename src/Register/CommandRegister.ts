import * as vscode from 'vscode';
import { RegisterBase } from "./RegisterBase";
import { Command } from '../Item/Command';

export class CommandRegister extends RegisterBase<Command>{
    constructor(){
        super();
    }

    public registerAll(): void {
        for(const [key,value] of this.items.entries()){
            this.push(vscode.commands.registerCommand(key,value.callback));
        }
    }
}

export const commandRegister = new CommandRegister();