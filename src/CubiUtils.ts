import * as vscode from 'vscode';
import { CubiObject } from "./CubiObject";

class CubiUtils extends CubiObject{
    setWorkspaceContext(id:string,value:any){
        this.getContext().workspaceState.update(id,value);
    }

    getWorkSpaceContext(id:string){
        return this.getContext().workspaceState.get(id);
    }

    toWorkspacePath(path:string){
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        return vscode.Uri.joinPath(workspaceFolder!.uri,path);
    }

    async isFileExist(path:vscode.Uri){
        try{
            await vscode.workspace.fs.stat(path);
            return true;
        }catch{
            return false;
        }   
    }
}

export const cubiUtils = new CubiUtils();