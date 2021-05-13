/**
 * @Filename : fbdLabel.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import { PLCNode } from '../PLCNode';

export class FbdLabel {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};
  public edges: string[] = [];

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlLabel: any) {
    if (xmlLabel === '') {
      this.createNewLabel();
    }
    else {
      this.xml = xmlLabel;
      this.localId = xmlLabel.getAttribute('localId');
      if (xmlLabel.getAttribute('width') !== undefined) {
        this.width = xmlLabel.getAttribute('width');
      }
      if (xmlLabel.getAttribute('height') !== undefined) {
        this.height = xmlLabel.getAttribute('height');
      }
      if (xmlLabel.getAttribute('label') !== undefined) {
        this.label = xmlLabel.getAttribute('label');
      }
      if (xmlLabel.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlLabel.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }

    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.label = this.label;
    this.node.type = 'label';
  }

  // creates a default xml-file for the object
  createNewLabel(): void {
    const xmlString = '<label localId="0" height="20" width="20" label="" > \n' +
      '              <position x="0" y="0"/> \n' +
      '            </label> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('label')[0];
  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attributes
  updateAttributes(localId: number, label: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('label', label);
  }
}
