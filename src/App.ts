import *as vscode from 'vscode';
import { CubiObject } from './CubiObject';
import { providerRegister } from './Register/ProviderRegister';
import { openOCDProvider } from './Provider/OpenOCDProvider';
import { cmakeProvider } from './Provider/CMakeProvider';
import { commandRegister } from './Register/CommandRegister';
import { OpenOCDItem } from './Item/OpenOCDItem';
import { CMakeItem } from './Item/CMakeItem';

export class App{
    constructor(context:vscode.ExtensionContext){
        CubiObject.CubiContext = context;
    }

    public async run():Promise<void>{
        OpenOCDItem.setProviderInstance(openOCDProvider);
        CMakeItem.setProviderInstance(cmakeProvider);
        providerRegister.addToRegister('cubi-cmake',cmakeProvider);
        providerRegister.addToRegister('cubi-openocd',openOCDProvider);
        providerRegister.registerAll();
        commandRegister.registerAll();


    }
}