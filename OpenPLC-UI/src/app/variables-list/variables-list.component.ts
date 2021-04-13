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

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);
    console.log(pou);
    if (pou !== undefined) {
      const list = pou.getElementsByTagName('interface')[0];
      if (list !== undefined){
        for (const localVars of list.getElementsByTagName('localVars')) {
          this.variables.push(new Variable(localVars, 'local'));
        }
        for (const outputVars of list.getElementsByTagName('outputVars')) {
          this.variables.push(new Variable(outputVars, 'output'));
        }
        for (const inputVars of list.getElementsByTagName('inputVars')) {
          this.variables.push(new Variable(inputVars, 'input'));
        }
        for (const tempVars of list.getElementsByTagName('tempVars')) {
          this.variables.push(new Variable(tempVars, 'temp'));
        }
        for (const externalVars of list.getElementsByTagName('externalVars')) {
          this.variables.push(new Variable(externalVars, 'external'));
        }
        for (const inOutVars of list.getElementsByTagName('inOutVars')) {
          this.variables.push(new Variable(inOutVars, 'inOut'));
        }

        console.log(this.variables);
      }
    }
  }

  public newVariable(): void {

  }

  deleteVariable(item: Variable): void {
    this.variables = this.variables.filter(obj => obj !== item);
    /*this.projectService.project.pous.forEach((pou) => {
      if (pou.name === this.pouName) {
        pou.variables = this.variables;
      }
    });*/
  }

  onchange(): void{
    /*this.projectService.project.pous.forEach((pou) => {
      if (pou.name === this.pouName) {
        pou.variables = this.variables;
      }
    });*/
  }


}

