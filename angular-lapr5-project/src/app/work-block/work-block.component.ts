import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WorkBlockService } from '../services/work-block.service';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-block',
  templateUrl: './work-block.component.html',
  styleUrls: ['./work-block.component.css']
})
export class WorkBlockComponent implements OnInit {

  workBlock: IWorkBlock[] = [];

  constructor(private service: WorkBlockService, private location: Location) { }

  ngOnInit(): void {
    this.getWorkBlock();
  }

  getWorkBlock() {
    this.service.getWorkBlocks().subscribe(workBlock => this.workBlock = workBlock);
  }

  addWorkBlock(key: string, startTime: string, endTime: string, startNode: string, endNode: string, isCrewTravelTime: boolean, isActive: boolean) {
    if (!key || !startTime || !endTime || !startNode || !endNode) {
      Swal.fire({
        title: 'Aviso!',
        text: "Bloco de Trabalho não foi criado. Parâmetros inválidos.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      this.service.addWorkBlock({
        key: key,
        startTime: parseInt(startTime),
        endTime: parseInt(endTime),
        startNode: startNode,
        endNode: endNode,
        isCrewTravelTime: isCrewTravelTime,
        isActive: isActive
      } as IWorkBlock).subscribe()

      Swal.fire({
        title: 'Sucesso!',
        text: 'Bloco de Trabalho criado',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }

  goBack(): void {
    this.location.back();
  }
}
