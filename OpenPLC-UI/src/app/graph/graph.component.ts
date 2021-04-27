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


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) {
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

  
  update$: Subject<any> = new Subject();

  /*
  connect_pins(Node1_id, Node2_id, P1_id, P2_id)

  Param: Take two nodes and two pins

  Return: None

  Does: adds an edge between the two nodes and registers the connction id in the pins
        if an edge already exists when registering, the old edge is removed
  */
  /* public connect_pins(sourceNodeId, targetNodeId, sourcePin, targetPin): void {
    // get the nodes
    let sourceNode;
    let targetNode;
    this.nodes.forEach(n => {
      if (n.id === sourceNodeId) {
        sourceNode = n;
        return;
      }
    });
    this.nodes.forEach(n => {
      if (n.id === targetNodeId) {
        targetNode = n;
        return;
      }
    });

    // get the keys
    const P1 = sourceNode.pins[sourcePin];
    const P2 = targetNode.pins[targetPin];

    // check if connection is possible
    if (P1.type === P2.type) {
      alert('Can\'t connect two pins of the same type');
      return;
    }


    // check if a connection already exists and remove it
    if (P1.edge != null) {
      this.remove_edge(P1.edge);
      P1.edge = null;
    }
    if (P2.edge != null) {
      this.remove_edge(P2.edge);
      P1.edge = null;
    }


    // call the add_edge function
    P1.edge = 'e_' + this.edgesIdCounter;
    P2.edge = 'e_' + this.edgesIdCounter;
    const edgeId = 'e_' + this.edgesIdCounter;
    const newEdge = {
      id: edgeId,
      source: sourceNodeId,
      target: targetNodeId,
    };
    this.edgesIdCounter++;
    this.edges.push(newEdge);
    this.updateChart();
  } */
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


  public change_edge_source(edgeId, event): void {
    const newSource = event.target.value;
    this.edges.forEach(e => {
      if (e.id === edgeId) {
        this.remove_edge(edgeId);
        this.add_edge(edgeId, newSource)
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
  }
  set_selected_node(node: PLCNode): void {
    this.selectedNode = node;
    console.log(node.connectionPoints)
    this.selectedNodeEdges = this.get_related_edges(node.id);
    this.selectedNodeCons = this.selectedNode.connectionPoints
    }
  public get_nodes(): any {
    return this.nodes;
  }
  public set_nodes(newNodes: PLCNode[]): void {
    this.nodes = newNodes;
    this.updateChart();
  }
  public get_edges(): any {
    return this.edges;
  }

  public set_edges(newEdges: Edge[]): void {
    this.edges = newEdges;
  }



  /**
   * add_node() : adds new nodes to the nodes list and calls updateChart()
   */

  /*public add_node() {
    // setup node
    var id = 'n_' + this.nodes.length;
    var label = 'Node ' + this.nodes.length;
    var newNode = {
      id: id,
      label: label,
      type: 'default',
      pins: {}
    };
    this.nodes.push(newNode);
    this.updateChart();
  }
*/
  public add_node_v2(node): void {
    this.nodes.push(node);
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
    return edgeId
  }

  /**
   * add_new_edge
   */
  public add_new_edge(): void {
    this.add_edge(this.selectedNode, this.selectedNode);
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

      //TODO:
    /**
     * 1) connect two points: call on a function that takes ids of two connectionPoints and connect them
     *        - when connecting. check if the edgeId == null and remove edge if not
     *        - after connecting. write the newe edgeId and change the source/target in the connectionPoints
     */
    /**
     * connect_points
     */
    public connect_points(sourcePoint, targetPoint) {
      //check if input is valid
      if(sourcePoint === "" || targetPoint === ""){
        return
      }
      //sometimes an event is passed as one of the points
      //check which one is an event and get it's value
      if(sourcePoint.constructor.name === "Event"){
        sourcePoint = sourcePoint.target.value;
      }

      if(targetPoint.constructor.name === "Event"){
        targetPoint = targetPoint.target.value;
      }

      if(targetPoint.type === sourcePoint.type){
        alert("Can't Connect two pins with the same type");
        return;
      }

      if(sourcePoint.sourceId === targetPoint.targetId){
        // In case of connecting the same node with itself
      }

      // check if points have an exisiting connection
      var oldTarget : ConnectionPoint = null
      var oldSource : ConnectionPoint = null
      if(sourcePoint.edgeId != null){
        var oldEdgeId = sourcePoint.edgeId;
        // find old connection point
        for (const con of this.allConnectionPointIns) {
          if (con.edgeId == oldEdgeId){
            // remove informations
            con.edgeId = null;
            con.sourceId = null;
            con.sourcePoint = null;
            con.sourceName = null;
            this.remove_edge(oldEdgeId)
          }
        }
        // remove edge
        
      }
      if(targetPoint.edgeId != null){
        var oldEdgeId = targetPoint.edgeId;
        // find old connection point
        for (const con of this.allConnectionPointOuts) {
          if (con.edgeId == oldEdgeId){
            // remove informations
            con.edgeId = null;
            con.targetId = null;
            con.targetPoint = null;
            con.targetName = null;
            this.remove_edge(oldEdgeId)
          }
        }
        // remove edge
      }
      console.log(this.allConnectionPoints)

      // -- points doesn't have exisiting connections -- \\

      // get the actual connection points from allConncetionPoints
      var mySource : ConnectionPoint = null;
      var myTarget : ConnectionPoint = null;
      for (const source of this.allConnectionPointOuts) {
        if (source.sourceId === sourcePoint.sourceId && source.sourcePoint === sourcePoint.sourcePoint){
          mySource = source;
          break;
        }
      }
      for (const target of this.allConnectionPointIns) {
        if (target.targetId === targetPoint.targetId && target.targetPoint === targetPoint.targetPoint){
          myTarget = target;
          break;
        }
      }
      // get informations
      var targetId = targetPoint.targetId;
      var sourceId = sourcePoint.sourceId;
      // fill in informations
      myTarget.sourcePoint = sourcePoint.sourcePoint;
      mySource.targetPoint = targetPoint.targetPoint;
      myTarget.sourceId = sourceId;
      mySource.targetId = targetId;
      // add edge
      var newEdgeId = this.add_edge(sourceId, targetId);
      // set new id
      myTarget.edgeId = newEdgeId;
      mySource.edgeId = newEdgeId;
      this.updateChart()
    }


  /**
   * process_elements
   */

  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);

    if (pou !== undefined) {

      for (const inVariable of pou.getElementsByTagName('inVariable')) {
        const fbdInVariable = new FbdInVariable(inVariable);
        this.inVariableList.push(fbdInVariable);
        this.nodes.push(fbdInVariable.node);

      }

      for (const outVariable of pou.getElementsByTagName('outVariable')) {
        const fbdOutVariable = new FbdOutVariable(outVariable);
        this.outVariableList.push(fbdOutVariable);
        this.nodes.push(fbdOutVariable.node);

      }
      for (const inOutVariable of pou.getElementsByTagName('inOutVariable')) {
        const fbdInOutVariable = new FbdInOutVariable(inOutVariable);
        this.inOutVariableList.push(fbdInOutVariable);
        this.nodes.push(fbdInOutVariable.node);

      }
      {/*
       for (const jump of pou.getElementsByTagName('jump')) {
        const fbdJump = new FbdJump(jump);
        this.jumpList.push(fbdJump);
        this.nodes.push(fbdJump.node);
        fbdJump.edges.forEach(i => {
          this.add_edge(fbdJump.localId, i);
        });
      }
      for (const label of pou.getElementsByTagName('label')) {
        const fbdLabel = new FbdLabel(label);
        this.labelList.push(fbdLabel);
        this.nodes.push(fbdLabel.node);
        fbdLabel.edges.forEach(i => {
          this.add_edge(fbdLabel.localId, i);
        });
      }
      for (const returnItem of pou.getElementsByTagName('return')) {
        const fbdReturn = new FbdReturn(returnItem);
        this.returnList.push(fbdReturn);
        this.nodes.push(fbdReturn.node);
        fbdReturn.edges.forEach(i => {
          this.add_edge(fbdReturn.localId, i);
        });
      }
      for (const block of pou.getElementsByTagName('block')) {
        const fbdBlock = new FbdBlock(block);
        this.blockList.push(fbdBlock);
        this.nodes.push(fbdBlock.node);
        fbdBlock.edges.forEach(i => {
          this.add_edge(fbdBlock.localId, i);
        });
      }
      for (const contact of pou.getElementsByTagName('contact')) {
        const ldContact = new LdContact(contact);
        this.contactList.push(ldContact);
        this.nodes.push(ldContact.node);
        ldContact.edges.forEach(i => {
          this.add_edge(ldContact.localId, i);
        });
      }
      for (const leftPowerRail of pou.getElementsByTagName('leftPowerRail')) {
        const ldLPR = new LdLeftPowerRail(leftPowerRail);
        this.leftPowerRailList.push(ldLPR);
        this.nodes.push(ldLPR.node);
        ldLPR.edges.forEach(i => {
          this.add_edge(ldLPR.localId, i);
        });
      }
      for (const rightPowerRail of pou.getElementsByTagName('rightPowerRail')) {
        const ldRPR = new LdRightPowerRail(rightPowerRail);
        this.rightPowerRailList.push(ldRPR);
        this.nodes.push(ldRPR.node);
        ldRPR.edges.forEach(i => {
          this.add_edge(ldRPR.localId, i);
        });
      }
      for (const coil of pou.getElementsByTagName('coil')) {
        const ldCoil = new LdCoil(coil);
        this.coilList.push(ldCoil);
        this.nodes.push(ldCoil.node);
        ldCoil.edges.forEach(i => {
          this.add_edge(ldCoil.localId, i);
        });
      }
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
      */}
    }

    this.edgesIdCounter = 0;
    for (const node of this.nodes) {
      for (const con of node.connectionPoints) {
        if (con.type === "OUT"){
          this.allConnectionPointOuts.push(con);
        } else {
          this.allConnectionPointIns.push(con);
        }
        this.allConnectionPoints.push(con);
      }
    }
    this.updateChart();
    //update connections
    for (const con_in of this.allConnectionPointIns) {
      // if there is a connection
      if (con_in.sourceId != null){
        // get the connectionpointout
        var con_out : ConnectionPoint = null;
        for (const con_out_member of this.allConnectionPointOuts) {
          if (con_out_member.sourceId === con_in.sourceId){
            con_out = con_out_member
            break
          }
        }
        // get informations
        var targetPoint = con_in.targetPoint
        var sourcePoint = con_out.sourcePoint
        var targetId = con_in.targetId
        var sourceId = con_in.sourceId
        var targetName = con_in.targetName
        var sourceName = con_out.sourceName
        // fill in informations
        con_in.sourcePoint = sourcePoint
        con_out.targetId = targetId
        con_out.targetPoint = targetPoint
        con_in.sourceName = sourceName
        con_out.targetName = targetName
        var newId = this.add_edge(sourceId, targetId)
        con_in.edgeId = newId
        con_out.edgeId = newId
      }
    }


    console.log(this.allConnectionPoints);

    console.log(this.edges);


    /*
    this.nodes = [
      {
        id: 'n_0',
        label: 'SR-0',
        type: 'fbs',
        pins: {
          S: {type: 'IN', edge: 'e_0'},
          R: {type: 'IN', edge: null},
          Q: {type: 'OUT', edge: 'e_1'}
        }
      },
      {
        id: 'n_1',
        label: 'INPUT_Var-0',
        type: 'var',
        pins: {
          "IN": {type: 'IN', edge: 'e_1'}
        }
      },
      {
        id: 'n_2',
        label: 'OUTPUT_Var-1',
        type: 'var',
        pins: {
          "OUT": {type: 'OUT', edge: 'e_0'}
        }
      }
    ];
    
    this.edges = [
      {
        id: 'e_0',
        source: 'n_2',
        target: 'n_0'
      },
      {
        id: 'e_1',
        source: 'n_0',
        target: 'n_1'
      },
    ]
    */

  }

  public test(a): void {
    alert(a);
    console.log(a);
  }

}
