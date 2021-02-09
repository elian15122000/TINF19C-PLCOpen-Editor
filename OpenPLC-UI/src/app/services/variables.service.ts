import { Injectable } from '@angular/core';
import {Variable} from '../models/variable';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  public variables: Variable[] = [];

  constructor() { }

  setVariables(pou: any): Variable[] {
    this.variables = [];
    if (pou.interface !== undefined) {
      this.variablesTypes(pou.interface[0].localVars, 'local');
      this.variablesTypes(pou.interface[0].inputVars, 'input');
      this.variablesTypes(pou.interface[0].outputVars, 'output');
      this.variablesTypes(pou.interface[0].tempVars, 'temp');
      this.variablesTypes(pou.interface[0].externalVars, 'external');
      this.variablesTypes(pou.interface[0].inOutVars, 'inOut');
    }

    return this.variables;
  }

  variablesTypes(list: any, variableClass: string): void {
    try {
      list.forEach((item) => {
        const readVariable: Variable = {
          name: this.getVariableName(item),
          class: variableClass,
          type: this.getVariableType(item),
          init: this.getVariableInit(item),
          iec: this.getVariableIec(item),
          documentation: this.getVariableDoku(item),
          option: this.getVariableOption(item)
        };
        this.variables.push(readVariable);
      });
    } catch (e) { }
  }

  getVariableType(item: any): string {
    try {
      if (item.variable[0].type[0] !== undefined) {
        if ( item.variable[0].type[0].BOOL !== undefined) { return 'BOOL'; }
        if ( item.variable[0].type[0].SINT !== undefined) { return 'SINT'; }
        if ( item.variable[0].type[0].INT !== undefined) { return 'INT'; }
        if ( item.variable[0].type[0].DINT !== undefined) { return 'DINT'; }
        if ( item.variable[0].type[0].LINT !== undefined) { return 'LINT'; }
        if ( item.variable[0].type[0].USINT !== undefined) { return 'USINT'; }
        if ( item.variable[0].type[0].UINT !== undefined) { return 'UINT'; }
        if ( item.variable[0].type[0].UDINT !== undefined) { return 'UDINT'; }
        if ( item.variable[0].type[0].ULINT !== undefined) { return 'ULINT'; }
        if ( item.variable[0].type[0].REAL !== undefined) { return 'REAL'; }
        if ( item.variable[0].type[0].LREAL !== undefined) { return 'LREAL'; }
        if ( item.variable[0].type[0].TIME !== undefined) { return 'TIME'; }
        if ( item.variable[0].type[0].DATE !== undefined) { return 'DATE'; }
        if ( item.variable[0].type[0].TOD !== undefined) { return 'TOD'; }
        if ( item.variable[0].type[0].TD !== undefined) { return 'TD'; }
        if ( item.variable[0].type[0].STRING !== undefined) { return 'STRING'; }
        if ( item.variable[0].type[0].BYTE !== undefined) { return 'BYTE'; }
        if ( item.variable[0].type[0].WORD !== undefined) { return 'WORD'; }
        if ( item.variable[0].type[0].DWORD !== undefined) { return 'DWORD'; }
        if ( item.variable[0].type[0].LWORD !== undefined) { return 'LWORD'; }
      }
    } catch (e) {}
    return '';
  }

  getVariableIec(item: any): string {
    try {
      if (item.variable[0].$.address !== undefined){
        return item.variable[0].$.address;
      }
    }
    catch (e) {}
    return '';

  }

  getVariableDoku(item: any): string {
    try {
      if (item.variable[0].documentation[0]['xhtml:p'][0] !== undefined) {
        return item.variable[0].documentation[0]['xhtml:p'][0];
      }
    }
    catch (e) {
      return '';
    }
  }

  getVariableInit(item: any): string {
    try {
      if (item.variable[0].initialValue[0].simpleValue[0].$.value !== undefined){
        return item.variable[0].initialValue[0].simpleValue[0].$.value;
      }
    } catch (e) {
      return '';
    }
  }

  getVariableName(item: any): string {
    try {
      if (item.variable[0].$.name !== undefined){
        return item.variable[0].$.name;
      }
    }
    catch (e) {
      return '';
    }
  }

  getVariableOption(item: any): string {
    try {
      if (item.$.constant === 'true') {
        return 'constant';
      }
    }
    catch (e) {
    }
    try {
      if (item.$.retain === 'true') {
        return 'retain';
      }
    }
    catch (e) {
    }
    try {
      if (item.$.nonretain === 'true') {
        return 'non-retain';
      }
    }
    catch (e) {
    }
    return '';
  }

}
