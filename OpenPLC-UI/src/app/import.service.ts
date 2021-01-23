import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  xmlfile = '';

  constructor() { }

  getXMLFile(): string {
    return this.xmlfile;
  }
}
