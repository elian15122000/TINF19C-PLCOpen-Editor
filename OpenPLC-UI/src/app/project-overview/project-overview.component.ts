import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  public pous: string[] = [];
  public projectName = '';

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.pous = this.projectService.getPouName();
    this.projectName = this.projectService.getProjectName();
  }

  loadPous(): void {
    this.pous = this.projectService.getPouName();
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

  deletePou(deleteItem: string): void {
    this.projectService.deletePOU(deleteItem);
    this.loadPous();
  }

}
