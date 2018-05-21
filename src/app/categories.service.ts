import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = '/api/categories';
  private headers;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.headers = new HttpHeaders({'x-access-token': this.authService.getToken()});
  }

  getCategories (): Observable<Category[]> {
  	return this.http.get<Category[]>(this.categoriesUrl, {headers: this.headers});
  }

  getCategory (id:string): Observable<Category> {
  	return this.http.get<Category>(this.categoriesUrl+'/'+id, {headers: this.headers});
  }

  putCategory (category: Category): Observable<Category> {
  	return this.http.put<Category>(this.categoriesUrl+'/'+category._id, category, {headers: this.headers});
  }

  addCategory (category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, {headers: this.headers});
  }

  removeCategory (categoryId: String) {
    return this.http.delete(this.categoriesUrl+'/'+categoryId, {headers: this.headers});
  }
}
