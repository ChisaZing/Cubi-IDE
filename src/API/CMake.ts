import * as vscode from 'vscode';
import { CMakeToolsApi,getCMakeToolsApi,Version,UIElement, Project } from "vscode-cmake-tools";

class CMakeApi {
    private api:CMakeToolsApi|undefined;
    private project:Project|undefined;

    async Init(){
        this.api = await getCMakeToolsApi(Version.v2);
        this.project = await this.api?.getProject(vscode.Uri.file(this.api.getActiveFolderPath()));
    }

    configure(){
        this.project?.configure();
    }

    reconfigure(){
        this.project?.reconfigure();
    }

    selectConfig(){
        vscode.commands.executeCommand('cmake.selectConfigurePreset');
    }

    getCurrentConfig(){
        return this.project?.getActiveBuildType();
    }

    onSelectedConfigurationChanged(callback:()=>void){
        this.project?.onSelectedConfigurationChanged(callback);
    }

    build(){
        this.project?.build();
    }

    clean(){
        this.project?.clean();
    }
}

export const cmakeApi = new CMakeApi();