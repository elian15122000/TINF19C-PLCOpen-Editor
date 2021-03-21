import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {InVariableService} from '../services/fbdObjects/in-variable.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public pouName: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private inVariableService: InVariableService) { }

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);
    console.log(pou);
    if (pou !== undefined) {
      this.inVariableService.getInVariable(pou);
    }
  }

}
