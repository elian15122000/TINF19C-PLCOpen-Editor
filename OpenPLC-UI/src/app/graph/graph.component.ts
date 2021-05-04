import { Component, OnInit, Type } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { FbdInOutVariable } from '../models/fbdObjects/fbdInOutVariable';
import { FbdInVariable } from '../models/fbdObjects/fbdInVariable';
import { FbdOutVariable } from '../models/fbdObjects/fbdOutVariable';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
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
import { pipeline } from 'stream';
import { ConnectionPoint, PLCNode } from '../models/PLCNode';
import { EditorService } from '../services/editor.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private projectService: ProjectService, private editorService: EditorService,
    private route: ActivatedRoute) {
    this.update$ = this.editorService.update$;
    this.allConnectionPointIns = this.editorService.allConnectionPointIns;
    this.allConnectionPointOuts = this.editorService.allConnectionPointOuts;
  }

  // Importierte Variablen
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
  selConvergenceList: SfcSelectionConvergence[] = [];
  selDivergenceList: SfcSelectionDivergence[] = [];
  simConvergenceList: SfcSimultaneousConvergence[] = [];
  simDivergenceList: SfcSimultaneousDivergence[] = [];
  stepList: SfcStep[] = [];
  transitionList: SfcTransition[] = [];

  //
  pouName: string;
  nodes: PLCNode[] = [];
  edges: Edge[] = [];
  edgesIdCounter: number;
  curve: any = shape.curveStepAfter;
  selectedNode: PLCNode;
  selectedNodeEdges: Edge[];
  selectedNodeCons: ConnectionPoint[] = null;
  allConnectionPoints: ConnectionPoint[] = [];
  allConnectionPointIns: ConnectionPoint[] = [];
  allConnectionPointOuts: ConnectionPoint[] = [];
  server_connections: ConnectionPoint[] = [];

  update$: Subject<any> = new Subject();

  /**
   * remove_edge(edgeId)
   * @param edgeId : edgeId to be deleted
   * @returns : none
   * @does : removes the given edge from this.edges
   */
  public remove_edge(edgeId): void {
    for (let index = 0; index < this.edges.length; index++) {
      const edge = this.edges[index];
      if (edge.id === edgeId) {
        this.edges.splice(index, 1);
        return;
      }
    }
  }


  /*   public change_edge_source(edgeId, event): void {
      const newSource = event.target.value;
      this.edges.forEach(e => {
        if (e.id === edgeId) {
          this.remove_edge(edgeId);
          this.add_edge(edgeId, newSource);
        }
      });
      this.updateChart();
    }
  
    public change_edge_target(edgeId, event): void {
      const newTarget = event.target.value;
      this.edges.forEach(e => {
        if (e.id === edgeId) {
          e.target = newTarget;
          this.updateChart();
          return;
        }
      });
    } */

  set_selected_node(node: PLCNode): void {
    for (const con of this.editorService.server_connections) {
      if (con.type === 'OUT') {
        this.allConnectionPointOuts.push(con);
      } else {
        this.allConnectionPointIns.push(con);
      }
      this.allConnectionPoints.push(con)
    }
    this.editorService.server_connections = []

    this.selectedNode = node;
    console.log(node.connectionPoints);
    this.selectedNodeCons = this.selectedNode.connectionPoints;
  }

  /**
   * add_edge
   */
  public add_edge(sourceId, targetId): string {

    const edgeId = 'e_' + this.edgesIdCounter;
    const newEdge = {
      id: edgeId,
      source: sourceId,
      target: targetId,
    };
    this.edgesIdCounter++;
    this.edges.push(newEdge);
    this.updateChart();
    return edgeId;
  }
  
  /**
   * get_related_edges
   */
     public get_related_edges(nodeId): any {
      const relatedEdges: Edge[] = [];
      this.edges.forEach(edge => {
        if (edge.source === nodeId || edge.target === nodeId) {
          relatedEdges.push(edge);
        }
      });
      return relatedEdges;
    }

  /**
   * update_chart()
   * Source: https://stackoverflow.com/questions/54516376/reload-ngx-graph-with-new-data
   *
   * Always call after changing the graph
   */
  updateChart(): void {
    this.update$.next(true);
    
    }
  

  // TODO:
  /**
   * 1) connect two points: call on a function that takes ids of two connectionPoints and connect them
   *        - when connecting. check if the edgeId == null and remove edge if not
   *        - after connecting. write the newe edgeId and change the source/target in the connectionPoints
   */
  /**
   * connect_points
   */
  public connect_points(sourcePoint, targetPoint): void {
    // check if input is valid
    if (sourcePoint === '' || targetPoint === '') {
      return;
    }
    // sometimes an event is passed as one of the points
    // check which one is an event and get it's value
    if (sourcePoint.constructor.name === 'Event') {
      sourcePoint = sourcePoint.target.value;
    }

    if (targetPoint.constructor.name === 'Event') {
      targetPoint = targetPoint.target.value;
    }

    if (targetPoint.type === sourcePoint.type) {
      alert('Can\'t Connect two pins with the same type');
      return;
    }

    if (sourcePoint.sourceId === targetPoint.targetId) {
      // In case of connecting the same node with itself
    }

    // check if points have an exisiting connection
    const oldTarget: ConnectionPoint = null;
    const oldSource: ConnectionPoint = null;
    if (sourcePoint.edgeId != null) {
      const oldEdgeId = sourcePoint.edgeId;
      // find old connection point
      for (const con of this.allConnectionPointIns) {
        if (con.edgeId === oldEdgeId) {
          // remove informations
          // TODO: Remove Localref ID in the old target from the xml
          con.edgeId = null;
          con.sourceId = null;
          con.sourcePoint = null;
          con.sourceName = null;
          this.remove_edge(oldEdgeId);
        }
      }
    }


    if (targetPoint.edgeId != null) {
      const oldEdgeId = targetPoint.edgeId;
      // find old connection point
      for (const con of this.allConnectionPointOuts) {
        if (con.edgeId === oldEdgeId) {
          // remove informations
          con.edgeId = null;
          con.targetId = null;
          con.targetPoint = null;
          con.targetName = null;
          this.remove_edge(oldEdgeId);
        }
      }
      // remove edge
    }
    console.log(this.allConnectionPoints);

    // -- points doesn't have exisiting connections -- \\

    // get the actual connection points from allConncetionPoints
    let mySource: ConnectionPoint = null;
    let myTarget: ConnectionPoint = null;
    for (const source of this.allConnectionPointOuts) {
      if (source.sourceId === sourcePoint.sourceId && source.sourcePoint === sourcePoint.sourcePoint) {
        mySource = source;
        break;
      }
    }
    for (const target of this.allConnectionPointIns) {
      if (target.targetId === targetPoint.targetId && target.targetPoint === targetPoint.targetPoint) {
        myTarget = target;
        break;
      }
    }

    // get informations
    const targetId = targetPoint.targetId;
    const sourceId = sourcePoint.sourceId;
    // fill in informations
    myTarget.sourcePoint = sourcePoint.sourcePoint;
    mySource.targetPoint = targetPoint.targetPoint;
    myTarget.sourceId = sourceId;
    mySource.targetId = targetId;
    // add edge
    const newEdgeId = this.add_edge(sourceId, targetId);
    // TODO: add reflocal id in target in xml
    // check the model name of the node
    // go through the list and change stuff
    var test_node: PLCNode = {
      id : "dsad",
      type : "fbdInVariable",
      connectionPoints : []
    }
    switch(test_node.type){
      case "fbdInVariable":
        // loop fbdInVariable and change stuff
        break;
      default:
        break;
    }

    // set new id
    myTarget.edgeId = newEdgeId;
    mySource.edgeId = newEdgeId;
    this.updateChart();
  }

  

  /**
   * process_elements
   */

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);

    if (pou !== undefined) {
      this.editorService.loadPou(pou);
      this.nodes = this.editorService.nodes;
      this.allConnectionPoints = this.editorService.allConnectionPoints
      this.allConnectionPointIns = this.editorService.allConnectionPointIns
      this.allConnectionPointOuts = this.editorService.allConnectionPointOuts
      /*
      for (const actionBlock of pou.getElementsByTagName('actionBlock')) {
        this.actionBlockList.push(new CommonActionBlock(actionBlock));
      }
      for (const comment of pou.getElementsByTagName('comment')) {
        this.commentList.push(new CommonComment(comment));
      }
      for (const connector of pou.getElementsByTagName('connector')) {
        this.connectorList.push(new CommonConnector(connector));
      }
      for (const continuation of pou.getElementsByTagName('continuation')) {
        this.continuationList.push(new CommonContinuation(continuation));
      }
      for (const error of pou.getElementsByTagName('error')) {
        this.errorList.push(new CommonError(error));
      }
      for (const vendorElement of pou.getElementsByTagName('vendorElement')) {
        this.vendorElementList.push(new CommonVendorElement(vendorElement));
      }
      for (const jumpStep of pou.getElementsByTagName('jumpStep')) {
        this.jumpStepList.push(new SfcJumpStep(jumpStep));
      }
      for (const macroStep of pou.getElementsByTagName('macroStep')) {
        this.macroStepList.push(new SfcMacroStep(macroStep));
      }
      for (const selectionConvergence of pou.getElementsByTagName('selectionConvergence')) {
        this.selConvergenceList.push(new SfcSelectionConvergence(selectionConvergence));
      }
      for (const selectionDivergence of pou.getElementsByTagName('selectionDivergence')) {
        this.selDivergenceList.push(new SfcSelectionDivergence(selectionDivergence));
      }
      for (const simultaneousConvergence of pou.getElementsByTagName('simultaneousConvergence')) {
        this.simConvergenceList.push(new SfcSimultaneousConvergence(simultaneousConvergence));
      }
      for (const simultaneousDivergence of pou.getElementsByTagName('simultaneousDivergence')) {
        this.simDivergenceList.push(new SfcSimultaneousDivergence(simultaneousDivergence));
      }
      for (const step of pou.getElementsByTagName('step')) {
        this.stepList.push(new SfcStep(step));
      }
      for (const transition of pou.getElementsByTagName('transition')) {
        this.transitionList.push(new SfcTransition(transition));
      }
      */
    }

    this.edgesIdCounter = 0;

    for (const node of this.nodes) {
      for (const con of node.connectionPoints) {
        if (con.type === 'OUT') {
            this.allConnectionPointOuts.push(con);
        } else {
            this.allConnectionPointIns.push(con);
        }
          this.allConnectionPoints.push(con)
        }
    }

    this.updateChart();
    // update connections
    console.log(this.allConnectionPointIns)
    console.log(this.allConnectionPointOuts)
    for (const conIn of this.allConnectionPointIns) {
      // if there is a connection
      if (conIn.sourceId != null) {
        // get the connectionpointout
        let conOut: ConnectionPoint = null;
        for (const conOutRemember of this.allConnectionPointOuts) {
          if (conOutRemember.sourceId === conIn.sourceId) {
            conOut = conOutRemember;
            break;
          }
        }
        // get informations
        const targetPoint = conIn.targetPoint;
        const sourcePoint = conOut.sourcePoint;
        const targetId = conIn.targetId;
        const sourceId = conIn.sourceId;
        const targetName = conIn.targetName;
        const sourceName = conOut.sourceName;
        // fill in informations
        conIn.sourcePoint = sourcePoint;
        conOut.targetId = targetId;
        conOut.targetPoint = targetPoint;
        conIn.sourceName = sourceName;
        conOut.targetName = targetName;
        const newId = this.add_edge(sourceId, targetId);
        conIn.edgeId = newId;
        conOut.edgeId = newId;
      }
    }
  }

  public test(){
    this.editorService.outVariableList[0].change_refid("10");

  }
}
