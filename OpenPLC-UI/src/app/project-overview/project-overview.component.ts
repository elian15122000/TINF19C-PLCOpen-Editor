import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {VariablesService} from '../services/variables.service';
import {Pou} from '../models/pou';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  public pous: Pou[] = [];

  constructor(private projectService: ProjectService, private variablesService: VariablesService) { }

  ngOnInit(): void {
    if (this.projectService.project !== undefined) {
      this.pous = this.projectService.project.pous;
    }
  }

  selectProgram(program: any): void {
    this.projectService.program = program;
    this.variablesService.setVariables(program);
  }

}
