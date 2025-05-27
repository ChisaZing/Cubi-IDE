import * as vscode from 'vscode';
import { CubiItem } from '../Item/CubiItem';

export class ProviderBase<T> implements vscode.TreeDataProvider<CubiItem>{
    protected roots:CubiItem[] = [];

    protected onChangeTreeData  = new vscode.EventEmitter<void | CubiItem | CubiItem[]>();
    readonly onDidChangeTreeData = this.onChangeTreeData.event;
    getTreeItem(element: CubiItem): vscode.TreeItem | Thenable<CubiItem>{
        return element;
    }
    getChildren(element?: CubiItem | undefined): vscode.ProviderResult<CubiItem[]>{
        if(!element){
            return this.roots;
        }else{
            return element.children;
        }
    }

    public addToRoots(item:CubiItem){
        this.roots.push(item);
    }

    public find(id:string){
        for(const root of this.roots){
            const result = root.getItemById(id);
            if(result){
                return result;
            }
        }
        return undefined;
    }

    public refresh(item:CubiItem|undefined){
        this.onChangeTreeData.fire(item);
    }
}
