import { Component } from '@angular/core';

import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'Finance Manager';

  constructor(public authService: AuthService){}

  ngOnInit() {
  }

  logOut (): void{
  	this.authService.logOut();
  }
}
