import { Injectable } from '@angular/core';
import {Project} from '../models/project';
import {Pou} from '../models/pou';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public project: Project = new Project('Unknown');

  constructor() { }

  addPOU(name: string, type: string): void {
    this.project.pous.push(new Pou(name, type));
  }

  deletePOU(deletItem: Pou): void {
    this.project.pous = this.project.pous.filter(obj => obj !== deletItem);
  }

}


