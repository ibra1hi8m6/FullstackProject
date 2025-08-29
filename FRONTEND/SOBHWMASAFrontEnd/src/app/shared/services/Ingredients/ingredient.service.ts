import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseUrl = `${environment.apiurl}/Ingredient`;

  constructor(private http: HttpClient) { }
  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllIngredients`);
  }
  getIngredientByID(id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/GetIngredientbyID/${id}`)
  }
  getIngredientsByCategoryID(id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/GetIngredientsByCategoryID/${id}`)
  }
  addIngredient(ingredient: any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/AddIngredient`,ingredient);
  }

  updateIngredientbyID(id: number, ingredient: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updateIngredientbyID/${id}`,ingredient)
  }

  deleteIngredientbyID(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/DeleteIngredientbyID/${id}`)
  }
}
