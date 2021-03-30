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


      console.log(inVariableList);
      console.log(outVariableList);
      console.log(inOutVariableList);
      console.log(labelList);
      console.log(returnList);
      console.log(jumpList);
      console.log(blockList);
      console.log(contactList);
      console.log(coilList);
      console.log(leftPowerRailList);
      console.log(rightPowerRailList);
    }
  }

}
