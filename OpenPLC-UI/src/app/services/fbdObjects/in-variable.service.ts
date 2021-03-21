import { Injectable } from '@angular/core';
import {FbdInVariable} from '../../models/fbdObjects/fbdInVariable';

@Injectable({
  providedIn: 'root'
})
export class InVariableService {

  constructor() { }

  getInVariable(pou: any): FbdInVariable[] {
    const listOfInVariable = [];

    for ( const item of pou.getElementsByTagName('inVariable')) {
      console.log(item);
      const inVariable: FbdInVariable = {
        name: this.getInVariableName(item),
        localId: this.getInVariableLocalID(item),
        height: this.getInVariableHeight(item),
        width: this.getInVariableWidth(item),
        negated: this.getInVariableNegated(item),
        position: this. getInVariablePosistion(item),
        connectionPointOut: this.getInVariableconnectonPointOut(item),
      };
      listOfInVariable.push(inVariable);
    }
    console.log(listOfInVariable);
    return listOfInVariable;
  }

  getInVariableName(inVariable: any): string {
    if (inVariable.getElementsByTagName('expression') !== undefined) {
      return inVariable.getElementsByTagName('expression')[0].innerHTML;
    }
    return '';
  }

  getInVariableLocalID(inVariable: any): number {
    if (inVariable.getAttribute('localId') !== undefined) {
      return inVariable.getAttribute('localId');
    }
    return undefined;
  }
  getInVariableWidth(inVariable: any): number {
    if (inVariable.getAttribute('width') !== undefined) {
      return inVariable.getAttribute('width');
    }
    return 20;
  }
  getInVariableHeight(inVariable: any): number {
    if (inVariable.getAttribute('height') !== undefined) {
      return inVariable.getAttribute('height');
    }
    return 20;
  }
  getInVariableNegated(inVariable: any): boolean {
    if (inVariable.getAttribute('negated') !== undefined) {
      return inVariable.getAttribute('negated');
    }
    return false;
  }
  getInVariablePosistion(inVariable: any): any {
    if (inVariable.getElementsByTagName('position') !== undefined) {
      const posistion = inVariable.getElementsByTagName('position')[0];
      console.log({ x: posistion.getAttribute('x'), y: posistion.getAttribute('y')});
      return { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
    }
    return {x: 0, y: 0};
  }
  getInVariableconnectonPointOut(inVariable: any): any {
    if (inVariable.getElementsByTagName('relPosition') !== undefined) {
      const posistion = inVariable.getElementsByTagName('relPosition')[0];
      console.log({ x: posistion.getAttribute('x'), y: posistion.getAttribute('y')});
      return { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
    }
    return {x: 0, y: 0};
  }
}
