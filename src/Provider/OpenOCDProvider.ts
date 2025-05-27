import { ProviderBase } from './ProviderBase';
import { CubiItem } from '../Item/CubiItem';

export class OpenOCDProvider extends ProviderBase<CubiItem>{

}

export const openOCDProvider = new OpenOCDProvider();
