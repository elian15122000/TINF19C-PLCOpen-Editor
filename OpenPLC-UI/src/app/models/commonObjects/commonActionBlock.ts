export class CommonActionBlock{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public position: {x: 0, y: 0};
  public actionRelPosition: {x: 0, y: 0};
  public actionReferenceName = '';
  // TODO: public actionConnectionPointOut = {x: 0, y: 0};
  public actionLocalId: number;
  public actionQualifier: string;
  public actionHeight = 20;
  public actionWidth = 20;
  public actionDuration = '';
  public actionIndicator = '';
  public connectionPointIn: {x: 0, y: 0};

  constructor(xmlCommonActionBlock: any) {
    this.xml = xmlCommonActionBlock;
    if (xmlCommonActionBlock.getAttribute('localId') !== undefined){
      this.localId = xmlCommonActionBlock.getAttribute('localId');
    }
    if (xmlCommonActionBlock.getAttribute('height') !== undefined){
      this.height = xmlCommonActionBlock.getAttribute('height');
    }
    if (xmlCommonActionBlock.getAttribute('width') !== undefined){
      this.width = xmlCommonActionBlock.getAttribute('width');
    }
    if (xmlCommonActionBlock.getAttribute('negated') !== undefined){
      this.negated = xmlCommonActionBlock.getAttribute('negated');
    }
    if (xmlCommonActionBlock.getElementsByTagName('position') !== undefined) {
      const position = xmlCommonActionBlock.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlCommonActionBlock.getElementsByTagName('connectionPointIn') !== undefined) {
      for (const item of xmlCommonActionBlock.getElementsByTagName('connectionPointIn')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.connectionPointIn = {x: inX, y: inY};
        }
      }
    }
    if (xmlCommonActionBlock.getElementsByTagName('action') !== undefined) {
      for (const item of xmlCommonActionBlock.getElementsByTagName('action')) {
        let i = 0;
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.actionRelPosition = {x: inX, y: inY};
        }
        const ref = item.getElementsByTagName('reference');
        if (ref[0] !== undefined){
          this.actionReferenceName = ref[0].getAttribute('name');
        }
        const action = xmlCommonActionBlock.getElementsByTagName('action');
        this.actionQualifier = action[i].getAttribute('qualifier');
        this.actionHeight = action[i].getAttribute('height');
        this.actionWidth = action[i].getAttribute('width');
        this.actionLocalId = action[i].getAttribute('localId');
        this.actionDuration = action[i].getAttribute('duration');
        this.actionIndicator = action[i].getAttribute('indicator');
        i += 1;
      }

    }
  }
  createXML(): void{
    const xmlString = '<comment localId="0" height="50" width="30"   >\n' +
      '              <position x="0" y="0"/>\n' +
      '              <content>\n' +
      '<xhtml:p><![CDATA[Testkommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
      '              </comment>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
  }
}
