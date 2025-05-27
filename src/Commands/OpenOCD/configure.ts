import * as vscode from 'vscode';
import { cubiUtils } from '../../CubiUtils';
import { openOCDProvider } from '../../Provider/OpenOCDProvider';
import path from 'path';


const adapters = ['ST-Link','DapLink'];

export async function openOCDSetSvdFile(){
    const svdFile = await vscode.window.showInputBox({
        prompt: 'Please Enter SVD File Path',
        placeHolder: 'e.g. path/to/your/file.svd',
        validateInput: (value) => {
            if (!value.endsWith('.svd')) {
                return 'Please enter a valid SVD file path';
            }
            return null;
        }
    });
    if(svdFile){
        cubiUtils.setWorkspaceContext('svdFile',svdFile);
        openOCDProvider.find('openocdSvdFile')?.setLabel('SvdFile:'+path.basename(svdFile));
    }
}

export async function openOCDSelectTarget(){
    const targetFile = await vscode.workspace.findFiles('**/*.elf',null);
    const result = await vscode.window.showQuickPick(targetFile.map((item)=>{
        return item.fsPath;
    }));
    if(result){
        openOCDProvider.find('openocdTarget')?.setLabel('Target:'+path.basename(result));
        cubiUtils.setWorkspaceContext('openOCDTarget',result);
    }
}

export async function openOCDConfigure(){
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if(workspaceFolder){
        const target = (cubiUtils.getWorkSpaceContext('mcuFamily')+'').toLowerCase();
        const adapter = cubiUtils.getWorkSpaceContext('Adapter');
        const adapterSpeed = cubiUtils.getWorkSpaceContext('Speed');
        if(adapter && adapterSpeed){
            const content = getAdapterConfig(adapter+'')+'\nadapter speed '+adapterSpeed+'\nsource [find target/'+target+'x.cfg]';
            vscode.workspace.fs.writeFile(vscode.Uri.joinPath(workspaceFolder.uri,'openocd.cfg'),await vscode.workspace.encode(content));
        }
        vscode.window.showInformationMessage('Generated a Simple Config File, You Can Change It If Needed');
    }else{
        vscode.window.showErrorMessage('Please Open a Workspace First');
    }
}

export async function openOCDSelectAdapter(){
    const adapter = await vscode.window.showQuickPick(adapters);
    if(adapter){
        cubiUtils.setWorkspaceContext('Adapter',adapter);
        openOCDProvider.find('openocdAdapter')?.setLabel('Adapter:'+adapter);
    }
}

export async function openOCDSetAdapterSpeed(){
    const speed = await vscode.window.showInputBox({
        prompt:'Please Enter Adapter Speed(KHz)',
        validateInput:(value)=>{
            return /^[0-9]+$/.test(value)?null:'Please Enter a Number';
        },
    });
    if(speed){
        cubiUtils.setWorkspaceContext('Speed',speed);
        openOCDProvider.find('openocdAdapterSpeed')?.setLabel('Speed:'+speed+'KHz');
    }
}

function getAdapterConfig(adapter:string){
    switch(adapter){
        case 'ST-Link':{
            return 'source [find interface/stlink.cfg]\ntransport select hla_swd';
        }
        case 'DapLink':{
            return 'adapter driver cmsis-dap\ntransport select swd';
        }
        default:{
            return '';
        }
    }
}