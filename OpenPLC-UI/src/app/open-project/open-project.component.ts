import {Component, OnInit} from '@angular/core';
import {ImportService} from '../import.service';

@Component({
  selector: 'app-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css']
})
export class OpenProjectComponent implements OnInit {
  xmlFile = '';

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
    // @ts-ignore
    if (event.target.files[0] !== null) {
      // @ts-ignore
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.xmlFile = (evt as any).target.result;
        console.log(this.xmlFile);
        this.importService.xmlfile = this.xmlFile;
      };
      reader.readAsText(file);
    }

  }
}
