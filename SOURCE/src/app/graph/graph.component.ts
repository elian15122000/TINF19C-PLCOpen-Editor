import { Component, OnInit } from '@angular/core';
import { Node, Edge } from "@swimlane/ngx-graph";
import * as shape from "d3-shape";
import {Subject} from "rxjs";


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {


   nodes: Node[];
   edges: Edge[];
   curve: any = shape.curveStepAfter;
   selected_node: string;
   selected_node_edges: Edge[];

   constructor() {
 
    this.nodes = [
      {
        id: "n_0",
        label: "Node 0",
        type: "fbs",
      },
      {
        id: "n_1",
        label: "Node 1",
        type: "fork",
      },
      {
        id: "n_2",
        label: "Node 1",
        type: "kaka",
      }
    ];

    this.edges = [
      {
        id: "e_0",
        source: "n_0",
        target: "n_1"
      },
      {
        id: "e_1",
        source: "n_0",
        target: "n_2"
      },

    ]
  }

  
  public change_edge_source(edgeId, event){
    var newSource = event.target.value;
    this.edges.forEach(e => {
      if (e.id == edgeId){
        e.source = newSource

      }
    })
    this.updateChart()
  }
  public change_edge_target(edgeId, event){
    var newTarget = event.target.value;
    this.edges.forEach(e => {
      if (e.id == edgeId){
        e.target = newTarget
        this.updateChart()
        return
      }
    })
  }
  set_selected_node(nodeId){
    this.selected_node = nodeId
    this.selected_node_edges = this.get_related_edges(nodeId)
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
    this.edges = newEdges
  }

  
  update$: Subject<any> = new Subject();




  /**
   * add_node() : adds new nodes to the nodes list and calls updateChart()
   */
  
  public add_node() {
    // setup node
    var id = "n_" + this.nodes.length;
    var label = "Node " + this.nodes.length;
    var newNode = {
      id: id,
      label: label,
      type: "default"
    };
    this.nodes.push(newNode);
    this.updateChart();
  }

  /**
   * add_edge
   */
  public add_edge(sourceId, targetId) {
    var id = "e_" + this.edges.length;
    var newEdge = {
      id: id,
      source: sourceId,
      target: targetId,
    };
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

  }

  public test(a){
    alert(a);
  }

}
