import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(){

    if(localStorage.getItem('token')){
      console.log("LOLLL");
      return true;
    }
    return false;
  }

  isNotLoggedIn(){
    if(localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
