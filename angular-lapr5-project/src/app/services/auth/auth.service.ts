import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { getUser } from '../../interfaces/getUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  private readonly BaseURI = environment.url.mdv;

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Password: ['', [Validators.required, Validators.minLength(4)]]
  });

  register(formData) {
    console.log(formData);
    return this.http.post(this.BaseURI + 'register', formData);
  }

  login(formData) {
    return this.http.post(this.BaseURI + 'login', formData);
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach((element: any) => {
      if (userRole == element) {
        isMatch = true;
      }
    });
    return isMatch;
  }

  getUserInfo(id: getUser) {
    return this.http.post(this.BaseURI + 'user', id);
  }

  deleteUser(id: getUser) {
    return this.http.post(this.BaseURI + 'delete', id);
  }
}
