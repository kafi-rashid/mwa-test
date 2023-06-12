import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isInvalid: boolean = false;

  username: string = "";
  password: string = "";

  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router) { }

  login(loginForm: NgForm) {
    this.isInvalid = false;
    this._authService.auth({
      username: loginForm.value.username,
      password: loginForm.value.password
    }).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this._authService.setAuth(true);
          localStorage.setItem("user", JSON.stringify(response.data));
          this._router.navigate(["profile"]);
        } else {
          this.isInvalid = true;
        }
      },
      error: (error) => {
        this.isInvalid = true;
        console.log("Error from login", error);
      }
    })
  }

}
