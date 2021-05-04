import {Node} from '@swimlane/ngx-graph';
import { PLCNode } from '../PLCNode';

export class CommonVendorElement{
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public position: {x: 0, y: 0};
  public inputVariables: any[] = [];
  public inOutVariables: any[] = [];
  public outputVariables: any[] = [];
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  constructor(xmlCommonVendorElement: any) {
    this.xml = xmlCommonVendorElement;
    if (xmlCommonVendorElement.getAttribute('localId') !== undefined) {
      this.localId = xmlCommonVendorElement.getAttribute('localId');
    }
    if (xmlCommonVendorElement.getAttribute('height') !== undefined) {
      this.height = xmlCommonVendorElement.getAttribute('height');
    }
    if (xmlCommonVendorElement.getAttribute('width') !== undefined) {
      this.width = xmlCommonVendorElement.getAttribute('width');
    }
    if (xmlCommonVendorElement.getElementsByTagName('position') !== undefined) {
      const position = xmlCommonVendorElement.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
    if (xmlCommonVendorElement.getElementsByTagName('inputVariables') !== undefined) {
      const inputVariables = xmlCommonVendorElement.getElementsByTagName('inputVariables')[0];
      for (const variable of inputVariables.getElementsByTagName('variable')) {
        this.inputVariables.push(this.readInputVariable(variable));
      }
    }
    if (xmlCommonVendorElement.getElementsByTagName('outputVariables') !== undefined) {
      const outputVariables = xmlCommonVendorElement.getElementsByTagName('outputVariables')[0];
      for (const variable of outputVariables.getElementsByTagName('variable')) {
        this.outputVariables.push(this.readOutputVariable(variable));
      }
    }
    if (xmlCommonVendorElement.getElementsByTagName('inOutVariables') !== undefined) {
      const inOutVariables = xmlCommonVendorElement.getElementsByTagName('inOutVariables')[0];
      for (const variable of inOutVariables.getElementsByTagName('variable')) {
        this.inOutVariables.push(this.readInOutVariable(variable));
      }
    }
    this.node.id = this.localId;
    this.node.label = '';
    this.node.type = 'default';
  }

      readInputVariable(xmlVariable: any): any {
        const variable = {
          formalParameter: '',
          negated: false,
          connectionPointIn: {x: 0, y: 0}
        };
        if (xmlVariable.getAttribute('formalParameter') !== undefined){
          variable.formalParameter = xmlVariable.getAttribute('formalParameter');
        }
        if (xmlVariable.getAttribute('negated') === true){
          variable.negated = true;
        }
        if ( xmlVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
          const connectionPointIn = xmlVariable.getElementsByTagName('connectionPointIn')[0];
          if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
            const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
            variable.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
          }
        }
        return variable;
      }

      readOutputVariable(xmlVariable: any): any {
        const variable = {
          formalParameter: '',
          negated: false,
          connectionPointOut: {x: 0, y: 0}
        };
        if (xmlVariable.getAttribute('formalParameter') !== undefined){
          variable.formalParameter = xmlVariable.getAttribute('formalParameter');
        }
        if (xmlVariable.getAttribute('negated') === true){
          variable.negated = true;
        }
        if ( xmlVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
          const connectionPointOut = xmlVariable.getElementsByTagName('connectionPointOut')[0];
          if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
            const posistion = connectionPointOut.getElementsByTagName('relPosition')[0];
            variable.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
          }
        }
        return variable;
      }

      readInOutVariable(xmlVariable: any): any {
        const variable = {
          formalParameter: '',
          negated: false,
          connectionPointIn: {x: 0, y: 0},
          connectionPointOut: {x: 0, y: 0}
        };
        if (xmlVariable.getAttribute('formalParameter') !== undefined){
          variable.formalParameter = xmlVariable.getAttribute('formalParameter');
        }
        if (xmlVariable.getAttribute('negated') === true){
          variable.negated = true;
        }
        if ( xmlVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
          const connectionPointIn = xmlVariable.getElementsByTagName('connectionPointIn')[0];
          if (connectionPointIn.getElementsByTagName('relPosition') !== undefined) {
            const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
            variable.connectionPointIn = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
          }
        }
        if ( xmlVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
          const connectionPointOut = xmlVariable.getElementsByTagName('connectionPointOut')[0];
          if (connectionPointOut.getElementsByTagName('relPosition') !== undefined) {
            const posistion = connectionPointOut.getElementsByTagName('relPosition')[0];
            variable.connectionPointOut = { x: posistion.getAttribute('x'), y: posistion.getAttribute('y')};
          }
        }
        return variable;
      }

  createXML(): void{
    const xmlString = '<vendorElement localId="0" height="50" width="30" >\n' +
      '<position x="0" y="0"/>\n' +
      '              <content>\n' +
      '<xhtml:p><![CDATA[Kommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
      '              </vendorElement>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
    this.xml = this.xml.getElementsByTagName('error')[0];
    console.log(this.xml);
  }

  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  updateAttributes(localId: number): void{
    this.xml.setAttribute('localId', localId);
  }
}
