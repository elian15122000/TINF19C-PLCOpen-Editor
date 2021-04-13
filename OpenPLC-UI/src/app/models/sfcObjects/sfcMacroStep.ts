export class SfcMacroStep {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public name = '';
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlMacroStep: any) {
    this.xml = xmlMacroStep;
    if (xmlMacroStep.getAttribute('localId') !== undefined){
      this.localId = xmlMacroStep.getAttribute('localId');
    }
    if (xmlMacroStep.getAttribute('height') !== undefined){
      this.height = xmlMacroStep.getAttribute('height');
    }
    if (xmlMacroStep.getAttribute('width') !== undefined){
      this.width = xmlMacroStep.getAttribute('width');
    }
    if (xmlMacroStep.getAttribute('name') !== undefined){
      this.name = xmlMacroStep.getAttribute('name');
    }
    if (xmlMacroStep.getElementsByTagName('position') !== undefined){
      const position = xmlMacroStep.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlMacroStep.getElementsByTagName('connectionPointIn') !== undefined) {
      for (const item of xmlMacroStep.getElementsByTagName('connectionPointIn')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.connectionPointIn = {x: inX, y: inY};
        }
      }
    }
    if (xmlMacroStep.getElementsByTagName('connectionPointOut') !== undefined) {
      for (const item of xmlMacroStep.getElementsByTagName('connectionPointOut')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOut = {x: outX, y: outY};
        }
      }
    }
  }
}
