import { Component, OnInit } from '@angular/core';
import { ImportService } from '../services/import/import.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  files: string[] = [];

  constructor(private importService: ImportService) { }

  ngOnInit(): void {
  }

  importFile(event: any) {
    console.log(event);
    if (event.files && event.files[0]) {
      this.importService.importFile(event).subscribe(file => this.files.push(file.toString()));
      this.importService.importFileMDV(event).subscribe((res:any)=> {
        Swal.fire({
          title: 'Successo!',
          text: 'O Ficheiro foi importado',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: true,
        })
      }, (err:any) => {
        if(err.status==400){
          Swal.fire({
            title: 'Erro!',
            text: 'Problemas com importar Ficheiro',
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 2500,
            showConfirmButton: false,
          })
        }
      });
    }
  }

}
