import * as vscode from 'vscode';
import { cubiUtils } from '../../CubiUtils';
import { openOCDFlash } from './flash';

export async function openOCDDebug(){
    if(!await cubiUtils.isFileExist(cubiUtils.toWorkspacePath('openocd.cfg'))){
        vscode.window.showErrorMessage('Please Generate a Config File First');
        return;
    }
    const target = cubiUtils.getWorkSpaceContext('openOCDTarget');
    if(!target){
        vscode.window.showErrorMessage('Please Select a Target File First');
        return;
    }
    const gdbPath = vscode.workspace.getConfiguration('cubi').get('gdbPath', 'arm-none-eabi-gdb');
    const svdFile = cubiUtils.getWorkSpaceContext('svdFile');
    await openOCDFlash();
    await vscode.debug.startDebugging(undefined, {
        cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath,
        executable: target,
        name: "Debug with OpenOCD",
        request: "launch",
        type: "cortex-debug",
        servertype: "openocd",
        serverArgs: [
            "-c", "init",
            "-c", "reset halt",
            "-c", "flash write_image erase  " + target, 
            "-c", "reset halt",
        ],
        gdbPath: gdbPath,
        configFiles: ["openocd.cfg"],
        searchDir: [],
        runToEntryPoint: "main",
        showDevDebugOutput: "none",
        svdFile: svdFile,
    });
}