import _ from 'lodash';
import { iMap } from '../../interfaces';
import { Optional } from './optional';


export class NamedMap<T> implements iMap<T> {
  
  private data: Map<string, T>;

  public constructor(){
    this.data = new Map<string, T>();
  }

  public has(name: string): boolean {
    return this.data.has(name);
  }

  public add(name: string, content: T, config: { throwIfExists: boolean } = { throwIfExists : false }): iMap<T> {
    if (this.has(name) && config.throwIfExists) {
      throw new Error(`Cannot add ${name} to list. The value is already in use.`);
    }
    this.data.set(name, content);
    return this;
  }

  public get(name: string): Optional<T> {
    if (!this.has(name)) {
      return Optional.fromNull<T>();
    }
    return Optional.fromValue(this.data.get(name));
  }

  public getForced(name: string): T {
    if (!this.has(name)) {
      const validKeys: string = this.getKeys().join(',');
      throw new Error(`Could not get unknown '${name}' from list.  Did you spell it right? Valid values: [${validKeys}]`);
    }
    return this.data.get(name);
  }


  public delete(name: string, config: { throwIfNotExists: boolean } = { throwIfNotExists : false }): boolean {
    if(!this.has(name)) {
      if(config.throwIfNotExists) {
        const validKeys: string = this.getKeys().join(',');
        throw new Error(`Could not delete unknown '${name}' from list. Did you spell it right? Valid values: [${validKeys}]`);
      }
      return false;
    }
    this.data.delete(name);
    return true;
  }  


  public getKeys() : string[] {
    const names: string[] = [];

    this.data.forEach((val, name) => {
        names.push(name);
    });

    return names;
  }


  public forEachEntry(callback :(key: string, value: T) => void): void {
    this.getKeys().forEach((keyName: string) => {
      const value: T = this.get(keyName).getForced();
      callback(keyName, value);
    });
  }

  public getValues(): T[] {
    const values: T[] = [];

    this.data.forEach((val) => {
        values.push(val);
    });

    return values;
  }

  public find(filter: any): Optional<T> {
    const x : T = _.find<T>(this.getValues(), filter);
    return Optional.fromValue(x);
  }   
}