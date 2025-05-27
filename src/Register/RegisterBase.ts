import { CubiObject } from '../CubiObject';

export abstract class RegisterBase<T> extends CubiObject{
    protected items:Map<string,T> = new Map<string,T>();

    constructor(){
        super();
    }

    public addToRegister(id:string,item:T):void{
        this.items.set(id,item);
    }

    public getRegister(id:string):T|undefined{
        return this.items.get(id);
    }

    public getAll(): T[] {
        return Array.from(this.items.values());
    }

    public abstract registerAll():void;

}