import { Component, OnInit } from '@angular/core';
import {ImportService} from "../services/import.service";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  constructor(private importService: ImportService) { }

  ngOnInit(): void {
  }

  private projectName:string;

  public closeProjectModal(): void {
    // @ts-ignore
    document.getElementById('openNewProjectModal').style.display = 'none';
  }

  public onSubmit(): void {
    this.closeProjectModal();
  }

  public saveProjectModal():void {
    console.log(this.projectName);
  }
}
