import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategorySizeService {
private baseUrl = `${environment.apiurl}/Size`;
  constructor(private http: HttpClient) { }

  GetAllCategorySizes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllCategorySizes`);
  }

GetCategorySizeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetCategorySizeById/${id}`);
  }

AddCategorySize(CategorySize: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AddCategorySize`,CategorySize, { responseType: 'text' as 'json' });
  }
}
