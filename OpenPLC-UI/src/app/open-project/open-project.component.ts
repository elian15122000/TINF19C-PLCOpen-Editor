import {Component, OnInit} from '@angular/core';
import {ImportService} from "../services/import.service";

@Component({
  selector: 'app-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css']
})
export class OpenProjectComponent implements OnInit {

  constructor(private importService: ImportService) { }

  ngOnInit(): void {
  }

  public closeProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'none';
  }

  public onSubmit(): void {
    this.closeProjectModal();
  }

  fileUpload(event: Event): void {
    this.importService.fileUpload(event);
  }
}
