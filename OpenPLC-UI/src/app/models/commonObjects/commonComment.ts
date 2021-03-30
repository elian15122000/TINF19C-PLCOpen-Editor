export class CommonComment{
  public xml: any;
  public localId: number;
  public height = 20;
  public width = 20;
  public content = '';
  public position: {x: 0, y: 0};

  constructor(xmlCommonComment: any) {
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
}
