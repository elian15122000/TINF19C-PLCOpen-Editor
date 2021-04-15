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
   edges_id_counter : number;
   curve: any = shape.curveStepAfter;
   selected_node: string;
   selected_node_edges: Edge[];

   constructor() {
    this.edges_id_counter = 2;
    this.nodes = [
      {
        id: "n_0",
        label: "SR-0",
        type: "fbs",
        pins: {
          "S": {type: "IN", edge: "e_0"},
          "R": {type: "IN", edge: null},
          "Q": {type: "OUT", edge: "e_1"}
        }
      },
      {
        id: "n_1",
        label: "INPUT_Var-0",
        type: "var",
        pins: {
          "IN": {type: "IN", edge: "e_1"}
        }
      },
      {
        id: "n_2",
        label: "OUTPUT_Var-1",
        type: "var",
        pins: {
          "OUT": {type: "OUT", edge: "e_0"}
        }
      }
    ];

    this.edges = [
      {
        id: "e_0",
        source: "n_2",
        target: "n_0"
      },
      {
        id: "e_1",
        source: "n_0",
        target: "n_1"
      },

    ]
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
      if (n.id == Node1_id) {
        Node1 = n
        return
      }
    });
    this.nodes.forEach( n => {
      if (n.id == Node2_id) {
        Node2 = n
        return
      }
    });

    var P1 = Node1.pins[P1_key]
    var P2 = Node2.pins[P2_key]
    
    // check if connection is possible
    if (P1.type==P2.type){
      alert("Can't connect two pins of the same type")
      return
    }


    //check if a connection already exists
    if (P1.edge != null){
      this.remove_edge(P1.edge)
      P1.edge = null
    }
    if (P2.edge != null){
      this.remove_edge(P2.edge)
      P1.edge = null
    }


    // call the add_edge function
    P1.edge = "e_" + this.edges_id_counter;
    P2.edge = "e_" + this.edges_id_counter;
    this.add_edge(Node1_id, Node2_id)
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
      if(edge.id == edgeId){
        this.edges.splice(index, 1)
        return
      }
    }
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
    
    var id = "e_" + this.edges_id_counter;
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

  }

  public test(a){
    alert(a);
  }

}
