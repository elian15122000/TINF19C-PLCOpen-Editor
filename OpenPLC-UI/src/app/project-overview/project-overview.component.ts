import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  public pous: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    if (this.projectService.pous !== undefined) {
      this.pous = this.projectService.pous;
    }
  }

  selectProgram(program: any): void{
    this.projectService.program = program;
  }

}
