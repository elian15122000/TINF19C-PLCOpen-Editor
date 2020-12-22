import { Component, OnInit } from '@angular/core';
import { Variable } from '../variable';

@Component({
  selector: 'app-variables-list',
  templateUrl: './variables-list.component.html',
  styleUrls: ['./variables-list.component.css']
})
export class VariablesListComponent implements OnInit {

  public variables: Variable[] = [];
  private numberOfVariables = 0;

  constructor() { }

  ngOnInit(): void {
    this.numberOfVariables++;
    this.variables.push({number: 1,
      name: 'test',
      class: 'test',
      type: 'test',
      iec: 'test',
      init: 'test',
      option: 'test',
      documentation: 'test'
    });
  }
  public newVariable(): void {
    this.numberOfVariables++;
    this.variables.push({number: this.numberOfVariables,
      name: '',
      class: '',
      type: '',
      iec: '',
      init: '',
      option: '',
      documentation: ''
    });
  }

}
