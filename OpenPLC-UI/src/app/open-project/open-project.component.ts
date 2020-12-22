import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css']
})
export class OpenProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public closeProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'none';
  }

  public onSubmit(): void {
    this.closeProjectModal();
  }

  selectedFolder(event: Event): void {
    // @ts-ignore
    const files = event.target.files;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0;  i < files.length; i++){
      console.log(files[i].webkitRelativePath);
    }
  }
}
