import { Component, OnInit } from '@angular/core';
import { Variable} from "../models/variable";
import { ProjectService} from "../services/project.service";

@Component({
  selector: 'app-variables-list',
  templateUrl: './variables-list.component.html',
  styleUrls: ['./variables-list.component.css']
})
export class VariablesListComponent implements OnInit {

  public variables: Variable[] = [];
  public variableList: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.variableList = this.projectService.program.interface[0].localVars;
    console.log(this.variableList);
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
  }

}
