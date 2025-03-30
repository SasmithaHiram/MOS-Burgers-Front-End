import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Login } from '../../model/login';
import { LoginService } from '../../service/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login: Login = new Login('', '');

  userLogin() {
    if (!this.login.userName || !this.login.password) {    
     alert("Filed");
    return;
  }
  
  this.loginService
        .isValidUser(this.login)
        .subscribe((response) => {
          if(response) {
            this.router.navigate(['/dashboard']);
          } else {
            alert("INVALID USERNAME OR PASSWORD")
          }
          
          } 
        )

} 

}
