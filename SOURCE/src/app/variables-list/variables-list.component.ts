/**
 * @Filename : variable-list.component.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { Component, OnInit } from '@angular/core';
import { Variable} from '../models/variable';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-variables-list',
  templateUrl: './variables-list.component.html',
  styleUrls: ['./variables-list.component.css']
})
export class VariablesListComponent implements OnInit {
  public pouName: string;
  public variables: Variable[] = [];
  public types = ['BOOL', 'SINT', 'INT', 'DINT', 'LINT', 'USINT', 'UINT', 'UDINT', 'ULINT',
    'REAL', 'LREAL', 'TIME', 'DATE', 'TOD', 'DT', 'STRING', 'BYTE', 'WORD', 'DWORD', 'LWORD'];
  public pou: any;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
  }

  // find the current pou and read the values of the interface-Tag
  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    this.pou = this.projectService.getPou(this.pouName);
    if (this.pou !== undefined) {
      if (this.pou.getElementsByTagName('interface')[0] !== undefined){
        const list = this.pou.getElementsByTagName('interface')[0];
        for (const localVars of list.getElementsByTagName('localVars')) {
          for ( const xmlVariable of localVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'local', option));
          }

        }
        for (const outputVars of list.getElementsByTagName('outputVars')) {
          for ( const xmlVariable of outputVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'output', option));
          }
        }
        for (const inputVars of list.getElementsByTagName('inputVars')) {
          for ( const xmlVariable of inputVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'input', option));
          }
        }
        for (const tempVars of list.getElementsByTagName('tempVars')) {
          for ( const xmlVariable of tempVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'temp', option));
          }
        }
        for (const externalVars of list.getElementsByTagName('externalVars')) {
          for ( const xmlVariable of externalVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'external', option));
          }
        }
        for (const inOutVars of list.getElementsByTagName('inOutVars')) {
          for ( const xmlVariable of inOutVars.getElementsByTagName('variable')) {
            const option = this.checkVariableOption(xmlVariable);
            this.variables.push(new Variable(xmlVariable, 'inOut', option));
          }
        }
      }
    }
  }

  // check the option of the variable
  checkVariableOption(xmlVariable: any): string{
    let option = '';
    if (xmlVariable.getAttribute('constant') === 'true') {
      option = 'constant';
    } else if (xmlVariable.getAttribute('retain') === 'true') {
      option = 'retain';
    } else if (xmlVariable.getAttribute('nonretain') === 'true') {
      option = 'non-retain';
    }
    return option;
  }

  // Create a new variable and add to the list of Variables
  public newVariable(): void {
    const newVariable = new Variable('', '', '');
    this.variables.push(newVariable);
    this.onchange();
  }

  // delete variable -> remove item of the variable list
  deleteVariable(item: Variable): void {
    this.variables = this.variables.filter(obj => obj !== item);
  }

  // updates the xml of the variable and push into xml of the pou
  onchange(): void{
    this.pou.getElementsByTagName('interface')[0].innerHTML = '';
    for (const variable of this.variables) {
      if(variable.name === ""){
        alert("Variable name can't be empty");
        variable.name = "default_name";
      }
      variable.createXML();
      this.pou.getElementsByTagName('interface')[0].appendChild(variable.xml);
    }
  }

}

