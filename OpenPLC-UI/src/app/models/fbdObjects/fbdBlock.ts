import {Node} from '@swimlane/ngx-graph';

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
  public node: Node = {id: null, label: null, type: null, pins: null};
  public edges: string[] = [];

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
    this.node.id = this.localId;
    this.node.type = 'fbs';
    this.node.label = this.typeName;
    this.node.position = {x: 300, y: 600};
    console.log(this.node.position);
  }

  readInputVariable(xmlVariable: any): any {
    const variable = {
      formalParameter: '',
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

  readOutputVariable(xmlVariable: any): any {
    const variable = {
      formalParameter: '',
      negated: false,
      connectionPointOut: {x: 0, y: 0, refLocalID: null}
    };
    if (xmlVariable.getAttribute('formalParameter') !== undefined){
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

  createNewBlock(): void {
    const xmlString = '<block localId="0" typeName="" instanceName="" height="50" width="30"> \n' +
      '              <position x="0" y="0"/> \n' +
      '              <inputVariables/> \n' +
      '              <inOutVariables/> \n' +
      '              <outputVariables/> \n' +
      '            </block> ';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    this.xml = this.xml.getElementsByTagName('block')[0];
  }
}
