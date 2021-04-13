export class FbdInOutVariable {
  public xml: any;
  public name = '';
  public localId: number;
  public height = 20;
  public width = 20;
  public negatedIn = false;
  public negatedOut = false;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public connectionPointIn: { x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};
  public connectionPointOut: {x: number, y: number, refLocalID: number} = {x: 0, y: 0, refLocalID: 0};

  constructor(xmlInOutVariable: any) {
    if (xmlInOutVariable === '') {
      this.createNewInOutVariable();
    }
    else {
      this.xml = xmlInOutVariable;
      if (xmlInOutVariable.getElementsByTagName('expression') !== undefined) {
        this.name = xmlInOutVariable.getElementsByTagName('expression')[0].innerHTML;
      }
      this.localId = xmlInOutVariable.getAttribute('localId');
      if (xmlInOutVariable.getAttribute('width') !== undefined) {
        this.width = xmlInOutVariable.getAttribute('width');
      }
      if (xmlInOutVariable.getAttribute('height') !== undefined) {
        this.height = xmlInOutVariable.getAttribute('height');
      }
      if (xmlInOutVariable.getAttribute('negatedIn') === true) {
        this.negatedIn = true;
      }
      if (xmlInOutVariable.getAttribute('negatedOut') === true) {
        this.negatedIn = true;
      }
      if (xmlInOutVariable.getElementsByTagName('position') !== undefined) {
        const position = xmlInOutVariable.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if ( xmlInOutVariable.getElementsByTagName('connectionPointIn')  !== undefined) {
        const connectionPointIn = xmlInOutVariable.getElementsByTagName('connectionPointIn')[0];
        if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointIn.getElementsByTagName('relPosition')[0];
          this.connectionPointIn.x = position.getAttribute('x');
          this.connectionPointIn.y = position.getAttribute('y');
        }
        if (connectionPointIn.getElementsByTagName('connection') !== undefined) {
          const connection = connectionPointIn.getElementsByTagName('connection')[0];
          this.connectionPointIn.refLocalID = connection.getAttribute('refLocalID');
        }
      }
      if ( xmlInOutVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
        const connectionPointOut = xmlInOutVariable.getElementsByTagName('connectionPointOut')[0];
        if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
          const position = connectionPointOut.getElementsByTagName('relPosition')[0];
          this.connectionPointOut.x = position.getAttribute('x');
          this.connectionPointOut.y = position.getAttribute('y');
        }
        if (connectionPointOut.getElementsByTagName('connection') !== undefined) {
          const connection = connectionPointOut.getElementsByTagName('connection')[0];
          this.connectionPointOut.refLocalID = connection.getAttribute('refLocalID');
        }
      }
    }

  }

  createNewInOutVariable(): void {
    const xmlString = '<inOutVariable localId="0" height="20" width="20" negated="false" > \n' +
      '              <position x="0" y="0"/> \n' +
      '              <connectionPointIn> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointIn> \n' +
      '              <connectionPointOut> \n' +
      '                <relPosition x="0" y="0"/> \n' +
      '              </connectionPointOut> \n' +
      '            </inOutVariable> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('inOutVariable')[0];
  }
}
