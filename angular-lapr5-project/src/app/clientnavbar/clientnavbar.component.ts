import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-clientnavbar',
  templateUrl: './clientnavbar.component.html',
  styleUrls: ['./clientnavbar.component.css']
})
export class ClientnavbarComponent implements OnInit {


  constructor(private router: Router, private service: AuthService) { 

  }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get admin(){
    if(localStorage.getItem('token')){
      var array = ['Admin'] as Array<string>;
      return this.service.roleMatch(array);
    }
    return false;
  }
}
