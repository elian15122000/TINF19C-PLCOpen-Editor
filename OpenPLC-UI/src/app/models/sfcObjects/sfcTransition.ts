export class SfcTransition {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlTransition: any) {
    this.xml = xmlTransition;
    if (xmlTransition.getAttribute('localId') !== undefined) {
      this.localId = xmlTransition.getAttribute('localId');
    }
    if (xmlTransition.getAttribute('height') !== undefined) {
      this.height = xmlTransition.getAttribute('height');
    }
    if (xmlTransition.getAttribute('width') !== undefined) {
      this.width = xmlTransition.getAttribute('width');
    }
    if (xmlTransition.getElementsByTagName('connectionPointIn') !== undefined) {
      for (const item of xmlTransition.getElementsByTagName('connectionPointIn')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.connectionPointIn = {x: inX, y: inY};
        }
      }
    }
    if (xmlTransition.getElementsByTagName('connectionPointOut') !== undefined) {
      for (const item of xmlTransition.getElementsByTagName('connectionPointOut')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOut = {x: outX, y: outY};
        }
      }
    }
    if (xmlTransition.getElementsByTagName('position') !== undefined){
      const position = xmlTransition.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
