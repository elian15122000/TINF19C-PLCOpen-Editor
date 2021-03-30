export class FbdInVariable {
  public xml: any;
  public name = '';
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointOut: {x: number, y: number} = {x: 0, y: 0};

  constructor(xmlInVariable: any) {
    this.xml = xmlInVariable;
    if (xmlInVariable.getElementsByTagName('expression') !== undefined) {
      this.name = xmlInVariable.getElementsByTagName('expression')[0].innerHTML;
    }
    this.localId = xmlInVariable.getAttribute('localId');
    if (xmlInVariable.getAttribute('width') !== undefined) {
      this.width = xmlInVariable.getAttribute('width');
    }
    if (xmlInVariable.getAttribute('height') !== undefined) {
      this.height = xmlInVariable.getAttribute('height');
    }
    if (xmlInVariable.getAttribute('negated') === true) {
      this.negated = xmlInVariable.getAttribute('negated');
    }
    if (xmlInVariable.getElementsByTagName('position') !== undefined) {
      const position = xmlInVariable.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlInVariable.getElementsByTagName('relPosition') !== undefined) {
      const position = xmlInVariable.getElementsByTagName('relPosition')[0];
      this.connectionPointOut = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
