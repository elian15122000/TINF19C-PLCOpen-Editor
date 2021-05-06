export class Variable {
  public xml: Document;
  public class = 'local';
  public option = '';
  public name = 'a';
  public type = 'BOOL';
  public iec: any = '';
  public init: any = '';
  public documentation = '';


  constructor(xmlVariable: any, varClass: string, varOption: string) {
    if (xmlVariable !== '') {
      this.class = varClass;
      this.option = varOption;

      if (xmlVariable.getAttribute('address') !== undefined){
        this.iec = xmlVariable.getAttribute('address');
      }
      if (xmlVariable.getElementsByTagName('documentation') !== undefined) {
        if (xmlVariable.getElementsByTagName('documentation')[0] !== undefined) {
          this.documentation = xmlVariable.getElementsByTagName('documentation')[0].children[0].innerText;
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
    else {
      this.createXML();
    }
  }

  createXML(): void {

  }
}

