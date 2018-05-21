import { Output, EventEmitter, Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: string;
  pass: string;
  constructor(
  	@Inject(SESSION_STORAGE) private storage: StorageService,
  	private authService: AuthService,
  	private router: Router,
  	private toastr: ToastrService ) { }

  ngOnInit() {
  }

  submit (): void{
  	this.authService.logIn(this.login, this.pass)
  	    .subscribe((result: {auth:string, token:string}) => {
  	    	if(result.auth){
  	    		this.authService.setToken(result.token);
  	    		this.toastr.success("You are logged succesfully", "Success");
  	    		this.router.navigateByUrl('/categories');
  	    	}else{
  	    		this.toastr.error("Password or login is not correct", "Error");
  	    	}
  	    });
  }
}
