export interface FbdInVariable {
  name: string;
  localId: number;
  height: number;
  width: number;
  negated: boolean;
  position: {x: number, y: number};
  connectionPointOut: {x: number, y: number};
}
