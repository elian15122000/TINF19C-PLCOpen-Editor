export class CommonContinuation{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointOut: {x: 0, y: 0};
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
      if (xmlCommonContinuation.getElementsByTagName('relPosition') !== undefined){
        const position = xmlCommonContinuation.getElementsByTagName('relPosition')[0];
        this.connectionPointOut = {x: position.getAttribute('x'), y: position.getAttribute('y')};
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
    console.log(this.xml);
  }
}
