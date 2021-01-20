import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  disableButton: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'checkpassword': ['', [Validators.required]],
      'gdprCheck': ['', [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    this.authService.formModel.reset();
  }

  register() {
    if(this.registerForm.get('checkpassword').value == this.registerForm.get('password').value){ 
      this.authService.register(this.registerForm.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res.succeeded) {
            this.authService.formModel.reset();
            this.toastr.success('Utilizador criado com sucesso!', 'Registado com sucesso.');
            this.router.navigateByUrl('/login');
          } else {
            res.errors.forEach(element => {
              console.log(element);
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Username já existente.', 'Erro no Registo.');
                  break;

                default:
                  this.toastr.error(element.description, 'Erro no Registo.');
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.authService.formModel.reset();
      this.toastr.error('Password não correspondente', 'Erro no Registo.');
    }
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  
  get checkpassword() {
    return this.registerForm.get('checkpassword');
  }

}
