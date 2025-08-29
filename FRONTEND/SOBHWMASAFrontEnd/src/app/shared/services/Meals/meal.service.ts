import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseUrl = `${environment.apiurl}/Meal`;
  constructor(private http: HttpClient) {}

 AddMeal(mealData: any): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/AddMeal`,
    mealData,
      { responseType: 'text' as 'json' }

  );
}
  GetAllMeals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllMeals`);
  }

  GetMealByID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetMealByID/${id}`);
  }
}
