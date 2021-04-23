import { Node } from '@swimlane/ngx-graph';

export interface ConnectionPoint {
    type:            string,
    sourceId?:       string,
    targetId?:       string,
    edgeId?:         string,
    relPosition?:    Vector2,
    connectionPath?: Vector2, 
}

export interface Vector2{
    x: number,
    y: number
}



export interface PLCNode extends Node {
    type: string,
    connectionPoints: ConnectionPoint[],
}