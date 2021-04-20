export class CommonContinuation{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointOut: {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public position: {x: 0, y: 0};

  constructor(xmlCommonContinuation: any) {
    if (xmlCommonContinuation === ''){
      this.createXML();
    } else {
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
      if ( xmlCommonContinuation.getElementsByTagName('connectionPointOut')  !== undefined) {
        const connectionPointOut = xmlCommonContinuation.getElementsByTagName('connectionPointOut')[0];
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
    }
  }

  createXML(): void{
    const xmlString = '<continuation localId="0" height="50" width="30" name=""  >\n' +
      '<position x="0" y="0"/>\n' +
    '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      '</connectionPointOut>\n' +
      '              </continuation>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('continuation')[0];
    this.xml = this.xml.getElementsByTagName('continuation')[0];
  }
}
