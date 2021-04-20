import { Component, OnInit } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import {Subject} from 'rxjs';
import {FbdInOutVariable} from '../models/fbdObjects/fbdInOutVariable';
import {FbdInVariable} from '../models/fbdObjects/fbdInVariable';
import {FbdOutVariable} from '../models/fbdObjects/fbdOutVariable';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute} from '@angular/router';
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
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
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
   nodes: Node[] = [];
   edges: Edge[] = [];
   edges_id_counter : number;
   curve: any = shape.curveStepAfter;
   selected_node: string;
   selected_node_edges: Edge[];

   constructor(private projectService: ProjectService,
               private route: ActivatedRoute) {


  }
    /*
    connect_pins(Node1_id, Node2_id, P1_id, P2_id)

    Param: Take two nodes and two pins

    Return: None

    Does: adds an edge between the two nodes and registers the connction id in the pins
          if an edge already exists when registering, the old edge is removed
    */
  public connect_pins(Node1_id, Node2_id, P1_key, P2_key){
    // get the entities
    var Node1;
    var Node2;
    this.nodes.forEach( n => {
      if (n.id === Node1_id) {
        Node1 = n;
        return;
      }
    });
    this.nodes.forEach( n => {
      if (n.id === Node2_id) {
        Node2 = n;
        return;
      }
    });

    var P1 = Node1.pins[P1_key];
    var P2 = Node2.pins[P2_key];

    // check if connection is possible
    if (P1.type === P2.type){
      alert('Can\'t connect two pins of the same type');
      return;
    }


    //check if a connection already exists
    if (P1.edge != null){
      this.remove_edge(P1.edge);
      P1.edge = null;
    }
    if (P2.edge != null){
      this.remove_edge(P2.edge);
      P1.edge = null;
    }


    // call the add_edge function
    P1.edge = 'e_' + this.edges_id_counter;
    P2.edge = 'e_' + this.edges_id_counter;
    this.add_edge(Node1_id, Node2_id);
  }
  /**
   * remove_edge(edgeId)
   * @param edgeId : edgeId to be deleted
   * @returns : none
   * @does : removes the given edge from this.edges
   */
  public remove_edge(edgeId){
    for (let index = 0; index < this.edges.length; index++) {
      var edge = this.edges[index];
      if(edge.id === edgeId){
        this.edges.splice(index, 1);
        return;
      }
    }
  }


  public change_edge_source(edgeId, event){
    var newSource = event.target.value;
    this.edges.forEach(e => {
      if (e.id === edgeId){
        e.source = newSource;

      }
    })
    this.updateChart()
  }
  public change_edge_target(edgeId, event){
    var newTarget = event.target.value;
    this.edges.forEach(e => {
      if (e.id === edgeId){
        e.target = newTarget;
        this.updateChart();
        return;
      }
    });
  }
  set_selected_node(nodeId){
    this.selected_node = nodeId;
    this.selected_node_edges = this.get_related_edges(nodeId);
  }
  public get_nodes(){
    return this.nodes;
}
  public set_nodes(newNodes: Node[]){
    this.nodes = newNodes;
    this.updateChart();
}
  public get_edges(){
    return this.edges;
  }

  public set_edges(newEdges: Edge[]){
    this.edges = newEdges;
  }


  update$: Subject<any> = new Subject();




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
  public add_node_v2(node): void{
    this.nodes.push(node);
  }


  /**
   * add_edge
   */
  public add_edge(sourceId, targetId, mode?) {

    var id = 'e_' + this.edges_id_counter;
    var newEdge = {
      id: id,
      source: sourceId,
      target: targetId,
    };
    this.edges_id_counter++;
    this.edges.push(newEdge);
    this.updateChart();
  }

  /**
   * add_new_edge
   */
  public add_new_edge() {
    this.add_edge(this.selected_node, this.selected_node);
  }

  /**
   * get_related_edges
   */
  public get_related_edges(nodeId) {
    var related_edges : Edge[] = []
    this.edges.forEach(edge => {
      if (edge.source == nodeId || edge.target == nodeId){
          related_edges.push(edge)
      }
    });
    return related_edges
  }

  /**
   * update_chart()
   * Source: https://stackoverflow.com/questions/54516376/reload-ngx-graph-with-new-data
   *
   * Always call after changing the graph
   */
  updateChart(){
      this.update$.next(true);
  }


  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);

    if (pou !== undefined) {

      for (const inVariable of pou.getElementsByTagName('inVariable')) {
        const fbdInVariable = new FbdInVariable(inVariable);
        this.inVariableList.push(fbdInVariable);
        this.nodes.push(fbdInVariable.node);
        fbdInVariable.edges.forEach(i => {
          this.add_edge(fbdInVariable.localId, i);
        });
      }

      for (const outVariable of pou.getElementsByTagName('outVariable')) {
        const fbdOutVariable = new FbdOutVariable(outVariable);
        this.outVariableList.push(fbdOutVariable);
        this.nodes.push(fbdOutVariable.node);
        fbdOutVariable.edges.forEach(i => {
          this.add_edge(fbdOutVariable.localId, i);
        });
      }
      for (const inOutVariable of pou.getElementsByTagName('inOutVariable')) {
        const fbdInOutVariable = new FbdInOutVariable(inOutVariable);
        this.inOutVariableList.push(fbdInOutVariable);
        this.nodes.push(fbdInOutVariable.node);
        fbdInOutVariable.edges.forEach(i => {
          this.add_edge(fbdInOutVariable.localId, i);
        });
      }
      for (const jump of pou.getElementsByTagName('jump')) {
        this.jumpList.push(new FbdJump(jump));
      }
      for (const label of pou.getElementsByTagName('label')) {
        this.labelList.push(new FbdLabel(label));
      }
      for (const returnItem of pou.getElementsByTagName('return')) {
        this.returnList.push(new FbdReturn(returnItem));
      }
      for (const block of pou.getElementsByTagName('block')) {
        this.blockList.push(new FbdBlock(block));
      }
      for (const contact of pou.getElementsByTagName('contact')) {
        this.contactList.push(new LdContact(contact));
      }
      for (const leftPowerRail of pou.getElementsByTagName('leftPowerRail')) {
        this.leftPowerRailList.push(new LdLeftPowerRail(leftPowerRail));
      }
      for (const rightPowerRail of pou.getElementsByTagName('rightPowerRail')) {
        this.rightPowerRailList.push(new LdRightPowerRail(rightPowerRail));
      }
      for (const coil of pou.getElementsByTagName('coil')) {
        this.coilList.push(new LdCoil(coil));
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
    }

    this.updateChart();

    this.edges_id_counter = 2;
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

  public test(a){
    alert(a);
    console.log(a);
  }

}
