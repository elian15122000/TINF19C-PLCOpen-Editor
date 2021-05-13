/**
 * @Filename : variable.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */
export class Variable {
  public xml: any;
  public class = 'local';
  public option = '';
  public name = 'variable';
  public type = 'BOOL';
  public iec = '';
  public init = '';
  public documentation = '';

  // check if imported xml ist empty, then create xml, otherwise reads relevant values of xml- file
  constructor(xmlVariable: any, varClass: string, varOption: string) {
    if (xmlVariable !== '') {
      this.class = varClass;
      this.option = varOption;

      if (xmlVariable.getAttribute('address') !== undefined){
        this.iec = xmlVariable.getAttribute('address');
      }
      if (xmlVariable.getElementsByTagName('documentation') !== undefined) {
        if (xmlVariable.getElementsByTagName('documentation')[0] !== undefined) {
          if (xmlVariable.getElementsByTagName('documentation')[0].children[0] !== undefined) {
            this.documentation = xmlVariable.getElementsByTagName('documentation')[0].children[0].innerText;
          }
        }
      }
      if (xmlVariable.getElementsByTagName('simpleValue') !== undefined){
        const init = xmlVariable.getElementsByTagName('simpleValue')[0];
        if (init !== undefined){
          this.init = init.getAttribute('value');
        }
      }
      if (xmlVariable.getAttribute('name') !== undefined){
        this.name = xmlVariable.getAttribute('name');
      }
      if (xmlVariable.getElementsByTagName('type') !== undefined) {
        if (xmlVariable.getElementsByTagName('derived').length > 0){
          const derived = xmlVariable.getElementsByTagName('derived')[0];
          this.type = derived.getAttribute('name');
        }
        else {
          const types = ['BOOL', 'SINT', 'INT', 'DINT', 'LINT', 'USINT', 'UINT', 'UDINT', 'ULINT',
            'REAL', 'LREAL', 'TIME', 'DATE', 'TOD', 'DT', 'STRING', 'BYTE', 'WORD', 'DWORD', 'LWORD'];
          for (const type of types) {
            if (xmlVariable.getElementsByTagName(type).length > 0) {
              this.type = type;
            }
          }
        }
      }
    }
    this.createXML();
  }

  // creates a default xml-file for the object
  createXML(): void {
    let variableString = '<variable name="' + this.name + '" address="' + this.iec + '">\n' +
      '              <type>\n' +
      '                <' + this.type + '/>\n' +
      '              </type>\n' +
      '              <initialValue>\n' +
      '                <simpleValue value="' + this.init + '"/>\n' +
      '              </initialValue>\n' +
      '              <documentation>\n' +
      '              </documentation>\n' +
      '            </variable>\n';

    const parser = new DOMParser();

    switch (this.class) {
      case 'local': variableString = '\n<localVars>\n' + variableString + '</localVars>\n\n';
                    const variableXML1 = parser.parseFromString(variableString, 'application/xml');
                    this.xml = variableXML1.getElementsByTagName('localVars')[0];
                    break;
      case 'input': variableString = '\n<inputVars>\n' + variableString + '</inputVars>\n';
                    const variableXML2 = parser.parseFromString(variableString, 'application/xml');
                    this.xml = variableXML2.getElementsByTagName('inputVars')[0];
                    break;
      case 'output': variableString = '<outputVars>\n' + variableString + '</outputVars>\n';
                     const variableXML3 = parser.parseFromString(variableString, 'application/xml');
                     this.xml = variableXML3.getElementsByTagName('outputVars')[0];
                     break;
      case 'external': variableString = '<externalVars>\n' + variableString + '</externalVars>\n';
                       const variableXML4 = parser.parseFromString(variableString, 'application/xml');
                       this.xml = variableXML4.getElementsByTagName('externalVars')[0];
                       break;
      case 'temp': variableString = '<tempVars>\n' + variableString + '</tempVars>\n';
                   const variableXML5 = parser.parseFromString(variableString, 'application/xml');
                   this.xml = variableXML5.getElementsByTagName('tempVars')[0];
                   break;
      case 'inOut': variableString = '<inOutVars>\n' + variableString + '</inOutVars>\n';
                    const variableXML6 = parser.parseFromString(variableString, 'application/xml');
                    this.xml = variableXML6.getElementsByTagName('inOutVars')[0];
                    break;
      default: variableString = '<localVars>\n' + variableString + '</localVars>\n';
               const variableXML7 = parser.parseFromString(variableString, 'application/xml');
               this.xml = variableXML7.getElementsByTagName('localVars')[0];
    }

  }
}

