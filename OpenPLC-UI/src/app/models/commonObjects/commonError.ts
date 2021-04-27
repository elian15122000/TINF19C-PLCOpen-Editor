import {Node} from '@swimlane/ngx-graph';
import { PLCNode } from '../PLCNode';

export class CommonError{
  public xml: any;
  public localId: string;
  public height = 20;
  public width = 20;
  public content = '';
  public position: {x: 0, y: 0};
  public node: PLCNode = {id: null, label: null, type: null, connectionPoints: null};

  constructor(xmlCommonError: any) {
    if (xmlCommonError === '') {
      this.createXML();
    } else {
      this.xml = xmlCommonError;
      if (xmlCommonError.getAttribute('localId') !== undefined) {
        this.localId = xmlCommonError.getAttribute('localId');
      }
      if (xmlCommonError.getAttribute('height') !== undefined) {
        this.height = xmlCommonError.getAttribute('height');
      }
      if (xmlCommonError.getAttribute('width') !== undefined) {
        this.width = xmlCommonError.getAttribute('width');
      }
      if (xmlCommonError.getAttribute('content') !== undefined) {
        this.content = xmlCommonError.getElementsByTagName('content')[0].children[0].innerText;
      }
      if (xmlCommonError.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonError.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    this.node.id = this.localId;
    this.node.type = 'default';
  }
  createXML(): void{
    const xmlString = '<error localId="0" height="50" width="30" >\n' +
      '<position x="0" y="0"/>\n' +
      '              <content>\n' +
      '<xhtml:p><![CDATA[Kommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
      '              </error>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
    this.xml = this.xml.getElementsByTagName('error')[0];
  }
}
