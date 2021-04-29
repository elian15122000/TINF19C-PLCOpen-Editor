import { Injectable } from '@angular/core';
import {FbdInVariable} from '../models/fbdObjects/fbdInVariable';
import {FbdOutVariable} from '../models/fbdObjects/fbdOutVariable';
import {FbdInOutVariable} from '../models/fbdObjects/fbdInOutVariable';
import {FbdJump} from '../models/fbdObjects/fbdJump';
import {FbdLabel} from '../models/fbdObjects/fbdLabel';
import {FbdReturn} from '../models/fbdObjects/fbdReturn';
import {FbdBlock} from '../models/fbdObjects/fbdBlock';
import {LdContact} from '../models/ldObjects/ldContact';
import {LdCoil} from '../models/ldObjects/ldCoil';
import {LdLeftPowerRail} from '../models/ldObjects/ldLeftPowerRail';
import {LdRightPowerRail} from '../models/ldObjects/ldRightPowerRail';
import {ConnectionPoint, PLCNode} from '../models/PLCNode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  elementCounter = 0;
  inVariableList: FbdInVariable[] = [];
  outVariableList: FbdOutVariable[] = [];
  inOutVariableList: FbdInOutVariable[] = [];
  jumpList: FbdJump[] = [];
  labelList: FbdLabel[] = [];
  returnList: FbdReturn[] = [];
  blockList: FbdBlock[] = [];
  contactList: LdContact[] = [];
  coilList: LdCoil[] = [];
  leftPowerRailList: LdLeftPowerRail[] = [];
  rightPowerRailList: LdRightPowerRail[] = [];
  nodes: PLCNode[] = [];
  update$: Subject<any> = new Subject();
  allConnectionPointIns: ConnectionPoint[] = [];
  allConnectionPointOuts: ConnectionPoint[] = [];
  allConnectionPoints: ConnectionPoint[] = [];
  server_connections: ConnectionPoint[] = [];

  constructor() { }

  loadPou(pou: any): void {
    this.elementCounter = 0;
    this.nodes = [];
    
    for (const inVariable of pou.getElementsByTagName('inVariable')) {
      const fbdInVariable = new FbdInVariable(inVariable);
      if (Number(fbdInVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdInVariable.localId);
      }
      this.inVariableList.push(fbdInVariable);
      this.nodes.push(fbdInVariable.node);
    }
    for (const outVariable of pou.getElementsByTagName('outVariable')) {
      const fbdOutVariable = new FbdOutVariable(outVariable);
      if (Number(fbdOutVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdOutVariable.localId);
      }
      this.outVariableList.push(fbdOutVariable);
      this.nodes.push(fbdOutVariable.node);
    }
    for (const inOutVariable of pou.getElementsByTagName('inOutVariable')) {
      const fbdInOutVariable = new FbdInOutVariable(inOutVariable);
      if (Number(fbdInOutVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdInOutVariable.localId);
      }
      this.inOutVariableList.push(fbdInOutVariable);
      this.nodes.push(fbdInOutVariable.node);
    }
    {
      for (const jump of pou.getElementsByTagName('jump')) {
        const fbdJump = new FbdJump(jump);
        if (Number(fbdJump.localId) > this.elementCounter){
          this.elementCounter = Number(fbdJump.localId);
        }
        this.jumpList.push(fbdJump);
        this.nodes.push(fbdJump.node);
      }
      for (const label of pou.getElementsByTagName('label')) {
        const fbdLabel = new FbdLabel(label);
        if (Number(fbdLabel.localId) > this.elementCounter){
          this.elementCounter = Number(fbdLabel.localId);
        }
        this.labelList.push(fbdLabel);
        this.nodes.push(fbdLabel.node);
      }
      for (const returnItem of pou.getElementsByTagName('return')) {
        const fbdReturn = new FbdReturn(returnItem);
        if (Number(fbdReturn.localId) > this.elementCounter){
          this.elementCounter = Number(fbdReturn.localId);
        }
        this.returnList.push(fbdReturn);
        this.nodes.push(fbdReturn.node);
      }
      for (const block of pou.getElementsByTagName('block')) {
        const fbdBlock = new FbdBlock(block);
        if (Number(fbdBlock.localId) > this.elementCounter){
          this.elementCounter = Number(fbdBlock.localId);
        }
        this.blockList.push(fbdBlock);
        this.nodes.push(fbdBlock.node);
      }
      for (const contact of pou.getElementsByTagName('contact')) {
        const ldContact = new LdContact(contact);
        if (Number(ldContact.localId) > this.elementCounter){
          this.elementCounter = Number(ldContact.localId);
        }
        this.contactList.push(ldContact);
        this.nodes.push(ldContact.node);
      }
      for (const leftPowerRail of pou.getElementsByTagName('leftPowerRail')) {
        const ldLPR = new LdLeftPowerRail(leftPowerRail);
        if (Number(ldLPR.localId) > this.elementCounter){
          this.elementCounter = Number(ldLPR.localId);
        }
        this.leftPowerRailList.push(ldLPR);
        this.nodes.push(ldLPR.node);
      }
      for (const rightPowerRail of pou.getElementsByTagName('rightPowerRail')) {
        const ldRPR = new LdRightPowerRail(rightPowerRail);
        if (Number(ldRPR.localId) > this.elementCounter){
          this.elementCounter = Number(ldRPR.localId);
        }
        this.rightPowerRailList.push(ldRPR);
        this.nodes.push(ldRPR.node);
      }
      for (const coil of pou.getElementsByTagName('coil')) {
        const ldCoil = new LdCoil(coil);
        if (Number(ldCoil.localId) > this.elementCounter){
          this.elementCounter = Number(ldCoil.localId);
        }
        this.coilList.push(ldCoil);
        this.nodes.push(ldCoil.node);
      }
    }
  }

  addFB(fbXml: any): void {
    const newBlock = new FbdBlock('');
    this.elementCounter++;
    newBlock.localId = this.elementCounter.toString();
    newBlock.typeName = fbXml.getAttribute('name');
    newBlock.instanceName = newBlock.typeName + newBlock.localId

    const inputVars = fbXml.getElementsByTagName('inputVars')[0];
    const outputVars = fbXml.getElementsByTagName('outputVars')[0];

    for ( const inVar of inputVars.getElementsByTagName('variable')) {
      const variable = {
        formalParameter: inVar.getAttribute('name'),
        negated: false,
        connectionPointIn: {x: 0, y: 0, refLocalID: null},
        connectionPointOut: {x: 0, y: 0, refLocalID: null}
      };
      newBlock.inputVariables.push(variable);
    }
    for ( const outVar of outputVars.getElementsByTagName('variable')) {
      const variable = {
        formalParameter: outVar.getAttribute('name'),
        negated: false,
        connectionPointIn: {x: 0, y: 0, refLocalID: null},
        connectionPointOut: {x: 0, y: 0, refLocalID: null}
      };
      newBlock.outputVariables.push(variable);
    }
    console.log(newBlock);
    newBlock.updateNode();
    this.blockList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.server_connections.push(con)
    }
    this.update_chart()

  }

  update_connections(){
  }
  
  update_chart(){
    this.update$.next(true);
  }
}
