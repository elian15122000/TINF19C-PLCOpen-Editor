import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {SfcStep} from '../models/sfcObjects/sfcStep';
import {SfcJumpStep} from '../models/sfcObjects/sfcJumpStep';
import {SfcTransition} from '../models/sfcObjects/sfcTransition';
import {SfcSimultaneousDivergence} from '../models/sfcObjects/sfcSimultaneousDivergence';
import {SfcSimultaneousConvergence} from '../models/sfcObjects/sfcSimultaneousConvergence';
import {SfcSelectionDivergence} from '../models/sfcObjects/sfcSelectionDivergence';
import {SfcSelectionConvergence} from '../models/sfcObjects/sfcSelectionConvergence';
import {SfcMacroStep} from '../models/sfcObjects/sfcMacroStep';
import {CommonComment} from '../models/commonObjects/commonComment';
import {CommonError} from '../models/commonObjects/commonError';
import {CommonActionBlock} from '../models/commonObjects/commonActionBlock';
import {CommonVendorElement} from '../models/commonObjects/commonVendorElement';
import {CommonContinuation} from '../models/commonObjects/commonContinuation';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public pouName: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);
    if (pou !== undefined) {
      const sfcStepList = [];
      for (const xmlStep of pou.getElementsByTagName('step')){
        sfcStepList.push(new SfcStep(xmlStep));
        }
      const sfcJumpStepList = [];
      for (const xmlJumpStep of pou.getElementsByTagName('jumpStep')){
        sfcJumpStepList.push(new SfcJumpStep(xmlJumpStep));
      }
      const sfcTransitionList = [];
      for (const xmlTransition of pou.getElementsByTagName('transition')){
        sfcTransitionList.push(new SfcTransition(xmlTransition));
      }
      const sfcSimDivergenceList = [];
      for (const xmlSimDivergence of pou.getElementsByTagName('simultaneousDivergence')){
        sfcSimDivergenceList.push(new SfcSimultaneousDivergence(xmlSimDivergence));
      }
      const sfcSimConvergenceList = [];
      for (const xmlSimConvergence of pou.getElementsByTagName('simultaneousConvergence')){
        sfcSimConvergenceList.push(new SfcSimultaneousConvergence(xmlSimConvergence));
      }
      const sfcSelDivergenceList = [];
      for (const xmlSelDivergence of pou.getElementsByTagName('selectionDivergence')){
        sfcSelDivergenceList.push(new SfcSelectionDivergence(xmlSelDivergence));
      }
      const sfcSelConvergenceList = [];
      for (const xmlSelConvergence of pou.getElementsByTagName('selectionConvergence')){
        sfcSelConvergenceList.push(new SfcSelectionConvergence(xmlSelConvergence));
      }
      const sfcMacroStepList = [];
      for (const xmlMacroStep of pou.getElementsByTagName('macroStep')){
        sfcMacroStepList.push(new SfcMacroStep(xmlMacroStep));
      }
      const commonCommentList = [];
      for (const xmlComment of pou.getElementsByTagName('comment')){
        commonCommentList.push(new CommonComment(xmlComment));
      }
      const commonErrorList = [];
      for (const xmlError of pou.getElementsByTagName('error')){
        commonErrorList.push(new CommonError(xmlError));
      }
      const commonConnectorList = [];
      for (const xmlConnector of pou.getElementsByTagName('connector')){
        commonConnectorList.push(new CommonError(xmlConnector));
      }
      const commonActionBlockList = [];
      for (const xmlActionBlock of pou.getElementsByTagName('actionBlock')){
        commonActionBlockList.push(new CommonActionBlock(xmlActionBlock));
      }
      const commonVendorElementList = [];
      for (const xmlVendorElement of pou.getElementsByTagName('vendorElement')){
        commonVendorElementList.push(new CommonVendorElement(xmlVendorElement));
      }
      const commonContinuationList = [];
      for (const xmlContinuation of pou.getElementsByTagName('continuation')){
        commonConnectorList.push(new CommonContinuation(xmlContinuation));
      }

  }
  }

}
