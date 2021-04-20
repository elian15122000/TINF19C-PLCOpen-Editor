import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import { FbdInVariable} from '../models/fbdObjects/fbdInVariable';
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


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public pouName: string;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);

    if (pou !== undefined) {
      const inVariableList: FbdInVariable[] = [];
      const outVariableList: FbdOutVariable[] = [];
      const inOutVariableList: FbdInOutVariable[] = [];
      const jumpList: FbdJump[] = [];
      const labelList: FbdLabel[] = [];
      const returnList: FbdReturn[] = [];
      const blockList: FbdBlock[] = [];
      const contactList: LdContact[] = [];
      const coilList: LdCoil[] = [];
      const leftPowerRailList: LdLeftPowerRail[] = [];
      const rightPowerRailList: LdRightPowerRail[] = [];
      const actionBlockList: CommonActionBlock[] = [];
      const commentList: CommonComment[] = [];
      const connectorList: CommonConnector[] = [];
      const continuationList: CommonContinuation[] = [];
      const errorList: CommonError[] = [];
      const vendorElementList: CommonVendorElement[] = [];
      const jumpStepList: SfcJumpStep[] = [];
      const macroStepList: SfcMacroStep[] = [];
      const selConvergenceList: SfcSelectionConvergence[] = [];
      const selDivergenceList: SfcSelectionDivergence[] = [];
      const simConvergenceList: SfcSimultaneousConvergence[] = [];
      const simDivergenceList: SfcSimultaneousDivergence[] = [];
      const stepList: SfcStep[] = [];
      const transitionList: SfcTransition[] = [];

      for (const inVariable of pou.getElementsByTagName('inVariable')){
        inVariableList.push(new FbdInVariable(inVariable));
      }

      for (const outVariable of pou.getElementsByTagName('outVariable')){
        outVariableList.push(new FbdOutVariable(outVariable));
      }
      for (const inOutVariable of pou.getElementsByTagName('inOutVariable')){
        inOutVariableList.push(new FbdInOutVariable(inOutVariable));
      }
      for (const jump of pou.getElementsByTagName('jump')){
        jumpList.push(new FbdJump(jump));
      }
      for (const label of pou.getElementsByTagName('label')){
        labelList.push(new FbdLabel(label));
      }
      for (const returnItem of pou.getElementsByTagName('return')){
        returnList.push(new FbdReturn(returnItem));
      }
      for (const block of pou.getElementsByTagName('block')){
        blockList.push(new FbdBlock(block));
      }
      for (const contact of pou.getElementsByTagName('contact')){
        contactList.push(new LdContact(contact));
      }
      for (const leftPowerRail of pou.getElementsByTagName('leftPowerRail')){
        leftPowerRailList.push(new LdLeftPowerRail(leftPowerRail));
      }
      for (const rightPowerRail of pou.getElementsByTagName('rightPowerRail')){
        rightPowerRailList.push(new LdRightPowerRail(rightPowerRail));
      }
      for (const coil of pou.getElementsByTagName('coil')){
        coilList.push(new LdCoil(coil));
      }
      for (const actionBlock of pou.getElementsByTagName('actionBlock')){
        actionBlockList.push(new CommonActionBlock(actionBlock));
      }
      for (const comment of pou.getElementsByTagName('comment')){
        commentList.push(new CommonComment(comment));
      }
      for (const connector of pou.getElementsByTagName('connector')){
        connectorList.push(new CommonConnector(connector));
      }
      for (const continuation of pou.getElementsByTagName('continuation')){
        continuationList.push(new CommonContinuation(continuation));
      }
      for (const error of pou.getElementsByTagName('error')){
        errorList.push(new CommonError(error));
      }
      for (const vendorElement of pou.getElementsByTagName('vendorElement')){
        vendorElementList.push(new CommonVendorElement(vendorElement));
      }
      for (const jumpStep of pou.getElementsByTagName('jumpStep')){
        jumpStepList.push(new SfcJumpStep(jumpStep));
      }
      for (const macroStep of pou.getElementsByTagName('macroStep')){
        macroStepList.push(new SfcMacroStep(macroStep));
      }
      for (const selectionConvergence of pou.getElementsByTagName('selectionConvergence')){
        selConvergenceList.push(new SfcSelectionConvergence(selectionConvergence));
      }
      for (const selectionDivergence of pou.getElementsByTagName('selectionDivergence')){
        selDivergenceList.push(new SfcSelectionDivergence(selectionDivergence));
      }
      for (const simultaneousConvergence of pou.getElementsByTagName('simultaneousConvergence')){
        simConvergenceList.push(new SfcSimultaneousConvergence(simultaneousConvergence));
      }
      for (const simultaneousDivergence of pou.getElementsByTagName('simultaneousDivergence')){
        simDivergenceList.push(new SfcSimultaneousDivergence(simultaneousDivergence));
      }
      for (const step of pou.getElementsByTagName('step')){
        stepList.push(new SfcStep(step));
      }
      for (const transition of pou.getElementsByTagName('transition')){
        transitionList.push(new SfcTransition(transition));
      }
    }
  }

}
