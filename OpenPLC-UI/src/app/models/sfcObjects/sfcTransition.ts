export class SfcTransition {
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0, refLocalId: 0, formalParameter: string};
  public connectionPointOut: {x: 0, y: 0, refLocalId: 0, formalParameter: string};
  public position: {x: 0, y: 0};
  public conditionReferenceName = '';
  public conditionConnectionPointIn: {x: 0, y: 0, refLocalId: 0, formalParameter: string};
  public conditionInlineName = '';



  constructor(xmlTransition: any) {
    this.xml = xmlTransition;
    if (xmlTransition.getAttribute('localId') !== undefined) {
      this.localId = xmlTransition.getAttribute('localId');
    }
    if (xmlTransition.getAttribute('height') !== undefined) {
      this.height = xmlTransition.getAttribute('height');
    }
    if (xmlTransition.getAttribute('width') !== undefined) {
      this.width = xmlTransition.getAttribute('width');
    }
    if (xmlTransition.getElementsByTagName('connectionPointIn') !== undefined) {
      for (const item of xmlTransition.getElementsByTagName('connectionPointIn')) {
        if (item.parentNode.tagName !== 'condition'){
          const relPos = item.getElementsByTagName('relPosition');
          let inX: any;
          let inY: any;
          let refLocId: 0;
          let formalParam: '';
          if (relPos[0] !== undefined) {
            inX = relPos[0].getAttribute('x');
            inY = relPos[0].getAttribute('y');
          }
          const connection = item.getElementsByTagName('connection');
          if (connection[0] !== undefined){
            refLocId = connection[0].getAttribute('refLocalId');
            formalParam = connection[0].getAttribute('formalParameter');
          }
          this.connectionPointIn = {x: inX, y: inY, refLocalId: refLocId, formalParameter: formalParam};
        }
      }
    }
    if (xmlTransition.getElementsByTagName('connectionPointOut') !== undefined) {
      for (const item of xmlTransition.getElementsByTagName('connectionPointOut')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOut = {x: outX, y: outY, refLocalId: 0, formalParameter: 'test'};
        }
      }
    }
    if (xmlTransition.getElementsByTagName('position') !== undefined){
      const position = xmlTransition.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
