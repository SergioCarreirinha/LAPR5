import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homenavbar',
  templateUrl: './homenavbar.component.html',
  styleUrls: ['./homenavbar.component.css']
})
export class HomenavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    if(localStorage.getItem('token')){
      return false;
    }
    return true;
  }

}
