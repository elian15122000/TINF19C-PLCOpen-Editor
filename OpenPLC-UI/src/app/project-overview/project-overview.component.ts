import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ImportService} from '../services/import.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  public pous: string[] = [];
  public projectName = '';

  constructor(private projectService: ProjectService, private importService: ImportService) {
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
    console.log(this.projectService.pouItems);
    this.projectService.addPou(data.name, data.type, data.lang);
    console.log(this.projectService.pouItems);
    this.loadPous();
    this.closePouModal();
  }

  deletePou(deleteItem: string): void {
    this.projectService.deletePou(deleteItem);
    this.loadPous();
  }

  exportProject(): void {
    this.projectService.exportProject();
  }

  fileUpload(event: Event): void {
    this.importService.fileUpload(event);
  }

  openProject(): void {
    this.loadPous();
    /* document.getElementById("openprojectmodal").style.display = "none"; */
  }

}
