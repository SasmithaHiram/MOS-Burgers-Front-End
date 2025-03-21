import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    
  }

  login: any = {
    email: '',
    password: ''
  }

  searchUser() {
    fetch(`http://localhost:8080/user/search-userByEmail/${this.login.email}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);  
    })
  }

}
