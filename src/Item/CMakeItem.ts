import * as vscode from 'vscode';
import { CubiItem } from "./CubiItem";
import { cmakeProvider } from '../Provider/CMakeProvider';

export class CMakeItem extends CubiItem{
    constructor(label:string|undefined,parent?:CubiItem){
        super(label);
        if(parent){
            parent.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            parent.addToChildren(this);
        }else{
            cmakeProvider.addToRoots(this);
        }
    }
}