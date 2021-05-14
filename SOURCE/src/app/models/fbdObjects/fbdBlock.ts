/**
 * @Filename : fbdBlock.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

import {ConnectionPoint, PLCNode} from '../PLCNode';

export class FbdBlock {
  public xml: any;
  public typeName: string;
  public instanceName: string;
  public localId: string;
  public width = 30;
  public height = 50;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public inputVariables: any[] = [];
  public inOutVariables: any[] = [];
  public outputVariables: any[] = [];
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: []};
  public edges: string[] = [];

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlBlock: any) {
    if (xmlBlock === ''){
      this.createNewBlock();
    } else {
      this.xml = xmlBlock;
      this.localId = xmlBlock.getAttribute('localId');
      if (xmlBlock.getAttribute('width') !== undefined) {
        this.width = xmlBlock.getAttribute('width');
      }
      if (xmlBlock.getAttribute('height') !== undefined) {
        this.height = xmlBlock.getAttribute('height');
      }
      if (xmlBlock.getAttribute('typeName') !== undefined) {
        this.typeName = xmlBlock.getAttribute('typeName');
      }
      if (xmlBlock.getAttribute('instanceName') !== undefined) {
        this.instanceName = xmlBlock.getAttribute('instanceName');
      }
      if (xmlBlock.getElementsByTagName('position')[0] !== undefined) {
        const position = xmlBlock.getElementsByTagName('position')[0];
        this.position = { x: Number(position.getAttribute('x')), y: Number(position.getAttribute('y'))};
      }

      if (xmlBlock.getElementsByTagName('inputVariables')[0] !== undefined) {
        const inputVariables = xmlBlock.getElementsByTagName('inputVariables')[0];
        for (const variable of inputVariables.getElementsByTagName('variable')) {
          this.inputVariables.push(this.readInputVariable(variable));
        }
      }
      if (xmlBlock.getElementsByTagName('outputVariables')[0] !== undefined) {
        const outputVariables = xmlBlock.getElementsByTagName('outputVariables')[0];
        for (const variable of outputVariables.getElementsByTagName('variable')) {
          this.outputVariables.push(this.readOutputVariable(variable));
        }
      }
      if (xmlBlock.getElementsByTagName('inOutVariables')[0] !== undefined) {
        const inOutVariables = xmlBlock.getElementsByTagName('inOutVariables')[0];
        for (const variable of inOutVariables.getElementsByTagName('variable')) {
          this.inOutVariables.push(this.readInOutVariable(variable));
        }
      }
    }

    // values that are relevant for illustration are written into nodes
    this.node.id = this.localId;
    this.node.type = 'fbs';

    if (this.instanceName !== undefined && this.instanceName !== null) {
      this.node.label = this.instanceName;
    }
    else {
      this.node.label = this.typeName + this.localId;
    }


    for (const variable of this.inputVariables){
      const newConnectionPointIn: ConnectionPoint = {
        type: 'IN',
        targetPoint: variable.formalParameter,
        targetName: this.node.label,
        sourceId: variable.connectionPointIn.refLocalID,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointIn);
    }
    for (const variable of this.outputVariables){
      const newConnectionPointOut: ConnectionPoint = {
        type: 'OUT',
        sourcePoint: variable.formalParameter,
        sourceName: this.node.label,
        sourceId: this.localId,
        targetId: variable.connectionPointOut.refLocalID,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointOut);
    }
  }

  // read values of the inputVariables
  readInputVariable(xmlVariable: any): any {
    const variable = {
      formalParameter: 'IN',
      negated: false,
      connectionPointIn: {x: 0, y: 0, refLocalID: null}
    };
    if (xmlVariable.getAttribute('formalParameter') !== undefined){
      variable.formalParameter = xmlVariable.getAttribute('formalParameter');
    }
    if (xmlVariable.getAttribute('negated') === true){
      variable.negated = true;
    }
    if ( xmlVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlVariable.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition')[0] !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        variable.connectionPointIn.x = posistion.getAttribute('x');
        variable.connectionPointIn.y = posistion.getAttribute('y');
      }
      if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointIn.getElementsByTagName('connection')[0];
        variable.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        this.edges.push(variable.connectionPointIn.refLocalID);
      }
    }
    return variable;
  }

  // read values of the outputVariables
  readOutputVariable(xmlVariable: any): any {
    const variable = {
      formalParameter: 'OUT',
      negated: false,
      connectionPointOut: {x: 0, y: 0, refLocalID: null}
    };
    if (xmlVariable.getAttribute('formalParameter') !== null){
      variable.formalParameter = xmlVariable.getAttribute('formalParameter');
    }
    if (xmlVariable.getAttribute('negated') === true){
      variable.negated = true;
    }
    if ( xmlVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointOut = xmlVariable.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointOut.getElementsByTagName('relPosition')[0] !== undefined) {
        const posistion = connectionPointOut.getElementsByTagName('relPosition')[0];
        variable.connectionPointOut.x = posistion.getAttribute('x');
        variable.connectionPointOut.y = posistion.getAttribute('y');
      }
      if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointOut.getElementsByTagName('connection')[0];
        variable.connectionPointOut.refLocalID = connection.getAttribute('refLocalId');
        this.edges.push(variable.connectionPointOut.refLocalID);
      }
    }
    return variable;
  }

  // read values of the inoutVariable
  readInOutVariable(xmlVariable: any): any {
    const variable = {
      formalParameter: '',
      negated: false,
      connectionPointIn: {x: 0, y: 0, refLocalID: null},
      connectionPointOut: {x: 0, y: 0, refLocalID: null}
    };
    if (xmlVariable.getAttribute('formalParameter') !== undefined){
      variable.formalParameter = xmlVariable.getAttribute('formalParameter');
    }
    if (xmlVariable.getAttribute('negated') === true){
      variable.negated = true;
    }
    if ( xmlVariable.getElementsByTagName('connectionPointIn')[0]  !== undefined) {
      const connectionPointIn = xmlVariable.getElementsByTagName('connectionPointIn')[0];
      if (connectionPointIn.getElementsByTagName('relPosition')[0] !== undefined) {
        const posistion = connectionPointIn.getElementsByTagName('relPosition')[0];
        variable.connectionPointIn.x = posistion.getAttribute('x');
        variable.connectionPointIn.y = posistion.getAttribute('y');
      }
      if (connectionPointIn.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointIn.getElementsByTagName('connection')[0];
        variable.connectionPointIn.refLocalID = connection.getAttribute('refLocalId');
        this.edges.push(variable.connectionPointIn.refLocalID);
      }
    }
    if ( xmlVariable.getElementsByTagName('connectionPointOut')[0]  !== undefined) {
      const connectionPointOut = xmlVariable.getElementsByTagName('connectionPointOut')[0];
      if (connectionPointOut.getElementsByTagName('relPosition')[0] !== undefined) {
        const posistion = connectionPointOut.getElementsByTagName('relPosition')[0];
        variable.connectionPointOut.x = posistion.getAttribute('x');
        variable.connectionPointOut.y = posistion.getAttribute('y');
      }
      if (connectionPointOut.getElementsByTagName('connection')[0] !== undefined) {
        const connection = connectionPointOut.getElementsByTagName('connection')[0];
        variable.connectionPointOut.refLocalID = connection.getAttribute('refLocalId');
        this.edges.push(variable.connectionPointOut.refLocalID);
      }
    }
    return variable;
  }

  // creates a default xml-file for the object
  createNewBlock(): void {
    const xmlString = '<block localId="0" typeName="" instanceName="" height="50" width="30"> \n' +
      '              <position x="0" y="0"/> \n' +
      '              <inputVariables/> \n' +
      '              <inOutVariables/> \n' +
      '              <outputVariables/> \n' +
      '            </block>\n ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('block')[0];
  }


  createVariableXML(): void {
    for (let i = 0; i < this.inputVariables.length; i++) {
      const xmlString = '<variable formalParameter="' + this.inputVariables[i].formalParameter + '">\n' +
        '                  <connectionPointIn>\n' +
        '                    <relPosition x="0" y="' + (20 + i * 10) + '"/>\n' +
        '                    <connection refLocalId="">\n' +
        '                    </connection>\n' +
        '                  </connectionPointIn>\n' +
        '                </variable>';

      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'application/xml');
      const variableXML = xml.getElementsByTagName('variable')[0];
      this.xml.getElementsByTagName('inputVariables')[0].appendChild(variableXML);
    }

    for (let i = 0; i < this.outputVariables.length; i++) {
      const xmlString = '<variable formalParameter="' + this.outputVariables[i].formalParameter + '">\n' +
        '                  <connectionPointOut>\n' +
        '                    <relPosition x="30" y="' + (20 + i * 10) + '"/>\n' +
        '                  </connectionPointOut>\n' +
        '                </variable>';
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'application/xml');
      const variableXML = xml.getElementsByTagName('variable')[0];
      this.xml.getElementsByTagName('outputVariables')[0].appendChild(variableXML);
    }

  }

  // updates attributes of position
  updatePosition(xPos: number, yPos: number): void {
    this.xml.getElementsByTagName('position')[0].setAttribute('x', xPos);
    this.xml.getElementsByTagName('position')[0].setAttribute('y', yPos);
  }

  // updates relevant attributes
  updateAttributes(localId: number, typeName: string, instanceName: string): void{
    this.xml.setAttribute('localId', localId);
    this.xml.setAttribute('typeName', typeName);
    this.xml.setAttribute('instanceName', instanceName);
  }

  // updates relevant attributes of the node
  updateNode(): void {
    this.node.id = this.localId;
    this.node.type = 'fbs';
    this.node.label = this.instanceName;

    for (const variable of this.inputVariables){
      const newConnectionPointIn: ConnectionPoint = {
        type: 'IN',
        targetPoint: variable.formalParameter,
        targetName: this.node.label,
        sourceId: variable.connectionPointIn.refLocalID,
        targetId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointIn);
    }
    for (const variable of this.outputVariables) {
      const newConnectionPointOut: ConnectionPoint = {
        type: 'OUT',
        sourcePoint: variable.formalParameter,
        sourceName: this.node.label,
        sourceId: this.localId,
        edgeId: null
      };
      this.node.connectionPoints.push(newConnectionPointOut);
    }
  }

  // updates refId of ConnectionPointIn
  change_refid(newRef, formalParameter: string): void {
    const variable = this.xml.getElementsByTagName('variable');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < variable.length; i++){
      if (variable[i].getAttribute('formalParameter') === formalParameter){
        variable[i].getElementsByTagName('connectionPointIn')[0].getElementsByTagName('connection')[0].setAttribute('refLocalId', newRef);
      }
    }
  }
}
