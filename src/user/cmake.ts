import { cmakeApi } from "../API/CMake";
import { CMakeItem } from "../Item/CMakeItem";
import { cmakeProvider } from "../Provider/CMakeProvider";

export async function cmakeInit(){
    await cmakeApi.Init();
    const configure = new CMakeItem('Configure').setContextValue('cubiCMakeConfigureTarget');
    new CMakeItem(await cmakeApi.getCurrentConfig(),configure).setContextValue('cubiCMakeSelectConfigTarget').setItemId('cmakeConfig');
    cmakeApi.onSelectedConfigurationChanged(async ()=>{
        cmakeProvider.find('cmakeConfig')?.setLabel(await cmakeApi.getCurrentConfig());
    });
    new CMakeItem('Reconfigure').setContextValue('cubiCMakeReconfigureTarget');
    new CMakeItem('Build').setContextValue('cubiCMakeBuildTarget');
    new CMakeItem('Clean').setContextValue('cubiCMakeCleanTarget');
}