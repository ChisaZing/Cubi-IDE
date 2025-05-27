import { Command } from '../Item/Command';
import { cmakeConfigure, cmakeReconfigure, cmakeSelectConfig } from '../Commands/CMake/configure';
import { cmakeBuild } from '../Commands/CMake/build';
import { cmakeClean } from '../Commands/CMake/clean';
import { openOCDConfigure, openOCDSelectAdapter, openOCDSelectTarget, openOCDSetAdapterSpeed, openOCDSetSvdFile } from '../Commands/OpenOCD/configure';
import { openOCDFlash } from '../Commands/OpenOCD/flash';
import { openOCDDebug } from '../Commands/OpenOCD/debug';

export function commandInit(){
        new Command('cubi.configure',cmakeConfigure);
        new Command('cubi.selectBuildConfig',cmakeSelectConfig);
        new Command('cubi.reconfigure',cmakeReconfigure);
        new Command('cubi.build',cmakeBuild);
        new Command('cubi.clean',cmakeClean);
    
        new Command('cubi.setSvdFile',openOCDSetSvdFile);
        new Command('cubi.selectTarget',openOCDSelectTarget);
        new Command('cubi.generateOpenOCDConfig',openOCDConfigure);
        new Command('cubi.selectAdapter',openOCDSelectAdapter);
        new Command('cubi.setAdapterSpeed',openOCDSetAdapterSpeed);
        new Command('cubi.flash',openOCDFlash);
        new Command('cubi.debug',openOCDDebug);
}