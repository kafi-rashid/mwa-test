import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private _authService: AuthService) {
    this.getLoggedInState();
  }
  
  ngOnInit(): void {
    
  }

  getLoggedInState() {
    this._authService.isLoggedIn().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      },
      error: (error) => {
        console.log("Error from header", error);        
      }
    });
  }

  logOut() {
    localStorage.clear();
    this._authService.setAuth(false);
  }

}