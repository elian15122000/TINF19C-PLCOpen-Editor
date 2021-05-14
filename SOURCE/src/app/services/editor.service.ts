/**
 * @Filename : editor.service.ts
 *
 * @Author : Leonie de Santis
 *
 * @Last_Modified : 13.05.2021
 *
 */

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
import {CommonComment} from '../models/commonObjects/commonComment';
import {CommonConnector} from '../models/commonObjects/commonConnector';
import {CommonContinuation} from '../models/commonObjects/commonContinuation';
import {CommonError} from '../models/commonObjects/commonError';
import {SfcJumpStep} from '../models/sfcObjects/sfcJumpStep';
import {SfcMacroStep} from '../models/sfcObjects/sfcMacroStep';
import {SfcSelectionConvergence} from '../models/sfcObjects/sfcSelectionConvergence';
import {SfcSelectionDivergence} from '../models/sfcObjects/sfcSelectionDivergence';
import {SfcSimultaneousConvergence} from '../models/sfcObjects/sfcSimultaneousConvergence';
import {SfcSimultaneousDivergence} from '../models/sfcObjects/sfcSimultaneousDivergence';
import {SfcTransition} from '../models/sfcObjects/sfcTransition';

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
  commentList: CommonComment[] = [];
  connectorList: CommonConnector[] = [];
  continuationList: CommonContinuation[] = [];
  errorList: CommonError[] = [];
  jumpStepList: SfcJumpStep[] = [];
  macroStepList: SfcMacroStep[] = [];
  selectionConvergenceList: SfcSelectionConvergence[] = [];
  selectionDivergenceList: SfcSelectionDivergence[] = [];
  simultaneousConvergenceList: SfcSimultaneousConvergence[] = [];
  simultaneousDivergenceList: SfcSimultaneousDivergence[] = [];
  transitionList: SfcTransition[] = [];
  allList: any[] = [];
  pou: any;
  nodes: PLCNode[] = [];
  update$: Subject<any> = new Subject();
  allConnectionPointIns: ConnectionPoint[] = [];
  allConnectionPointOuts: ConnectionPoint[] = [];
  allConnectionPoints: ConnectionPoint[] = [];
  serverConnections: ConnectionPoint[] = [];

  constructor() { }

  // load the information of the different PLC-Elements of the selected pou
  loadPou(pou: any): void {
    this.pou = pou;
    this.elementCounter = 0;
    this.nodes = [];

    for (const inVariable of pou.getElementsByTagName('inVariable')) {
      const fbdInVariable = new FbdInVariable(inVariable);
      if (Number(fbdInVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdInVariable.localId);
      }
      this.inVariableList.push(fbdInVariable);
      this.allList.push(fbdInVariable);
      this.nodes.push(fbdInVariable.node);
    }
    for (const outVariable of pou.getElementsByTagName('outVariable')) {
      const fbdOutVariable = new FbdOutVariable(outVariable);
      if (Number(fbdOutVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdOutVariable.localId);
      }
      this.outVariableList.push(fbdOutVariable);
      this.allList.push(fbdOutVariable);
      this.nodes.push(fbdOutVariable.node);
    }
    for (const inOutVariable of pou.getElementsByTagName('inOutVariable')) {
      const fbdInOutVariable = new FbdInOutVariable(inOutVariable);
      if (Number(fbdInOutVariable.localId) > this.elementCounter){
        this.elementCounter = Number(fbdInOutVariable.localId);
      }
      this.inOutVariableList.push(fbdInOutVariable);
      this.allList.push(fbdInOutVariable);
      this.nodes.push(fbdInOutVariable.node);
    }

    for (const jump of pou.getElementsByTagName('jump')) {
        const fbdJump = new FbdJump(jump);
        if (Number(fbdJump.localId) > this.elementCounter){
          this.elementCounter = Number(fbdJump.localId);
        }
        this.jumpList.push(fbdJump);
        this.allList.push(fbdJump);
        this.nodes.push(fbdJump.node);
      }
    for (const label of pou.getElementsByTagName('label')) {
        const fbdLabel = new FbdLabel(label);
        if (Number(fbdLabel.localId) > this.elementCounter){
          this.elementCounter = Number(fbdLabel.localId);
        }
        this.labelList.push(fbdLabel);
        this.allList.push(fbdLabel);
        this.nodes.push(fbdLabel.node);
      }
    for (const returnItem of pou.getElementsByTagName('return')) {
        const fbdReturn = new FbdReturn(returnItem);
        if (Number(fbdReturn.localId) > this.elementCounter){
          this.elementCounter = Number(fbdReturn.localId);
        }
        this.returnList.push(fbdReturn);
        this.allList.push(fbdReturn);
        this.nodes.push(fbdReturn.node);
      }
    for (const block of pou.getElementsByTagName('block')) {
        const fbdBlock = new FbdBlock(block);
        if (Number(fbdBlock.localId) > this.elementCounter){
          this.elementCounter = Number(fbdBlock.localId);
        }
        this.blockList.push(fbdBlock);
        this.allList.push(fbdBlock);
        this.nodes.push(fbdBlock.node);
      }
    for (const contact of pou.getElementsByTagName('contact')) {
        const ldContact = new LdContact(contact);
        if (Number(ldContact.localId) > this.elementCounter){
          this.elementCounter = Number(ldContact.localId);
        }
        this.contactList.push(ldContact);
        this.allList.push(ldContact);
        this.nodes.push(ldContact.node);
      }
    for (const leftPowerRail of pou.getElementsByTagName('leftPowerRail')) {
        const ldLPR = new LdLeftPowerRail(leftPowerRail);
        if (Number(ldLPR.localId) > this.elementCounter){
          this.elementCounter = Number(ldLPR.localId);
        }
        this.leftPowerRailList.push(ldLPR);
        this.allList.push(ldLPR);
        this.nodes.push(ldLPR.node);
      }
    for (const rightPowerRail of pou.getElementsByTagName('rightPowerRail')) {
        const ldRPR = new LdRightPowerRail(rightPowerRail);
        if (Number(ldRPR.localId) > this.elementCounter){
          this.elementCounter = Number(ldRPR.localId);
        }
        this.rightPowerRailList.push(ldRPR);
        this.allList.push(ldRPR);
        this.nodes.push(ldRPR.node);
      }
    for (const coil of pou.getElementsByTagName('coil')) {
        const ldCoil = new LdCoil(coil);
        if (Number(ldCoil.localId) > this.elementCounter){
          this.elementCounter = Number(ldCoil.localId);
        }
        this.coilList.push(ldCoil);
        this.allList.push(ldCoil);
        this.nodes.push(ldCoil.node);
      }
    for (const comment of pou.getElementsByTagName('comment')) {
        const commonComment = new CommonComment(comment);
        if (Number(commonComment.localId) > this.elementCounter){
          this.elementCounter = Number(commonComment.localId);
        }
        this.commentList.push(commonComment);
        this.allList.push(commonComment);
        this.nodes.push(commonComment.node);
      }
    for (const connector of pou.getElementsByTagName('connector')) {
      const commonConnector = new CommonConnector(connector);
      if (Number(commonConnector.localId) > this.elementCounter){
        this.elementCounter = Number(commonConnector.localId);
      }
      this.connectorList.push(commonConnector);
      this.allList.push(commonConnector);
      this.nodes.push(commonConnector.node);
    }
    for (const continuation of pou.getElementsByTagName('continuation')) {
      const commonContinuation = new CommonContinuation(continuation);
      if (Number(commonContinuation.localId) > this.elementCounter){
        this.elementCounter = Number(commonContinuation.localId);
      }
      this.continuationList.push(commonContinuation);
      this.allList.push(commonContinuation);
      this.nodes.push(commonContinuation.node);
    }
    for (const error of pou.getElementsByTagName('error')) {
      const commonError = new CommonError(error);
      if (Number(commonError.localId) > this.elementCounter){
        this.elementCounter = Number(commonError.localId);
      }
      this.errorList.push(commonError);
      this.allList.push(commonError);
      this.nodes.push(commonError.node);
    }
    for (const jumpStep of pou.getElementsByTagName('jumpStep')) {
      const sfcJumpStep = new SfcJumpStep(jumpStep);
      if (Number(sfcJumpStep.localId) > this.elementCounter){
        this.elementCounter = Number(sfcJumpStep.localId);
      }
      this.jumpStepList.push(sfcJumpStep);
      this.allList.push(sfcJumpStep);
      this.nodes.push(sfcJumpStep.node);
    }
    for (const macroStep of pou.getElementsByTagName('macroStep')) {
      const sfcMacroStep = new SfcMacroStep(macroStep);
      if (Number(sfcMacroStep.localId) > this.elementCounter){
        this.elementCounter = Number(sfcMacroStep.localId);
      }
      this.macroStepList.push(sfcMacroStep);
      this.allList.push(sfcMacroStep);
      this.nodes.push(sfcMacroStep.node);
    }
    for (const selectionConvergence of pou.getElementsByTagName('selectionConvergence')) {
      const sfcSelectionConvergence = new SfcSelectionConvergence(selectionConvergence);
      if (Number(sfcSelectionConvergence.localId) > this.elementCounter){
        this.elementCounter = Number(sfcSelectionConvergence.localId);
      }
      this.selectionConvergenceList.push(sfcSelectionConvergence);
      this.allList.push(sfcSelectionConvergence);
      this.nodes.push(sfcSelectionConvergence.node);
    }
    for (const selectionDivergence of pou.getElementsByTagName('selectionDivergence')) {
      const sfcSelectionDivergence = new SfcSelectionDivergence(selectionDivergence);
      if (Number(sfcSelectionDivergence.localId) > this.elementCounter){
        this.elementCounter = Number(sfcSelectionDivergence.localId);
      }
      this.selectionDivergenceList.push(sfcSelectionDivergence);
      this.allList.push(sfcSelectionDivergence);
      this.nodes.push(sfcSelectionDivergence.node);
    }
    for (const simultaneousConvergence of pou.getElementsByTagName('simultaneousConvergence')) {
      const sfcSimultaneousConvergence = new SfcSimultaneousConvergence(simultaneousConvergence);
      if (Number(sfcSimultaneousConvergence.localId) > this.elementCounter){
        this.elementCounter = Number(sfcSimultaneousConvergence.localId);
      }
      this.simultaneousConvergenceList.push(sfcSimultaneousConvergence);
      this.allList.push(sfcSimultaneousConvergence);
      this.nodes.push(sfcSimultaneousConvergence.node);
    }
    for (const simultaneousDivergence of pou.getElementsByTagName('simultaneousDivergence')) {
      const sfcSimultaneousDivergence = new SfcSimultaneousDivergence(simultaneousDivergence);
      if (Number(sfcSimultaneousDivergence.localId) > this.elementCounter){
        this.elementCounter = Number(sfcSimultaneousDivergence.localId);
      }
      this.simultaneousDivergenceList.push(sfcSimultaneousDivergence);
      this.allList.push(sfcSimultaneousDivergence);
      this.nodes.push(sfcSimultaneousDivergence.node);
    }
    for (const transition of pou.getElementsByTagName('transition')) {
      const sfcTransition = new SfcTransition(transition);
      if (Number(sfcTransition.localId) > this.elementCounter){
        this.elementCounter = Number(sfcTransition.localId);
      }
      this.transitionList.push(sfcTransition);
      this.allList.push(sfcTransition);
      this.nodes.push(sfcTransition.node);
    }
  }

  // create a new block and add to the objectsList and to the nodesList
  // also push the xml of the new function block into the xml of the pou
  addFB(fbXml: any): void {
    const newBlock = new FbdBlock('');
    this.elementCounter++;
    newBlock.localId = this.elementCounter.toString();
    newBlock.typeName = fbXml.getAttribute('name');
    newBlock.instanceName = newBlock.typeName + newBlock.localId;
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
    newBlock.createVariableXML();
    newBlock.updateNode();
    this.blockList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.serverConnections.push(con);
    }
    if (this.pou.getElementsByTagName('SFC')[0] !== undefined) {
      this.pou.getElementsByTagName('SFC')[0].addChild(newBlock.xml);
    }
    if (this.pou.getElementsByTagName('FBD')[0] !== undefined) {
      this.pou.getElementsByTagName('FBD')[0].appendChild(newBlock.xml);
    }
    newBlock.updateAttributes(Number(newBlock.localId), newBlock.typeName, newBlock.instanceName);

    this.update_chart();
  }

  update_chart(): void{
    this.update$.next(true);
  }


  // update the information in the xml
  save_to_xml(): void{
    for (const node of this.nodes) {
      const nodeId = node.id;
      for (const model of this.allList) {
          if (model.localId === nodeId){
            for (const con of node.connectionPoints) {
              if (con.edgeId != null){
                if (con.type === 'IN'){
                  const newRefId = con.sourceId;
                  try {
                  model.change_refid(newRefId, '');
                  } catch (error) {
                    console.log(error);
                  }
                }
              }
            }
          }
        }
    }
  }

  /**
   * Add Variables and Blocks
   */
  // HACK: negated will be set to false for now
   public add_in_variable(name, negated): void{
    const newBlock = new FbdInVariable('');
    this.elementCounter++;
    const id = this.elementCounter.toString();
    newBlock.updateAttributes(id, name, negated);
    this.inVariableList.push(newBlock);
    this.allList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.serverConnections.push(con);
    }
    if (this.pou.getElementsByTagName('SFC')[0] !== undefined) {
      this.pou.getElementsByTagName('SFC')[0].addChild(newBlock.xml);
    }
    if (this.pou.getElementsByTagName('FBD')[0] !== undefined) {
      this.pou.getElementsByTagName('FBD')[0].appendChild(newBlock.xml);
    }
  }

  public add_out_variable(name, negated): void{
    const newBlock = new FbdOutVariable('');
    this.elementCounter++;
    const id = this.elementCounter.toString();
    newBlock.updateAttributes(id, name, negated);
    this.outVariableList.push(newBlock);
    this.allList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.serverConnections.push(con);
    }
    if (this.pou.getElementsByTagName('SFC')[0] !== undefined) {
      this.pou.getElementsByTagName('SFC')[0].addChild(newBlock.xml);
    }
    if (this.pou.getElementsByTagName('FBD')[0] !== undefined) {
      this.pou.getElementsByTagName('FBD')[0].appendChild(newBlock.xml);
    }
  }

  public add_inout_variable(name, negated): void{
    const newBlock = new FbdInOutVariable('');
    this.elementCounter++;
    const id = this.elementCounter.toString();
    newBlock.updateAttributes(id, name, negated, negated);
    this.inOutVariableList.push(newBlock);
    this.allList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.serverConnections.push(con);
    }
    if (this.pou.getElementsByTagName('SFC')[0] !== undefined) {
      this.pou.getElementsByTagName('SFC')[0].addChild(newBlock.xml);
    }
    if (this.pou.getElementsByTagName('FBD')[0] !== undefined) {
      this.pou.getElementsByTagName('FBD')[0].appendChild(newBlock.xml);
    }
  }

}
