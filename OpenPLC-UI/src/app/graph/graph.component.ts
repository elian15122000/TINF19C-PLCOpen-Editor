import { Component, OnInit } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

   constructor() {

    this.nodes = [
      {
        id: 'n_0',
        label: 'Node 0',
        type: 'fbs',
      },
      {
        id: 'n_1',
        label: 'Node 1',
        type: 'fork',
      },
      {
        id: 'n_2',
        label: 'Node 1',
        type: 'kaka',
      }
    ];

    this.edges = [
      {
        id: 'e_0',
        source: 'n_0',
        target: 'n_1'
      },
      {
        id: 'e_1',
        source: 'n_0',
        target: 'n_2'
      },

    ];
  }


   nodes: Node[];
   edges: Edge[];
   curve: any = shape.curveStepAfter;
  // tslint:disable-next-line:variable-name
   selected_node: string;
  // tslint:disable-next-line:variable-name
   selected_node_edges: Edge[];


  update$: Subject<any> = new Subject();


  public change_edge_source(edgeId, event){
    const newSource = event.target.value;
    this.edges.forEach(e => {
      if (e.id === edgeId){
        e.source = newSource;
      }
    });
    this.updateChart();
  }
  public change_edge_target(edgeId, event): void{
    const newTarget = event.target.value;
    this.edges.forEach(e => {
      if (e.id === edgeId){
        e.target = newTarget;
        this.updateChart();
        return;
      }
    });
  }
  set_selected_node(nodeId): void{
    this.selected_node = nodeId;
    this.selected_node_edges = this.get_related_edges(nodeId);
  }
  public get_nodes(): any{
    return this.nodes;
}
  public set_nodes(newNodes: Node[]): any{
    this.nodes = newNodes;
    this.updateChart();
}
  public get_edges(): any{
    return this.edges;
  }

  public set_edges(newEdges: Edge[]): any{
    this.edges = newEdges;
  }




  /**
   * add_node() : adds new nodes to the nodes list and calls updateChart()
   */

  public add_node() {
    // setup node
    let id = 'n_' + this.nodes.length;
    let label = 'Node ' + this.nodes.length;
    let newNode = {
      id,
      label,
      type: 'default'
    };
    this.nodes.push(newNode);
    this.updateChart();
  }

  /**
   * add_edge
   */
  public add_edge(sourceId, targetId) {
    let id = 'e_' + this.edges.length;
    let newEdge = {
      id,
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
    let related_edges: Edge[] = [];
    this.edges.forEach(edge => {
      if (edge.source == nodeId || edge.target == nodeId){
          related_edges.push(edge);
      }
    });
    return related_edges;
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
