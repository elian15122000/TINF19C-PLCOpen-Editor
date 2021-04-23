import { Node } from '@swimlane/ngx-graph';

export interface ConnectionPoint {
    type:           NodeTypes,
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

export enum NodeTypes {
    SOURCE,
    TARGET,
}

export interface PLCNode extends Node {
    type: string,
    connectionPoints: ConnectionPoint[],
}