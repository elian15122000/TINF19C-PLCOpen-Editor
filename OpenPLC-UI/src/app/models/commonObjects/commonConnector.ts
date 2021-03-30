export class CommonConnector{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlCommonConnector: any) {
    this.xml = xmlCommonConnector;
    if (xmlCommonConnector.getAttribute('localId') !== undefined){
      this.localId = xmlCommonConnector.getAttribute('localId');
    }
    if (xmlCommonConnector.getAttribute('height') !== undefined){
      this.height = xmlCommonConnector.getAttribute('height');
    }
    if (xmlCommonConnector.getAttribute('width') !== undefined){
      this.width = xmlCommonConnector.getAttribute('width');
    }
    if (xmlCommonConnector.getElementsByTagName('position') !== undefined) {
      const position = xmlCommonConnector.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlCommonConnector.getElementsByTagName('relPosition') !== undefined){
      const position = xmlCommonConnector.getElementsByTagName('relPosition')[0];
      this.connectionPointIn = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
