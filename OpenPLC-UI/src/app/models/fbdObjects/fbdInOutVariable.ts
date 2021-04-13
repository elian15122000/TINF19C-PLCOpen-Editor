export class FbdInOutVariable {
  public xml: any;
  public name = '';
  public localId: number;
  public height = 20;
  public width = 20;
  public negatedIn = false;
  public negatedOut = false;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointOut: {x: number, y: number} = {x: 0, y: 0};

  constructor(xmlInOutVariable: any) {
    this.xml = xmlInOutVariable;
    if (xmlInOutVariable.getElementsByTagName('expression') !== undefined) {
      this.name = xmlInOutVariable.getElementsByTagName('expression')[0].innerHTML;
    }
    this.localId = xmlInOutVariable.getAttribute('localId');
    if (xmlInOutVariable.getAttribute('width') !== undefined) {
      this.width = xmlInOutVariable.getAttribute('width');
    }
    if (xmlInOutVariable.getAttribute('height') !== undefined) {
      this.height = xmlInOutVariable.getAttribute('height');
    }
    if (xmlInOutVariable.getAttribute('negatedIn') === true) {
      this.negatedIn = true;
    }
    if (xmlInOutVariable.getAttribute('negatedOut') === true) {
      this.negatedIn = true;
    }
    if (xmlInOutVariable.getElementsByTagName('position') !== undefined) {
      const position = xmlInOutVariable.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if ( xmlInOutVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlInOutVariable.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
    if ( xmlInOutVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointIn = xmlInOutVariable.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        this.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
      }
    }
  }
}
