import { Component, Inject, OnInit } from '@angular/core';
import NodeDTO from '../../../../MasterDataRede/src/dto/NodeDTO/INodeDTO';
import { INodePersistence } from '../../../../MasterDataRede/src/persistence/interface/INodePersistence';
import {Document, Model} from 'mongoose';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})

export class NodeComponent implements OnInit {
  node: NodeDTO ={
      key: "",
      name: "",
      latitude: 0,
      longitude: 0,
      shortName: "",
      isDepot: "",
      isReliefPoint: "",
      capacities: 0
  };
  constructor(
    //@Inject('NodeSchema') private NodeSchema : Model<INodePersistence & Document>
  ){}
  
  ngOnInit(): void {
  }
  onClick() {
    console.log('FILHO DA PUTA');
  }

}