import { Injectable } from '@angular/core';
import {ImportService} from "./import.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public pous: any[];
  public program: any;

  constructor() { }
}
