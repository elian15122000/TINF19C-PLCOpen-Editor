export class LdContact {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public variable = '';
  public position: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number } = {x: 0, y: 0};
  public connectionPointOut: { x: number, y: number } = {x: 0, y: 0};

  constructor(xmlContact: any) {
    this.xml = xmlContact;
    this.localId = xmlContact.getAttribute('localId');
    if (xmlContact.getAttribute('width') !== undefined) {
      this.width = xmlContact.getAttribute('width');
    }
    if (xmlContact.getAttribute('height') !== undefined) {
      this.height = xmlContact.getAttribute('height');
    }
    if (xmlContact.getAttribute('negated') === true) {
      this.negated = true;
    }
    if (xmlContact.getElementsByTagName('variable') !== undefined) {
      this.variable = xmlContact.getElementsByTagName('variable')[0].innerHTML;
    }
    if (xmlContact.getElementsByTagName('position') !== undefined) {
      const position = xmlContact.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if ( xmlContact.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlContact.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
    if ( xmlContact.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointIn = xmlContact.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
