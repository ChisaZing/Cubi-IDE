import * as vscode from 'vscode';
import { RegisterBase } from "./RegisterBase";

type TreeProvider = vscode.TreeDataProvider<vscode.TreeItem>;

class ProviderRegister extends RegisterBase<TreeProvider>{
    constructor(){
        super();
    }
    
    public registerAll():void{
        for(const [key,value] of this.items.entries()){
            this.push(vscode.window.registerTreeDataProvider(key,value));
        }
    }
}

export const providerRegister = new ProviderRegister();