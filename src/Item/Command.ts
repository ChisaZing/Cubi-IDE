import * as vscode from 'vscode';
import { CommandRegister,commandRegister } from '../Register/CommandRegister';

export class Command{
    private static register:CommandRegister = commandRegister;

    public callback:(...args:any[])=>void;

    constructor(id:string,callback:(...args:any[])=>void){
        this.callback = callback;
        Command.register.addToRegister(id,this);
    }

    
}