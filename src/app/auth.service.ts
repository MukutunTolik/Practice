import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = '/api/login';
  public isLogged = false;

  constructor(
  	private http: HttpClient,
  	@Inject(SESSION_STORAGE) private storage: StorageService) {
  	  if(this.storage.get('auth-token') !== undefined)
  		this.isLogged = true;
  }

  logIn (login: string, pass: string): Observable<Object>{
  	return this.http.post<Object>(this.authUrl, {'name': login, 'password': pass});
  }

  setToken(token: string): void{
  	this.storage.set('auth-token', token);
  	this.isLogged = true;
  }

  getToken(): string{
    return this.storage.get('auth-token');
  }

  logOut(): void{
  	this.storage.remove('auth-token');
  	this.isLogged = false;
  }
}
