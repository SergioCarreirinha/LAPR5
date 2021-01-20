import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { INode } from '../interfaces/INode';
import { NodeService } from '../services/node/node.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  nodes: INode[] = [];

  constructor(private nodeService: NodeService, private location: Location) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  goBack(): void {
    this.location.back();
  }
}
@Component({
  selector: 'app-createNode',
  templateUrl: './createNode.component.html',
  styleUrls: ['./node.component.css']
})
export class CreateNodeComponent implements OnInit {
  nodes: INode[] = [];


  constructor(private nodeService: NodeService, private location: Location) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  addNode(nodeKey: string, nodeName: string, nodeLatitude: string, nodeLongitude: string, nodeShortName: string, nodeIsDepot: string, nodeIsReliefPoint: string, nodeCapacities: string) {
    if (nodeKey != '' && nodeLatitude != '' && nodeLongitude != '' && nodeShortName != '' && nodeIsDepot != '' && nodeIsReliefPoint != '' && parseFloat(nodeLatitude) < 90 && parseFloat(nodeLatitude) > -90 && parseFloat(nodeLongitude) < 90 && parseFloat(nodeLongitude) > -90) {
      this.nodeService.addNode({
        key: nodeKey,
        name: nodeName,
        latitude: parseFloat(nodeLatitude),
        longitude: parseFloat(nodeLongitude),
        shortName: nodeShortName,
        isDepot: nodeIsDepot,
        isReliefPoint: nodeIsReliefPoint,
        capacities: parseInt(nodeCapacities)
      } as INode).subscribe((res:any) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Nó Criado!',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: true,
        })
      }, (err:any) => {
        if(err.status == 406)
        {
          Swal.fire({
            title: 'Erro!',
            text: 'Já existe um nó com essa chave!',
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 2500,
            showConfirmButton: false,
          })
        }
      });
    } else {
      Swal.fire({
        title: 'Aviso!',
        text: 'Nó não foi criado, verifique os parametros',
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }
  }
}
