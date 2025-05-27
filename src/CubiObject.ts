import * as vscode from 'vscode';

export class CubiObject{
    public static CubiContext:vscode.ExtensionContext;

    protected push(items: { dispose(): any; }){
        CubiObject.CubiContext.subscriptions.push(items);
    }

    protected getContext(){
        return CubiObject.CubiContext;
    }
}