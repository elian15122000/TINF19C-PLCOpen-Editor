export class CommonContinuation{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlCommonContinuation: any) {
    this.xml = xmlCommonContinuation;
    if (xmlCommonContinuation.getAttribute('localId') !== undefined){
      this.localId = xmlCommonContinuation.getAttribute('localId');
    }
    if (xmlCommonContinuation.getAttribute('height') !== undefined){
      this.height = xmlCommonContinuation.getAttribute('height');
    }
    if (xmlCommonContinuation.getAttribute('width') !== undefined){
      this.width = xmlCommonContinuation.getAttribute('width');
    }
    if (xmlCommonContinuation.getElementsByTagName('position') !== undefined) {
      const position = xmlCommonContinuation.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlCommonContinuation.getElementsByTagName('relPosition') !== undefined){
      const position = xmlCommonContinuation.getElementsByTagName('relPosition')[0];
      this.connectionPointOut = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
