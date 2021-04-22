import {Node} from '@swimlane/ngx-graph';

export class CommonComment{
  public xml: any;
  public localId: string;
  public height = '20'; // TODO: als String
  public width = '20';
  public content = '';
  public position: {x: number, y: number} = {x: 0, y: 0};
  public node: Node = {id: null, label: null, type: null, pins: null};

  constructor(xmlCommonComment: any) {
    if (xmlCommonComment === ''){
      this.createXML();
    } else {
      this.xml = xmlCommonComment;
      if (xmlCommonComment.getAttribute('localId') !== undefined){
        this.localId = xmlCommonComment.getAttribute('localId');
      }
      if (xmlCommonComment.getAttribute('height') !== undefined){
        this.height = xmlCommonComment.getAttribute('height');
      }
      if (xmlCommonComment.getAttribute('width') !== undefined){
        this.width = xmlCommonComment.getAttribute('width');
      }
      if (xmlCommonComment.getAttribute('content') !== undefined){
        this.content = xmlCommonComment.getElementsByTagName('content')[0].children[0].innerText;
      }
      if (xmlCommonComment.getElementsByTagName('position') !== undefined) {
        const position = xmlCommonComment.getElementsByTagName('position')[0];
        this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
      }
    }
    this.node.id = this.localId;
    this.node.label = this.content;
    this.node.type = 'var';

  }
  createXML(): void{
    const xmlString = '<comment localId="0" height="50" width="30"   >\n' +
      '              <position x="0" y="0"/>\n' +
    '              <content>\n' +
      '<xhtml:p><![CDATA[Kommentar]]>\n</xhtml:p>\n' +
      '</content>\n' +
    '              </comment>\n';
    const parser = new DOMParser();
    this.xml = parser.parseFromString(xmlString, 'application/xml');
    const temp = this.xml.getElementsByTagName('parsererror')[0];
    temp.parentNode.removeChild(temp);
    this.xml = this.xml.getElementsByTagName('comment')[0];
  }
}
