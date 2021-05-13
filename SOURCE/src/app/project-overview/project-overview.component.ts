/**
 * @Filename : project-overview.component.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

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

  // load the project name and the list of pous from the projectService
  ngOnInit(): void {
    this.pous = this.projectService.getPouName();
    this.projectName = this.projectService.getProjectName();
  }

  // load the list of pous from the projectService
  loadPous(): void {
    this.pous = this.projectService.getPouName();
  }

  closePouModal(): void {
    document.getElementById('addPouModal').style.display = 'none';
  }

  // create a new pou and add to the pou list
  addPou(data: any): void {
    this.projectService.addPou(data.name, data.type, data.lang);
    this.loadPous();
    this.closePouModal();
  }

  // remove the selected pou and reload the pou list
  deletePou(deleteItem: string): void {
    this.projectService.deletePou(deleteItem);
    this.loadPous();
  }

  // export the project
  exportProject(): void {
    this.projectService.exportProject();
  }

  // upload another file
  fileUpload(event: Event): void {
    this.importService.fileUpload(event);
  }

  openProject(): void {
    this.loadPous();
  }

}
