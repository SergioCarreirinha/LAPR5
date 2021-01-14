import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from '../interfaces/getUser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-clientnavbar',
  templateUrl: './clientnavbar.component.html',
  styleUrls: ['./clientnavbar.component.css']
})
export class ClientnavbarComponent implements OnInit {

  username: string = "";
  id: string = "";

  constructor(private router: Router, private service: AuthService) {

  }

  ngOnInit(): void {
    this.getUsername();
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  get admin() {
    if (localStorage.getItem('token')) {
      var array = ['Admin'] as Array<string>;
      return this.service.roleMatch(array);
    }
    return false;
  }

  getUsername() {
    var localId = localStorage.getItem('id');
    this.service.getUserInfo({
      id: localId
    } as getUser).subscribe((res: any) => {
      console.log(res);
      this.username = res.userName;
      this.id = res.id;
    });
  }
}
