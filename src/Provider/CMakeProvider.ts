import { ProviderBase } from './ProviderBase';
import { CubiItem } from '../Item/CubiItem';

export class CMakeProvider extends ProviderBase<CubiItem>{

}

export const cmakeProvider = new CMakeProvider();