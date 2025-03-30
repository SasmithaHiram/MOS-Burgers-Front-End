import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    isValidUser(log: Login):Observable<boolean> {
        return this.http.post<boolean>(`http://localhost:8080/user/login`, log);
    }
}
