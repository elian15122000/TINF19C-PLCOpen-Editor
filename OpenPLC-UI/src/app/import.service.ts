import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  xmlFile = '';

  constructor() { }

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
      };
      reader.readAsText(file);
    }

  }
}
