export class FbdReturn {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public position: {x: number, y: number};
  public connectionPointIn: {x: number, y: number};

  constructor(xmlReturn: any) {
    this.xml = xmlReturn;
    this.localId = xmlReturn.getAttribute('localId');
    if (xmlReturn.getAttribute('width') !== undefined) {
      this.width = xmlReturn.getAttribute('width');
    }
    if (xmlReturn.getAttribute('height') !== undefined) {
      this.height = xmlReturn.getAttribute('height');
    }
    if (xmlReturn.getElementsByTagName('position') !== undefined) {
      const position = xmlReturn.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlReturn.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlReturn.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
