export class FbdBlock {
  public xml: any;
  public typeName: string;
  public instanceName: string;
  public localId: number;
  public width = 30;
  public height = 50;
  public position: {x: number, y: number} = {x: 0, y: 0};
  public inputVariables: any[] = [];
  public inOutVariables: any[] = [];
  public outputVariables: any[] = [];

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
      if (xmlBlock.getElementsByTagName('position') !== undefined) {
        const position = xmlBlock.getElementsByTagName('position')[0];
        this.position = { x: position.getAttribute('x'), y: position.getAttribute('y')};
      }

      if (xmlBlock.getElementsByTagName('inputVariables') !== undefined) {
        const inputVariables = xmlBlock.getElementsByTagName('inputVariables')[0];
        for (const variable of inputVariables.getElementsByTagName('variable')) {
          this.inputVariables.push(this.readInputVariable(variable));
        }
      }
      if (xmlBlock.getElementsByTagName('outputVariables') !== undefined) {
        const outputVariables = xmlBlock.getElementsByTagName('outputVariables')[0];
        for (const variable of outputVariables.getElementsByTagName('variable')) {
          this.outputVariables.push(this.readOutputVariable(variable));
        }
      }
      if (xmlBlock.getElementsByTagName('inOutVariables') !== undefined) {
        const inOutVariables = xmlBlock.getElementsByTagName('inOutVariables')[0];
        for (const variable of inOutVariables.getElementsByTagName('variable')) {
          this.inOutVariables.push(this.readInOutVariable(variable));
        }
      }
    }
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
