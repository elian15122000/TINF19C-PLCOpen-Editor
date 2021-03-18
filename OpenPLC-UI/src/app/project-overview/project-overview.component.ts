import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Pou} from '../models/pou';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  public pous: Pou[] = [];
  public projectName = this.projectService.project.name;

  constructor(private projectService: ProjectService) {
    console.log( this.projectService.project);

  }

  ngOnInit(): void {
    this.loadPous();
  }

  loadPous(): void {
    if (this.projectService.project !== undefined) {
      this.pous = this.projectService.project.pous;
    }
  }

  openAddModal(): void {
    document.getElementById('addPouModal').style.display = 'block';
  }

  closePouModal(): void {
    document.getElementById('addPouModal').style.display = 'none';
  }

  addPou(data: any): void {
    this.projectService.addPOU(data.name, data.type);
    this.loadPous();
    this.closePouModal();
  }

  deletePou(deleteItem: Pou): void {
    this.projectService.deletePOU(deleteItem);
    this.loadPous();
  }

}
