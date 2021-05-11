import { Node } from '@swimlane/ngx-graph';

export interface ConnectionPoint {
    type: string;
    sourcePoint?: string;
    targetPoint?: string;
    sourceId?: string;
    sourceName?: string;
    targetId?: string;
    targetName?: string;
    edgeId?: string;
    relPosition?: Vector2;
    connectionPath?: Vector2;
}

export interface Vector2{
    x: number;
    y: number;
}



export interface PLCNode extends Node {
    type: string;
    connectionPoints: ConnectionPoint[];
}

export interface ConnectionPointIn {
    sourcePoint?: string;
    targetPoint?: string;
    sourceId?: string;
    sourceName?: string;
    targetId?: string;
    targetName?: string;
    edgeId?: string;
    relPosition?: Vector2;
}

export interface ConnectionPointOut {
    sourcePoint?: string;
    sourceId?: string;
    sourceName?: string;
    edgeId?: string;
    relPosition?: Vector2;
}