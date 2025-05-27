import { cmakeApi } from '../../API/CMake';

export function cmakeConfigure(){
    cmakeApi.configure();
}

export function cmakeSelectConfig(){
    cmakeApi.selectConfig();
}

export function cmakeReconfigure(){
    cmakeApi.reconfigure();
}