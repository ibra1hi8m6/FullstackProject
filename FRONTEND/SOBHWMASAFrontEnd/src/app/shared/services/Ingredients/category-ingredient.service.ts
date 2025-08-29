import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {CategoryIngredient} from '../../forms/add-forms/categoryingredient-forms'
@Injectable({
  providedIn: 'root'
})
export class CategoryIngredientService {

 private baseUrl = `${environment.apiurl}/Ingredient`;

  constructor(private http: HttpClient) { }
  getCategoryIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllCategoriesIngredients`);
  }
  getCategoryIngredientByID(id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/GetCategoryIngredientbyID/${id}`)
  }

  addCategoryIngredient(categoryingredient: CategoryIngredient) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/AddCategoryIngredient`,categoryingredient);
  }

  updateCategoryIngredientbyID(id: number, categoryingredient: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updateCategoryIngredientbyID/${id}`,categoryingredient)
  }

  deleteCategoryIngredientbyID(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/DeleteCategoryIngredientbyID/${id}`)
  }
}
