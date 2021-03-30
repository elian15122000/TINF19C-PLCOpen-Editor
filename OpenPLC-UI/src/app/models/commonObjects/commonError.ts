export class CommonError{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public content = '';
  public position: {x: 0, y: 0};

  constructor(xmlCommonError: any) {
    this.xml = xmlCommonError;
    if (xmlCommonError.getAttribute('localId') !== undefined){
      this.localId = xmlCommonError.getAttribute('localId');
    }
    if (xmlCommonError.getAttribute('height') !== undefined){
      this.height = xmlCommonError.getAttribute('height');
    }
    if (xmlCommonError.getAttribute('width') !== undefined){
      this.width = xmlCommonError.getAttribute('width');
    }
    if (xmlCommonError.getAttribute('content') !== undefined){
      this.content = xmlCommonError.getElementsByTagName('content')[0].children[0].innerText;
    }
    if (xmlCommonError.getElementsByTagName('position') !== undefined) {
      const position = xmlCommonError.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}
