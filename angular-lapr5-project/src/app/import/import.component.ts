import { Component, OnInit } from '@angular/core';
import { ImportService } from '../services/import/import.service';

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
    }
  }

}
