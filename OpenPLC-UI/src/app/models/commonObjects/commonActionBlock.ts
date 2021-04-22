import {Node} from '@swimlane/ngx-graph';

export class CommonActionBlock{
  public xml: any;
  public localId: string;
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
  public connectionPointIn: {x: 0, y: 0, refLocalId: '', formalParameter: ''};
  public node: Node = {id: null, label: null, type: null, pins: null};

  constructor(xmlCommonActionBlock: any) {
    if (xmlCommonActionBlock === ''){
      this.createXML();
    } else {
      this.xml = xmlCommonActionBlock;
      if (xmlCommonActionBlock.getAttribute('localId') !== undefined) {
        this.localId = xmlCommonActionBlock.getAttribute('localId');
      }
      if (xmlCommonActionBlock.getAttribute('height') !== undefined) {
        this.height = xmlCommonActionBlock.getAttribute('height');
      }
      if (xmlCommonActionBlock.getAttribute('width') !== undefined) {
        this.width = xmlCommonActionBlock.getAttribute('width');
      }
      if (xmlCommonActionBlock.getAttribute('negated') !== undefined) {
        this.negated = xmlCommonActionBlock.getAttribute('negated');
      }
      if (xmlCommonActionBlock.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonActionBlock.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
      if (xmlCommonActionBlock.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlCommonActionBlock.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          let inX: number;
          let inY: number;
          let refId = '';
          let formalParam = '';

          if (relPos[0] !== undefined) {
            inX = relPos[0].getAttribute('x');
            inY = relPos[0].getAttribute('y');
          }
          if (item.getElementsByTagName('connection')[0] !== undefined) {
            const connection = item.getElementsByTagName('connection')[0];
            refId = connection.getAttribute('refLocalId');
            formalParam = connection.getAttribute('formalParameter');
          }
          // this.connectionPointIn = {x: inX, y: inY, }
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
          if (ref[0] !== undefined) {
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
    this.node.id = this.localId;
    this.node.label = '';
    this.node.type = 'default';
    this.node.pins = {
      IN: {type: 'IN', refId: null, edge: null}
    };
    if (this.connectionPointIn.refLocalId != null){
      this.node.pins.IN.refId = this.connectionPointIn.refLocalId;
    }
  }
  createXML(): void{
    const xmlString = '<actionBlock localId="0" height="50" width="30" negated="false"   >\n' +
      '              <position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      '<action localId="0" qualifier="" width="30" height="30" duration="" indicator="">' +
      ' <relPosition x="0" y="0"/>\n' +
        '<reference name="">' +
        '</reference>' +
        '<connectionPointOut>\n' +
        '<relPosition x="0" y="0"/>\n' +
        '</connectionPointOut>\n' +
      '</action>' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '              </actionBlock>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('actionBlock')[0];
  }
}
