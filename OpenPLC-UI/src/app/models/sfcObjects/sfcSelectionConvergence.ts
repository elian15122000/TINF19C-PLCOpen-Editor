export class SfcSelectionConvergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: number, y: number, refLocalId: string, formalParameter: string} = {x: 0, y: 0, refLocalId: '', formalParameter: ''}; //TODO: List
  public connectionPointOut: {x: number, y: number, refLocalId: string, formalParameter: string} = {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public position: {x: 0, y: 0};

  constructor(xmlSelConvergence: any) {
    if (xmlSelConvergence === '') {
      this.createXML();
    } else {
      this.xml = xmlSelConvergence;
      if (xmlSelConvergence.getAttribute('localId') !== undefined) {
        this.localId = xmlSelConvergence.getAttribute('localId');
      }
      if (xmlSelConvergence.getAttribute('globalId') !== undefined) {
        this.globalId = xmlSelConvergence.getAttribute('globalId');
      }
      if (xmlSelConvergence.getAttribute('height') !== undefined) {
        this.height = xmlSelConvergence.getAttribute('height');
      }
      if (xmlSelConvergence.getAttribute('width') !== undefined) {
        this.width = xmlSelConvergence.getAttribute('width');
      }
      if (xmlSelConvergence.getElementsByTagName('connectionPointIn') !== undefined) {
        const connectionPointIn = xmlSelConvergence.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalId = connection.getAttribute('refLocalId');
          this.connectionPointIn.formalParameter = connection.getAttribute('formalParameter');
        }
      }
      if (xmlSelConvergence.getElementsByTagName('connectionPointOut') !== undefined) {
        const connectionPointOut = xmlSelConvergence.getElementsByTagName('connectionPointOut')[0];
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          this.connectionPointOut.x = position.getAttribute('x');
          this.connectionPointOut.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          this.connectionPointOut.refLocalId = connection.getAttribute('refLocalId');
          this.connectionPointOut.formalParameter = connection.getAttribute('formalParameter');
        }
      }
      if (xmlSelConvergence.getElementsByTagName('position') !== undefined) {
        const position = xmlSelConvergence.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
  }
  createXML(): void {
    const xmlString = '<selectionConvergence localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '              </selectionConvergence>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('selectionConvergence')[0];
  }
}
