import * as vscode from 'vscode';
import { CubiItem } from "./CubiItem";
import { openOCDProvider } from "../Provider/OpenOCDProvider";

export class OpenOCDItem extends CubiItem{
    constructor(label:string|undefined,parent?:CubiItem){
        super(label);
        if(parent){
            parent.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            parent.addToChildren(this);
        }else{
            openOCDProvider.addToRoots(this);
        }
    }
}