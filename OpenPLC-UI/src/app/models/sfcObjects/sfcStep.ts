export class SfcStep
{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public name = '';
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public connectionPointOutAction: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlStep: any) {
    this.xml = xmlStep;
    if (xmlStep.getAttribute('localId') !== undefined){
      this.localId = xmlStep.getAttribute('localId');
    }
    if (xmlStep.getAttribute('height') !== undefined){
      this.localId = xmlStep.getAttribute('height');
    }
    if (xmlStep.getAttribute('width') !== undefined){
      this.localId = xmlStep.getAttribute('width');
    }
    if (xmlStep.getAttribute('negated') !== true){
      this.localId = xmlStep.getAttribute('negated');
    }
    if (xmlStep.getAttribute('name') !== undefined){
      this.localId = xmlStep.getAttribute('name');
    }
    if (xmlStep.getElementsByTagName('connectionPointIn') !== undefined){
      for (const item of xmlStep.getElementsByTagName('connectionPointIn')){
        const relPos = item.getElementsByTagName('relPosition');
        const inX = relPos[0].getAttribute('x');
        const inY = relPos[0].getAttribute('y');
        this.connectionPointIn = {x: inX, y: inY};
      }
    }
    if (xmlStep.getElementsByTagName('connectionPointOut') !== undefined){
      for (const item of xmlStep.getElementsByTagName('connectionPointOut')){
        const relPos = item.getElementsByTagName('relPosition');
        const outX = relPos[0].getAttribute('x');
        const outY = relPos[0].getAttribute('y');
        this.connectionPointOut = {x: outX, y: outY};
      }
    }
    if (xmlStep.getElementsByTagName('connectionPointOutAction') !== undefined){
      for (const item of xmlStep.getElementsByTagName('connectionPointOutAction')){
        const relPos = item.getElementsByTagName('relPosition');
        const outX = relPos[0].getAttribute('x');
        const outY = relPos[0].getAttribute('y');
        this.connectionPointOutAction = {x: outX, y: outY};
      }
    }
    if (xmlStep.getElementsByTagName('position') !== undefined){
      const position = xmlStep.getElementsByTagName('position')[0];
      this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
