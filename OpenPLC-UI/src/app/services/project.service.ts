import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// In diesem Service sind alle Infomationen eines Projekts gespeichert
export class ProjectService {
  public pouItems: any[] = [];
  public headerItems: any[] = [];
  public instanceItems: any;

  constructor() { }

  getPouName(): string[] {
    const pouNames = [];
    this.pouItems.forEach((item) => {
      pouNames.push(item.getAttribute('name'));
    });
    return pouNames;
  }

  getProjectName(): string {
    if ( this.headerItems[1].getAttribute('name') !== undefined) {
      return this.headerItems[1].getAttribute('name');
    }
    return '';
  }


  addPOU(name: string, type: string): void {
  }

  deletePOU(deletItem: string): void {
  }

}


