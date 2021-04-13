export class SfcSelectionDivergence{
  public xml: any;
  public localId: number;
  public globalId: number;
  public height = 20;
  public width = 20;
  public connectionPointIn: {x: 0, y: 0};
  public connectionPointOut: {x: 0, y: 0};
  public position: {x: 0, y: 0};

  constructor(xmlSelDivergence: any) {
    this.xml = xmlSelDivergence;
    if (xmlSelDivergence.getAttribute('localId') !== undefined){
      this.localId = xmlSelDivergence.getAttribute('localId');
    }
    if (xmlSelDivergence.getAttribute('globalId') !== undefined){
      this.globalId = xmlSelDivergence.getAttribute('globalId');
    }
    if (xmlSelDivergence.getAttribute('height') !== undefined){
      this.height = xmlSelDivergence.getAttribute('height');
    }
    if (xmlSelDivergence.getAttribute('width') !== undefined){
      this.width = xmlSelDivergence.getAttribute('width');
    }
    if (xmlSelDivergence.getElementsByTagName('connectionPointIn') !== undefined) {
      for (const item of xmlSelDivergence.getElementsByTagName('connectionPointIn')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const inX = relPos[0].getAttribute('x');
          const inY = relPos[0].getAttribute('y');
          this.connectionPointIn = {x: inX, y: inY};
        }
      }
    }
    if (xmlSelDivergence.getElementsByTagName('connectionPointOut') !== undefined) {
      for (const item of xmlSelDivergence.getElementsByTagName('connectionPointOut')) {
        const relPos = item.getElementsByTagName('relPosition');
        if (relPos[0] !== undefined) {
          const outX = relPos[0].getAttribute('x');
          const outY = relPos[0].getAttribute('y');
          this.connectionPointOut = {x: outX, y: outY};
        }
      }
    }
    if (xmlSelDivergence.getElementsByTagName('position') !== undefined){
      const position = xmlSelDivergence.getElementsByTagName('position')[0];
      this.position = {x: position.getAttribute('x'), y: position.getAttribute('y')};
    }
  }
}


