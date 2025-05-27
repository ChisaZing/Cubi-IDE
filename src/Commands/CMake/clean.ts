import { cmakeApi } from '../../API/CMake';

export function cmakeClean(){
    cmakeApi.clean();
}