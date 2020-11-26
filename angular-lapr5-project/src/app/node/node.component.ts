import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { INode } from '../interfaces/INode';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  nodes : INode[] = [];

  constructor(private nodeService : NodeService, private location : Location) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  addNode(nodeKey: string,nodeName:string,nodeLatitude:string,nodeLongitude:string,nodeShortName:string,nodeIsDepot:string,nodeIsReliefPoint:string,nodeCapacities:string) {
    console.log(nodeKey)
    this.nodeService.addNode({
      key: nodeKey,
      name: nodeName,
      latitude: parseInt(nodeLatitude),
      longitude: parseInt(nodeLongitude),
      shortName: nodeShortName,
      isDepot: nodeIsDepot,
      isReliefPoint: nodeIsReliefPoint,
      capacities: parseInt(nodeCapacities)
    }as INode).subscribe(node => this.nodes.push(node));
  }

  goBack(): void {
    this.location.back();
  }
}
