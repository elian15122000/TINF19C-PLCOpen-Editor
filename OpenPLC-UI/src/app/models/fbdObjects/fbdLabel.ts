import {Node} from '@swimlane/ngx-graph';

export class FbdLabel {
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public node: Node = {id: null, label: null, type: null, pins: null};
  public edges: string[] = [];

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
    this.node.id = this.localId;
    this.node.label = this.label;
    this.node.type = 'label';
  }

  createNewLabel(): void {
    const xmlString = '<label localId="0" height="20" width="20" label="" > \n' +
      '              <position x="0" y="0"/> \n' +
      '            </label> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('label')[0];
  }
}
