import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:3000/auth";
  header = {
    "content-type": "application/json"
  }
  loggedInStatus: boolean = false;

  constructor(private _http: HttpClient) { }

  auth(user: any): Observable<User> {
    return this._http.post<User>(this.baseUrl, user, { headers: this.header });
  }

  isLoggedIn(): Observable<boolean> {
    const status = localStorage.getItem("isLoggedIn");
    if (status && status === "true") {
      this.loggedInStatus = true;
    } else {
      this.loggedInStatus = false;
    }
    return of(this.loggedInStatus);
  }

  setAuth(status: boolean) {
    this.loggedInStatus = status;
    localStorage.setItem("isLoggedIn", status.toString());
  }
}
