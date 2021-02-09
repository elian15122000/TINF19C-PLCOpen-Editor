import { Injectable } from '@angular/core';
import {Variable} from '../models/variable';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public pous: any[];
  public program: any;
  public project: Project;
  public variables: Variable[] = [];

  constructor() { }

}


