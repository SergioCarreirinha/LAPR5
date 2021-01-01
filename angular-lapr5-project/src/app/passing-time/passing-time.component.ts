import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IPassingTime } from '../interfaces/IPassingTimes';
import { PassingTimeService } from '../services/passing-time.service';

@Component({
  selector: 'app-passing-time',
  templateUrl: './passing-time.component.html',
  styleUrls: ['./passing-time.component.css']
})
export class PassingTimeComponent implements OnInit {

  passingTimes : IPassingTime[] = [];

  constructor(private service: PassingTimeService) { }

  ngOnInit(): void {
    this.getPassingTimes();
  }

  getPassingTimes(){
    this.service.getPassingTimes().subscribe(time => this.passingTimes = time);
  }

}

@Component({
  selector: 'app-create-passing-time',
  templateUrl: './create-passing-time.component.html',
  styleUrls: ['./passing-time.component.css']
})
export class CreatePassingTimeComponent implements OnInit {

  constructor(private service: PassingTimeService) { }

  ngOnInit(): void {
  }

  addPassingTime(passingTimeKey: string, passingTimeT: string, passingTimeNode: string, passingTimeIsUsed: boolean, passingTimeIsReliefPoint: boolean){
    if(passingTimeKey != '' || passingTimeT != '' || passingTimeNode != ''){
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
    }else{
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

