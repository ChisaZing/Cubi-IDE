import * as vscode from 'vscode';
import { ProviderBase } from '../Provider/ProviderBase';

export class CubiItem extends vscode.TreeItem{
    protected static provider:ProviderBase<CubiItem>;
    public children:CubiItem[] = [];
    private itemId:string|undefined;

    public static setProviderInstance(ins:ProviderBase<CubiItem>){
        this.provider = ins;
    }

    public static getProviderInstance(){
        return this.provider;
    }

    constructor(label:string|undefined){
        label = label?label:'undefined';
        super(label,vscode.TreeItemCollapsibleState.None);
    }

    getItemId():string|undefined{
        return this.itemId;
    }

    getItemById(id:string):CubiItem|undefined{
        if(this.itemId===id){
            return this;
        }
        for(const child of this.children){
            const result = child.getItemById(id);
            if(result){
                return result;
            }
        }
        return undefined;
    }

    addToChildren(item:CubiItem){
        this.children.push(item);
    }

    setCommand(commandId:string,label:string){
        this.command = {
            command:commandId,
            title:label,
        };
        return this;
    }

    setContextValue(contextValue:string){
        this.contextValue = contextValue;
        return this;
    }

    setItemId(id:string){
        this.itemId = id;
        return this;
    }

    setLabel(value:string|undefined){
        this.label = value;
        const ctor = this.constructor as typeof CubiItem;
        ctor.getProviderInstance()?.refresh(this);
        return this;
    }
}