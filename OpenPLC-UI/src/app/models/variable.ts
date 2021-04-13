export class Variable {
  public class = '';
  public option = '';
  public variables: {
    name: string,
    type: string,
    iec: any,
    init: any
    documentation: string;
  }[] = [];

  constructor(xmlVariable: any, varClass: string) {
    this.class = varClass;
    if (xmlVariable.getAttribute('constant') === 'true') {
      this.option = 'constant';
    } else if (xmlVariable.getAttribute('retain') === 'true') {
      this.option = 'retain';
    } else if (xmlVariable.getAttribute('nonretain') === 'true') {
      this.option = 'non-retain';
    }
    for (const item of xmlVariable.getElementsByTagName('variable')){
      const variable = {name: '', type: '', iec: '', init: '', documentation: ''};
      if (item.getAttribute('address') !== undefined){
        variable.iec = item.getAttribute('address');
      }
      if (item.getElementsByTagName('documentation') !== undefined) {
        if (item.getElementsByTagName('documentation')[0] !== undefined) {
          variable.documentation = item.getElementsByTagName('documentation')[0].children[0].innerText;
        }
      }
      if (item.getElementsByTagName('simpleValue') !== undefined){
        const init = item.getElementsByTagName('simpleValue')[0];
        if (init !== undefined){
          variable.init = init.getAttribute('value');
        }
      }
      if (item.getAttribute('name') !== undefined){
        variable.name = item.getAttribute('name');
      }

      if (item.getElementsByTagName('type') !== undefined) {
        if (item.getElementsByTagName('derived').length > 0){
          const derived = item.getElementsByTagName('derived')[0];
          variable.type = derived.getAttribute('name');
        }
        else {
          const types = ['BOOL', 'SINT', 'INT', 'DINT', 'LINT', 'USINT', 'UINT', 'UDINT', 'ULINT',
          'REAL', 'LREAL', 'TIME', 'DATE', 'TOD', 'DT', 'STRING', 'BYTE', 'WORD', 'DWORD', 'LWORD'];
          for (const type of types) {
            if (item.getElementsByTagName(type).length > 0) {
              variable.type = type;
            }
          }
        }
      }
      this.variables.push(variable);
    }
  }
}

