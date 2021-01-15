import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isBuffer } from 'util';
import { getUser } from '../interfaces/getUser';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string = "";
  email: string = ""

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    var localId = localStorage.getItem('id');
    this.service.getUserInfo({
      id: localId
    } as getUser).subscribe((res: any) => {
      this.username = res.userName;
      this.email = res.email;
    });
  }

  deleteUser() {
    Swal.fire({
      title: 'Tem a certeza que pretende apagar a sua conta?',
      text: "Não será possível reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero apagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser({ id: localStorage.getItem('id') } as getUser).subscribe();
        Swal.fire({
          title: 'Utilizador Apagado!',
          text: 'Deixou de ser um utilizador desta aplicação. Adeus.',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 3000,
          showConfirmButton: false,
        });
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }
    })
  }
}
