import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { FbdInVariable } from '../models/fbdObjects/fbdInVariable';
import { FbdOutVariable } from '../models/fbdObjects/fbdOutVariable';
import { FbdInOutVariable } from '../models/fbdObjects/fbdInOutVariable';
import { FbdJump } from '../models/fbdObjects/fbdJump';
import { FbdLabel } from '../models/fbdObjects/fbdLabel';
import { FbdReturn } from '../models/fbdObjects/fbdReturn';
import { FbdBlock } from '../models/fbdObjects/fbdBlock';
import { LdContact } from '../models/ldObjects/ldContact';
import { LdCoil } from '../models/ldObjects/ldCoil';
import { LdLeftPowerRail } from '../models/ldObjects/ldLeftPowerRail';
import { LdRightPowerRail } from '../models/ldObjects/ldRightPowerRail';
import { CommonActionBlock } from '../models/commonObjects/commonActionBlock';
import { CommonComment } from '../models/commonObjects/commonComment';
import { CommonConnector } from '../models/commonObjects/commonConnector';
import { CommonContinuation } from '../models/commonObjects/commonContinuation';
import { CommonError } from '../models/commonObjects/commonError';
import { CommonVendorElement } from '../models/commonObjects/commonVendorElement';
import { SfcJumpStep } from '../models/sfcObjects/sfcJumpStep';
import { SfcMacroStep } from '../models/sfcObjects/sfcMacroStep';
import { SfcSelectionConvergence } from '../models/sfcObjects/sfcSelectionConvergence';
import { SfcSelectionDivergence } from '../models/sfcObjects/sfcSelectionDivergence';
import { SfcSimultaneousConvergence } from '../models/sfcObjects/sfcSimultaneousConvergence';
import { SfcSimultaneousDivergence } from '../models/sfcObjects/sfcSimultaneousDivergence';
import { SfcStep } from '../models/sfcObjects/sfcStep';
import { SfcTransition } from '../models/sfcObjects/sfcTransition';



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {


  public pouName: string;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

}
