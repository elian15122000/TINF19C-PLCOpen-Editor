import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public title = 'PLCopen-Editor';

  constructor() { }

  ngOnInit(): void {
  }

  public openProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'block';
  }

  public closeProjectModal(): void {
    // @ts-ignore
    document.getElementById('openProjectModal').style.display = 'none';
  }


}
