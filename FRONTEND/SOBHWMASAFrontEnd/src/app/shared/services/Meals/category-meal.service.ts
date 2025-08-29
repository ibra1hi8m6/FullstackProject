import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CategoryMealService {
  private baseUrl = `${environment.apiurl}/Meal`;
  constructor(private http: HttpClient) {}

  AddCategoryMeal(CategoryMeal: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/AddCategoryMeal`,
      CategoryMeal,
      { responseType: 'text' as 'json' }
    );
  }

  GetAllCategoriesMeals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllCategoriesMeals`);
  }

  GetCategoryMealByID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetCategoryMealByID/${id}`);
  }
}
