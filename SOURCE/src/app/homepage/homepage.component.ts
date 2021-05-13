import { Component, OnInit } from '@angular/core';
import {ImportService} from '../services/import.service';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public title = 'PLCopen-Editor';

  constructor(private importService: ImportService, private projectService: ProjectService) { }

  ngOnInit(): void {
  }
 /*  public openProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'block';
  }

  public newProjectModal(): void {
    document.getElementById('newProjectModal').style.display = 'block';
  }

  public closeNewProject(): void {
    document.getElementById('newProjectModal').style.display = 'none';
  } */

  public closeProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'none';
  }

  fileUpload(event: Event): void {
    this.importService.fileUpload(event);
  }

  createProject(data: any): void {
    this.projectService.createNewProject(data.projectName);
  }


}
