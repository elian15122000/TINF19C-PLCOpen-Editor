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
import {CommonActionBlock} from '../models/commonObjects/commonActionBlock';
import {CommonComment} from '../models/commonObjects/commonComment';
import {CommonConnector} from '../models/commonObjects/commonConnector';
import {CommonContinuation} from '../models/commonObjects/commonContinuation';
import {CommonError} from '../models/commonObjects/commonError';
import {CommonVendorElement} from '../models/commonObjects/commonVendorElement';
import {SfcJumpStep} from '../models/sfcObjects/sfcJumpStep';
import {SfcMacroStep} from '../models/sfcObjects/sfcMacroStep';
import {SfcSelectionConvergence} from '../models/sfcObjects/sfcSelectionConvergence';
import {SfcSelectionDivergence} from '../models/sfcObjects/sfcSelectionDivergence';
import {SfcSimultaneousConvergence} from '../models/sfcObjects/sfcSimultaneousConvergence';
import {SfcSimultaneousDivergence} from '../models/sfcObjects/sfcSimultaneousDivergence';
import {SfcStep} from '../models/sfcObjects/sfcStep';
import {SfcTransition} from '../models/sfcObjects/sfcTransition';
import { ProjectService } from './project.service';

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
  actionBlockList: CommonActionBlock[] = [];
  commentList: CommonComment[] = [];
  connectorList: CommonConnector[] = [];
  continuationList: CommonContinuation[] = [];
  errorList: CommonError[] = [];
  vendorElementList: CommonVendorElement[] = [];
  jumpStepList: SfcJumpStep[] = [];
  macroStepList: SfcMacroStep[] = [];
  selectionConvergenceList: SfcSelectionConvergence[] = [];
  selectionDivergenceList: SfcSelectionDivergence[] = [];
  simultaneousConvergenceList: SfcSimultaneousConvergence[] = [];
  simultaneousDivergenceList: SfcSimultaneousDivergence[] = [];
  stepList: SfcStep[] = [];
  transitionList: SfcTransition[] = [];
  allList: any[] = [];

  pou: any;

  nodes: PLCNode[] = [];
  update$: Subject<any> = new Subject();
  allConnectionPointIns: ConnectionPoint[] = [];
  allConnectionPointOuts: ConnectionPoint[] = [];
  allConnectionPoints: ConnectionPoint[] = [];
  serverConnections: ConnectionPoint[] = [];

  constructor(private projectService: ProjectService) { }

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
      /* 
      // in case of reuse add to allList
      for (const actionBlock of pou.getElementsByTagName('actionBlock')) {
        const commonActionBlock = new CommonActionBlock(actionBlock);
        if (Number(commonActionBlock.localId) > this.elementCounter){
          this.elementCounter = Number(commonActionBlock.localId);
        }
        this.actionBlockList.push(commonActionBlock);
        this.nodes.push(commonActionBlock.node);
      } */
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
      /*
            // in case of reuse add to allList
      for (const step of pou.getElementsByTagName('step')) {
        const sfcStep = new SfcStep(step);
        if (Number(sfcStep.localId) > this.elementCounter){
          this.elementCounter = Number(sfcStep.localId);
        }
        this.stepList.push(sfcStep);
        this.nodes.push(sfcStep.node);
      } */
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
    console.log(newBlock);
    newBlock.updateNode();
    this.blockList.push(newBlock);
    this.nodes.push(newBlock.node);
    for (const con of newBlock.node.connectionPoints) {
      this.serverConnections.push(con);
    }
    console.log(this.pou.getElementsByTagName('SFC')[0]);
    if (this.pou.getElementsByTagName('SFC')[0] !== undefined) {
      this.pou.getElementsByTagName('SFC')[0].addChild(newBlock.xml);
      console.log(this.pou.getElementsByTagName('SFC')[0]);
    }
    if (this.pou.getElementsByTagName('FBD')[0] !== undefined) {
      this.pou.getElementsByTagName('FBD')[0].appendChild(newBlock.xml);
      console.log(this.pou.getElementsByTagName('FBD')[0]);
    }
    newBlock.updateAttributes(Number(newBlock.localId), newBlock.typeName, newBlock.instanceName);


    this.update_chart();

  }

  update_chart(): void{
    this.update$.next(true);
  }

  /**
   * works 
   */
  save_to_xml(): void{
    console.log(this.allList)
    for (const node of this.nodes) {
      var node_id = node.id;
      var node_cons = node.connectionPoints;
      var node_pos = node.position;
      var node_type = node.type;
      console.log(this.allList);
        for (const model of this.allList) {
          if(model.localId === node_id){
            // change stuff
            // call change_ref
            for (const con of node.connectionPoints) {
              if(con.edgeId != null){
                // check type
                if(con.type === "IN"){
                  // set ref if
                  var new_refId = con.sourceId;
                  var old_source = "";
                  try {
                  model.change_refid(new_refId, "")
                  } catch (error) {
                    console.log(error)
                  }
                }
              }
            }
            // call change_att
            // call change_pos
          }
        }
    }
  }

  fillAllList(): void{
    // für alle Listen
    for (const item of this.inVariableList) {
      this.allList.push(item);
    }
  }
}
