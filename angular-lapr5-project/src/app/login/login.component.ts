import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  
  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router, private toastr : ToastrService) { 
    this.loginForm = this.fb.group({
      'username':['',[Validators.required]],
      'password':['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')!= null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.toastr.success('Logged In', 'Login Successful');
      this.router.navigateByUrl('/dashboard');
    },
    err => {
      if (err.status == 400)
        this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      else
        console.log(err);
    });
  }

  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }

}
