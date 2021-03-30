export class LdCoil {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public variable = '';
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointOut: { x: number, y: number } = {x: 0, y: 0};

  constructor(xmlCoil: any) {
    this.xml = xmlCoil;
    this.localId = xmlCoil.getAttribute('localId');
    if (xmlCoil.getAttribute('width') !== undefined) {
      this.width = xmlCoil.getAttribute('width');
    }
    if (xmlCoil.getAttribute('height') !== undefined) {
      this.height = xmlCoil.getAttribute('height');
    }
    if (xmlCoil.getAttribute('negated') === true) {
      this.negated = true;
    }
    if (xmlCoil.getElementsByTagName('variable') !== undefined) {
      this.variable = xmlCoil.getElementsByTagName('variable')[0].innerHTML;
    }
    if (xmlCoil.getElementsByTagName('position') !== undefined) {
      const position = xmlCoil.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if ( xmlCoil.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlCoil.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
    if ( xmlCoil.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointIn = xmlCoil.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
