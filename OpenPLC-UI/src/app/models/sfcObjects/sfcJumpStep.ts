export class SfcJumpStep {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public targetName = '';
  public connectionPointIn: {x: 0, y: 0};
  public position: {x: 0, y: 0};

constructor(xmlJumpStep: any) {
  this.xml = xmlJumpStep;
  if (xmlJumpStep.getAttribute('localId') !== undefined){
    this.localId = xmlJumpStep.getAttribute('localId');
  }
  if (xmlJumpStep.getAttribute('height') !== undefined){
    this.height = xmlJumpStep.getAttribute('height');
  }
  if (xmlJumpStep.getAttribute('width') !== undefined){
    this.width = xmlJumpStep.getAttribute('width');
  }
  if (xmlJumpStep.getAttribute('targetName') !== undefined){
    this.targetName = xmlJumpStep.getAttribute('targetName');
  }
  if (xmlJumpStep.getElementsByTagName('relPosition') !== undefined){
    const position = xmlJumpStep.getElementsByTagName('relPosition')[0];
    this.connectionPointIn = {x: position.getAttribute('x'), y: position.getAttribute('y')};
  }
  if (xmlJumpStep.getElementsByTagName('position') !== undefined){
    const position = xmlJumpStep.getElementsByTagName('position')[0];
    this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
  }
}
}
