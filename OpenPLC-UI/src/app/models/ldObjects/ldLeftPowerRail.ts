export class LdLeftPowerRail {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointOut: { x: number, y: number } = {x: 0, y: 0};

  constructor(xmlLeftPowerRail: any) {
    this.xml = xmlLeftPowerRail;
    this.localId = xmlLeftPowerRail.getAttribute('localId');
    if (xmlLeftPowerRail.getAttribute('width') !== undefined) {
      this.width = xmlLeftPowerRail.getAttribute('width');
    }
    if (xmlLeftPowerRail.getAttribute('height') !== undefined) {
      this.height = xmlLeftPowerRail.getAttribute('height');
    }
    if (xmlLeftPowerRail.getElementsByTagName('position') !== undefined) {
      const position = xmlLeftPowerRail.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if ( xmlLeftPowerRail.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointIn = xmlLeftPowerRail.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
