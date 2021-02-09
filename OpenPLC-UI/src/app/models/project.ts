import {Pou} from './pou';

export class Project {
  public name: string;
  public pous: Pou[];

  constructor(name: string) {
    this.name = name;
    this.pous = [];
  }
}
