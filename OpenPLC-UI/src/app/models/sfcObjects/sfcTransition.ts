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
  public conditionNegated = false;


  constructor(xmlTransition: any) {
    if (xmlTransition === '') {
      this.createXML();
    } else {
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
          if (item.parentNode.tagName !== 'condition') {
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
            if (connection[0] !== undefined) {
              refLocId = connection[0].getAttribute('refLocalId');
              formalParam = connection[0].getAttribute('formalParameter');
            }
            this.connectionPointIn = {x: inX, y: inY, refLocalId: refLocId, formalParameter: formalParam};
          }
        }
      }
      if (xmlTransition.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlTransition.getElementsByTagName('connectionPointOut')) {
          if (item.parentNode.tagName !== 'condition') {
            const relPos = item.getElementsByTagName('relPosition');
            let outX: any;
            let outY: any;
            let refLocId: 0;
            let formalParam: '';
            if (relPos[0] !== undefined) {
              outX = relPos[0].getAttribute('x');
              outY = relPos[0].getAttribute('y');
            }
            const connection = item.getElementsByTagName('connection');
            if (connection[0] !== undefined) {
              refLocId = connection[0].getAttribute('refLocalId');
              formalParam = connection[0].getAttribute('formalParameter');
            }
            this.connectionPointOut = {x: outX, y: outY, refLocalId: refLocId, formalParameter: formalParam};
          }
        }
      }
      if (xmlTransition.getElementsByTagName('position') !== undefined) {
        const position = xmlTransition.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }

      if (xmlTransition.getElementsByTagName('condition') !== undefined) {
        const condition = xmlTransition.getElementsByTagName('condition');
        this.conditionNegated = condition[0].getAttribute('negated');
        if (condition[0].getElementsByTagName('inline') !== undefined) {
          const inline = condition[0].getElementsByTagName('inline');
          this.conditionInlineName = inline[0].getAttribute('name');
        }
        if (condition[0].getElementsByTagName('reference') !== undefined) {
          const inline = condition[0].getElementsByTagName('reference');
          this.conditionReferenceName = inline[0].getAttribute('name');
        }
        for (const item of condition[0].getElementsByTagName('connectionPointIn')) {
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
          if (connection[0] !== undefined) {
            refLocId = connection[0].getAttribute('refLocalId');
            formalParam = connection[0].getAttribute('formalParameter');
          }
          this.conditionConnectionPointIn = {x: inX, y: inY, refLocalId: refLocId, formalParameter: formalParam};
        }
      }
    }
  }
  createXML(): void {
    const xmlString = '<transition localId="0" height="50" width="30">\n' +
      '<position x="0" y="0"/>\n' +
      '<connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut>\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '<condition negated="false">' +
        '<reference name="">' +
        '<connectionPointIn>\n' +
        ' <relPosition x="0" y="0"/>\n' +
        '</connectionPointIn>\n' +
        '<inline name="">' +
        '</inline>' +
      '</reference>' +
      '</condition>' +
      '              </transition>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('transition')[0];
  }
}
