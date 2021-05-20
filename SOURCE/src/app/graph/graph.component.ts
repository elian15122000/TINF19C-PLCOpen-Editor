/**
 * @Filename : graph.component.ts
 * 
 * @Author : Mouaz Tabboush
 * 
 * @Last_Modified : 13, Mai, 2021
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { ProjectService } from '../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ConnectionPoint, PLCNode } from '../models/PLCNode';
import { EditorService } from '../services/editor.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private projectService: ProjectService, private editorService: EditorService,
              private route: ActivatedRoute, private router: Router) {
    this.update$ = this.editorService.update$;
    this.allConnectionPointIns = this.editorService.allConnectionPointIns;
    this.allConnectionPointOuts = this.editorService.allConnectionPointOuts;
  }
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
  serverConnections: ConnectionPoint[] = [];

  update$: Subject<any> = new Subject();

  /**
   * remove_edge(edgeId): removes an edge from the rendered graph.
   *                      this function call update_chart() when finnished
   * @param edgeId: edgeId of the edge to be removed
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


  /**
   * set_selected_node(node): this function is called in the graph.componen.html when a node is clicked.
   *                            it changes selected node to match the given nodeId.
   *                            it also changes the selected cons to match that of the new selected node
   * 
   * @param node: node that has been clicked
   * 
   */
  set_selected_node(node: PLCNode): void {
    for (const con of this.editorService.serverConnections) {
      if (con.type === 'OUT') {
        this.allConnectionPointOuts.push(con);
      } else {
        this.allConnectionPointIns.push(con);
      }
      this.allConnectionPoints.push(con);
    }
    this.editorService.serverConnections = [];

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



  /**
   * connect_points(sourcePoint, targetPoint): this function runs a number of checks on the input before calling add_edge to avoid breaking any PLCXML restrictions
   *                                    instead of passing the NodeIds to be connected, PLCXML requires passing the formalParameter of the source and target
   *                                    @bug : this function uses remove_edge(edgeId) to remove old edges connected to one of the nodes
   *                                           PLCXML allows connecting an Output to multiple inputs, but this function doesn't allow it.
   *                                    This function calls add_edge() when all checks are valid     
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
      alert("can't connect a block with itself");
      return
    }

    // check if points have an exisiting connection
    const oldTarget: ConnectionPoint = null;
    const oldSource: ConnectionPoint = null;
    if (sourcePoint.edgeId != null) {
      const oldEdgeId = sourcePoint.edgeId;
      // find old connection point
      for (const con of this.allConnectionPointIns) {
        if (con.edgeId === oldEdgeId) {
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

    // set new id
    myTarget.edgeId = newEdgeId;
    mySource.edgeId = newEdgeId;
    this.updateChart();
  }


  /**
  * save(): saves current edits to the xml data
  */
   public save(): void{
    this.editorService.save_to_xml();
  }

 /**
  * add_variable(form): checks what variable the user wants to add
  * @param form: carries the user input
  */
 public add_variable(form){
   if(form["type"]==="in"){
    console.log(form["name"]);
    this.editorService.add_in_variable(form["name"], form["negated"]);
   }
   else if(form["type"]==="out"){
    this.editorService.add_out_variable(form["name"], form["negated"]);
   } else{
    this.editorService.add_inout_variable(form["name"], form["negated"]);
   }
   this.updateChart()
 }


  ngOnInit(): void {
    this.pouName = this.route.snapshot.params.pouName;
    const pou = this.projectService.getPou(this.pouName);

    if (pou !== undefined) {
      this.editorService.loadPou(pou);
      this.nodes = this.editorService.nodes;
      this.allConnectionPoints = this.editorService.allConnectionPoints;
      this.allConnectionPointIns = this.editorService.allConnectionPointIns;
      this.allConnectionPointOuts = this.editorService.allConnectionPointOuts;
    } else {
      this.router.navigateByUrl('/home');
    }

    this.edgesIdCounter = 0;
    this.allConnectionPoints = [];
    this.allConnectionPointIns = [];
    this.allConnectionPointOuts = [];
    for (const node of this.nodes) {
      for (const con of node.connectionPoints) {
        if (con.type === 'OUT') {
            this.allConnectionPointOuts.push(con);
        } else {
            this.allConnectionPointIns.push(con);
        }
        this.allConnectionPoints.push(con);
        }
    }

    this.updateChart();
    // update connections
    console.log(this.allConnectionPointIns);
    console.log(this.allConnectionPointOuts);
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


}
