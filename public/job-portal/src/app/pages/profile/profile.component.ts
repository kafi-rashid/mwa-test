import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    let user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

}
