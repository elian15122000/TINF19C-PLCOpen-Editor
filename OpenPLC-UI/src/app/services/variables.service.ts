import { Injectable } from '@angular/core';
import { Variable} from '../models/variable';

@Injectable({
  providedIn: 'root'
})
// Hier werden die Daten aus dem Interface-Tag gelesen, editiert oder gelöscht
export class VariablesService {
  public variables: Variable[] = [];
  public types = ['BOOL', 'SINT', 'INT', 'DINT', 'LINT', 'USINT', 'UINT', 'UDINT', 'ULINT',
    'REAL', 'LREAL', 'TIME', 'DATE', 'TOD', 'DT', 'STRING', 'BYTE', 'WORD', 'DWORD', 'LWORD'];

  constructor() { }
/*
  getVariablesList(pou: any): Variable[] {
    this.variables = [];
    const list = pou.getElementsByTagName('interface')[0];
    if (list !== undefined){
      this.variableClass(list.getElementsByTagName('localVars'), 'local');
      this.variableClass(list.getElementsByTagName('inputVars'), 'input');
      this.variableClass(list.getElementsByTagName('outputVars'), 'output');
      this.variableClass(list.getElementsByTagName('tempVars'), 'temp');
      this.variableClass(list.getElementsByTagName('externalVars'), 'external');
      this.variableClass(list.getElementsByTagName('inOutVars'), 'inOut');
    }
    return this.variables;
  }

  variableClass(list: any, variableClass: string): void {
    if (list.length > 0) {
      try {
        for (const listItem of list) {
          for ( const item of listItem.getElementsByTagName('variable')) {
            const readVariable: Variable = {
              name: this.getVariableName(item),
              class: variableClass,
              type: this.getVariableType(item),
              init: this.getVariableInit(item),
              iec: this.getVariableIec(item),
              documentation: this.getVariableDoku(item),
              option: this.getVariableOption(listItem)
            };
            this.variables.push(readVariable);
          }
        }
      } catch (e) { }
    }
  }

  getVariableType(item: any): string {
    let varType = '';
    if (item !== undefined) {
      if (item.getElementsByTagName('type') !== undefined) {
        if (item.getElementsByTagName('derived').length > 0){
          const derived = item.getElementsByTagName('derived')[0];
          varType = derived.getAttribute('name');
        }
        else {
          for (const type of this.types) {
            if (item.getElementsByTagName(type).length > 0) {
              return type;
            }
          }
        }
      }
    }
    return varType;
  }

  getVariableIec(item: any): string {
    let address = '';
    try {
      if (item.getAttribute('address') !== undefined){
        address = item.getAttribute('address');
      }
    }
    catch (e) {
      address = '';
    }
    return address;

  }

  getVariableDoku(item: any): string {
    try {
      if (item.getElementsByTagName('documentation') !== undefined) {
        return item.getElementsByTagName('documentation')[0].children[0].innerText;
      }
    }
    catch (e) {
      return '';
    }
  }

  getVariableInit(item: any): string {
    try {
      if (item.getElementsByTagName('simpleValue') !== undefined){
        const init = item.getElementsByTagName('simpleValue')[0];
        return init.getAttribute('value');
      }
    } catch (e) {
    }
    return '';
  }

  getVariableName(item: any): string {
    let name = '';
    try {
      if (item.getAttribute('name') !== undefined){
        name = item.getAttribute('name');
      }
    }
    catch (e) {
      name = '';
    }
    return name;
  }

  getVariableOption(item: any): string {
    if (item !== undefined){
      try {
        if (item.getAttribute('constant') === 'true') {
          return 'constant';
        }
        else if (item.getAttribute('retain') === 'true') {
          return 'retain';
        }
        else if (item.getAttribute('nonretain') === 'true') {
          return 'non-retain';
        }
      }
      catch (e) {
      }
      return '';
    }
  }

 */

}
