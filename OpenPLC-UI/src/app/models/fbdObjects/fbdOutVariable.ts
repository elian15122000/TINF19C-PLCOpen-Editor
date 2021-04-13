export class FbdOutVariable {
  public xml: any;
  public name = '';
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: {x: 0, y: 0} = {x: 0, y: 0};
  public connectionPointIn: {x: number, y: number} = {x: 0, y: 0};

  constructor(xmlOutVariable: any) {
    this.xml = xmlOutVariable;
    if (xmlOutVariable.getElementsByTagName('expression') !== undefined) {
      this.name = xmlOutVariable.getElementsByTagName('expression')[0].innerHTML;
    }
    this.localId = xmlOutVariable.getAttribute('localId');
    if (xmlOutVariable.getAttribute('width') !== undefined) {
      this.width = xmlOutVariable.getAttribute('width');
    }
    if (xmlOutVariable.getAttribute('height') !== undefined) {
      this.height = xmlOutVariable.getAttribute('height');
    }
    if (xmlOutVariable.getAttribute('negated') === true) {
      this.negated = xmlOutVariable.getAttribute('negated');
    }
    if (xmlOutVariable.getElementsByTagName('position') !== undefined) {
      const posistion = xmlOutVariable.getElementsByTagName('position')[0];
      this.position = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
    }
    if (xmlOutVariable.getElementsByTagName('relPosition') !== undefined) {
      const posistion = xmlOutVariable.getElementsByTagName('relPosition')[0];
      this.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
    }
  }
}
