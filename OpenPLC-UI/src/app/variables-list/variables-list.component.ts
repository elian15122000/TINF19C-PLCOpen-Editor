import { Component, OnInit } from '@angular/core';
import { Variable} from '../models/variable';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {VariablesService} from '../services/variables.service';

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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private variablesService: VariablesService) {
  }

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);
    if (pou !== undefined) {
      this.variables = this.variablesService.getVariablesList(pou);
    }
  }

  public newVariable(): void {
    this.variables.push({
      name: '',
      class: '',
      type: '',
      iec: '',
      init: '',
      option: '',
      documentation: ''
    });
    /*this.projectService.project.pous.forEach((pou) => {
      if (pou.name === this.pouName) {
        pou.variables = this.variables;
      }
    });*/
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
