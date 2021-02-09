import {Variable} from './variable';

export class Pou {
  public name: string;
  public type: string;
  public variables: Variable[];
  public body: any;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.variables = [];
  }

}
