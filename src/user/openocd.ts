import * as vscode from 'vscode';
import { OpenOCDItem } from '../Item/OpenOCDItem';
import { cubiUtils } from '../CubiUtils';
import path from 'path';

export async function openocdInit(){
    const mcuFamily:string = await getMcuFamily();
    cubiUtils.setWorkspaceContext('mcuFamily',mcuFamily);
    new OpenOCDItem('MCU Family:'+mcuFamily);
    const svdFile = cubiUtils.getWorkSpaceContext('svdFile');
    new OpenOCDItem('SvdFile:'+(svdFile?path.basename(svdFile+''):'unselected')).setContextValue('cubiOpenOCDSetSvdFile').setItemId('openocdSvdFile');

    const target = cubiUtils.getWorkSpaceContext('openOCDTarget');
    new OpenOCDItem('Target:'+path.basename(''+target)).setContextValue('cubiSelectTarget').setItemId('openocdTarget');
    const openocdConfig = new OpenOCDItem('Config').setContextValue('cubiOpenOCDConfigTarget');
    const adapter = cubiUtils.getWorkSpaceContext('Adapter');
    const speed = cubiUtils.getWorkSpaceContext('Speed');
    new OpenOCDItem('Adapter:'+adapter,openocdConfig).setContextValue('cubiOpenOCDSelectAdapter').setItemId('openocdAdapter');
    new OpenOCDItem('Speed:'+speed+'KHz',openocdConfig).setContextValue('cubiOpenOCDSetAdapterSpeed').setItemId('openocdAdapterSpeed');
    new OpenOCDItem('Flash').setContextValue('cubiOpenOCDFlashTarget');
    new OpenOCDItem('Debug').setContextValue('cubiOpenOCDDebugTarget');
}


async function getMcuFamily(){
    let result = 'unknown';
    const iocFile = await vscode.workspace.findFiles('**/*.ioc',null,1);
    if(iocFile.length>0){
        const lines = (await vscode.workspace.decode(await vscode.workspace.fs.readFile(vscode.Uri.file(iocFile[0].fsPath)))).split(/\r?\n/);
        for(const line of lines){
            if(line.startsWith('Mcu.Family=')){
                result = line.replace('Mcu.Family=','');
                break;
            }
        }
    }
    return result;
}