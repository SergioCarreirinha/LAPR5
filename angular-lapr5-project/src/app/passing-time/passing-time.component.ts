import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { INode } from '../interfaces/INode';
import { IPassingTime } from '../interfaces/IPassingTimes';
import { NodeService } from '../services/node/node.service';
import { PassingTimeService } from '../services/passing-time/passing-time.service';

@Component({
  selector: 'app-passing-time',
  templateUrl: './passing-time.component.html',
  styleUrls: ['./passing-time.component.css']
})
export class PassingTimeComponent implements OnInit {

  passingTimes: IPassingTime[] = [];
  nodes: INode[] = [];

  constructor(private nodeService: NodeService, private service: PassingTimeService) { }

  ngOnInit(): void {
    this.getPassingTimes();
    this.getNodes();
  }

  private getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }


  getPassingTimes() {
    this.service.getPassingTimes().subscribe(time => this.passingTimes = time);
  }

}

@Component({
  selector: 'app-create-passing-time',
  templateUrl: './create-passing-time.component.html',
  styleUrls: ['./passing-time.component.css']
})
export class CreatePassingTimeComponent implements OnInit {
  nodes: INode[] = [];
  constructor(private nodeService: NodeService, private service: PassingTimeService) { }

  ngOnInit(): void {
    this.getNodes();
  }

  private getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  addPassingTime(passingTimeKey: string, passingTimeT: string, passingTimeNode: string, passingTimeIsUsed: boolean, passingTimeIsReliefPoint: boolean) {
    if (passingTimeKey != '' || passingTimeT != '' || passingTimeNode != '') {
      this.service.addPassingTime({
        key: passingTimeKey,
        time: passingTimeT,
        node: passingTimeNode,
        isUsed: passingTimeIsUsed,
        isReliefPoint: passingTimeIsReliefPoint
      } as IPassingTime).subscribe();
      Swal.fire({
        title: 'Sucesso!',
        text: 'Passagem Criada',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possivel criar uma Passagem, verifique os dados!',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }

  }

}

