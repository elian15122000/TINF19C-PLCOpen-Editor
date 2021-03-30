export class FbdJump {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public label = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: {x: number, y: number} = {x: 0, y: 0};

  constructor(xmlJump: any) {
    this.xml = xmlJump;
    this.localId = xmlJump.getAttribute('localId');
    if (xmlJump.getAttribute('width') !== undefined) {
      this.width = xmlJump.getAttribute('width');
    }
    if (xmlJump.getAttribute('height') !== undefined) {
      this.height = xmlJump.getAttribute('height');
    }
    if (xmlJump.getAttribute('label') !== undefined) {
      this.label = xmlJump.getAttribute('label');
    }
    if (xmlJump.getElementsByTagName('position') !== undefined) {
      const position = xmlJump.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlJump.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlJump.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
