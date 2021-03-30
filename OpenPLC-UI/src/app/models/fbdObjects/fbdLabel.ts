export class FbdLabel {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};

  constructor(xmlLabel: any) {
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
    if (xmlLabel.getElementsByTagName('position') !== undefined) {
      const position = xmlLabel.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }

  }
}
