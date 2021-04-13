export class LdRightPowerRail {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number } = {x: 0, y: 0};

  constructor(xmlRightPowerRail: any) {
    this.xml = xmlRightPowerRail;
    this.localId = xmlRightPowerRail.getAttribute('localId');
    if (xmlRightPowerRail.getAttribute('width') !== undefined) {
      this.width = xmlRightPowerRail.getAttribute('width');
    }
    if (xmlRightPowerRail.getAttribute('height') !== undefined) {
      this.height = xmlRightPowerRail.getAttribute('height');
    }
    if (xmlRightPowerRail.getElementsByTagName('position') !== undefined) {
      const position = xmlRightPowerRail.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if ( xmlRightPowerRail.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlRightPowerRail.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
