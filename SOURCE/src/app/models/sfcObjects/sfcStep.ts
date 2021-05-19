/**
 * @Filename : sfcStep.ts
 *
 * @Author : Franziska Kopp
 *
 * @Last_Modified : 19.05.2021
 *
 */

export class SfcStep
{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public negated = false;
  public name = '';
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public connectionPointOutAction: {x: 0, y: 0};
  public position: {x: 0, y: 0};
  public initialStep = false;

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlStep: any) {
    if (xmlStep === '') {
      this.createXML();
    } else {
      this.xml = xmlStep;
      if (xmlStep.getAttribute('localId') !== undefined) {
        this.localId = xmlStep.getAttribute('localId');
      }
      if (xmlStep.getAttribute('height') !== undefined) {
        this.height = xmlStep.getAttribute('height');
      }
      if (xmlStep.getAttribute('width') !== undefined) {
        this.width = xmlStep.getAttribute('width');
      }
      if (xmlStep.getAttribute('negated') !== true) {
        this.negated = xmlStep.getAttribute('negated');
      }
      if (xmlStep.getAttribute('name') !== undefined) {
        this.name = xmlStep.getAttribute('name');
      }
      if (xmlStep.getAttribute('initialStep') !== undefined) {
        this.initialStep = xmlStep.getAttribute('initialStep');
      }
      if (xmlStep.getElementsByTagName('connectionPointIn') !== undefined) {
        for (const item of xmlStep.getElementsByTagName('connectionPointIn')) {
          const relPos = item.getElementsByTagName('relPosition');
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.connectionPointIn = {x: inX, y: inY};
        }
      }
      if (xmlStep.getElementsByTagName('connectionPointOut') !== undefined) {
        for (const item of xmlStep.getElementsByTagName('connectionPointOut')) {
          const relPos = item.getElementsByTagName('relPosition');
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOut = {x: outX, y: outY};
        }
      }
      if (xmlStep.getElementsByTagName('connectionPointOutAction') !== undefined) {
        for (const item of xmlStep.getElementsByTagName('connectionPointOutAction')) {
          const relPos = item.getElementsByTagName('relPosition');
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOutAction = {x: outX, y: outY};
        }
      }
      if (xmlStep.getElementsByTagName('position') !== undefined) {
        const position = xmlStep.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
  }

  // creates a default xml-file for the object
  createXML(): void {
    const xmlString = '<step localId="0" height="50" width="30" name="" initialStep="false" negated="false">\n' +
      '<position x="0" y="0"/>\n' +
      '   <connectionPointIn>\n' +
      ' <relPosition x="0" y="0"/>\n' +
      '</connectionPointIn>\n' +
      '<connectionPointOut formalParameter="">\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOut>\n' +
      '<connectionPointOutAction formalParameter="">\n' +
      '<relPosition x="0" y="0"/>\n' +
      ' </connectionPointOutAction>\n' +
      '              </step>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml').getElementsByTagName('step')[0];
  }
// updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }
  // updates relevant attributes
  updateAttributes(localId: number, name: string, negated: string, initialStep: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('name', name);
    this.xml.setAttribute('negated', negated);
    this.xml.setAttribute('initialStep', initialStep);
  }
// updates refId of ConnectionPointIn
  change_refid(newRef): void {
    this.xml.getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
  }
}
