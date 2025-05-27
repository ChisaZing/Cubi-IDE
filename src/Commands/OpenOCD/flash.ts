import * as vscode from 'vscode';
import { cubiUtils } from '../../CubiUtils';
import { exec } from 'child_process';
import * as util from 'util';

const execPromise = util.promisify(exec);

let terminal:vscode.Terminal | undefined;

export async function openOCDFlash(){
    if(!await cubiUtils.isFileExist(cubiUtils.toWorkspacePath('openocd.cfg'))){
        vscode.window.showErrorMessage('Please Generate a Config File First');
        return;
    }
    const target = cubiUtils.getWorkSpaceContext('openOCDTarget');
    if(!target){
        vscode.window.showErrorMessage('Please Select a Target File First');
        return;
    }
    
    const openocdPath = vscode.workspace.getConfiguration('cubi').get('openOCDPath', 'openocd');
    const cmd = `${openocdPath} -f ${cubiUtils.toWorkspacePath('openocd.cfg').fsPath} -c init -c "reset halt" -c "flash write_image erase ${target}" -c "reset run" -c shutdown`;
    try {
    const { stdout, stderr } = await execPromise(cmd);
    console.log(stdout);
    if (stderr) {
        console.warn(stderr);
    }
} catch (err) {
    vscode.window.showErrorMessage("烧录失败：" + err);
    throw err;
  }
}