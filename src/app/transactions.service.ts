import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from './transaction';

import { AuthService } from './auth.service';

const httpObjects = {
	headers: new HttpHeaders({'Content-type': 'application/jsonp'})
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsUrl = '/api/transactions';
  private headers;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.headers = new HttpHeaders({'x-access-token': this.authService.getToken()});
  }

  getTransactions(params?: {}): Observable<Transaction[]> {
  	return this.http.get<Transaction[]>(this.transactionsUrl, {params: params, headers: this.headers});
  }
  
  getTransaction (id:string): Observable<Transaction> {
  	return this.http.get<Transaction>(this.transactionsUrl+'/'+id, {headers: this.headers});
  }

  putTransaction (transaction: Transaction): Observable<Transaction> {
  	return this.http.put<Transaction>(this.transactionsUrl+'/'+transaction._id, transaction, {headers: this.headers});
  }

  addTransaction (transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, {headers: this.headers});
  }

  removeTransaction (categoryId: String) {
    return this.http.delete(this.transactionsUrl+'/'+categoryId, {headers: this.headers});
  }
}
