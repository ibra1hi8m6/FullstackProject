import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SizeService {
private baseUrl = `${environment.apiurl}/Size`;
  constructor(private http: HttpClient) { }

  GetAllSizes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllSizes`);
  }

GetSizeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetSizeById/${id}`);
  }
 GetSizesByCategoryId(id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/GetSizesByCategoryId/${id}`)
  }
AddSize(Size: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AddSize`,Size, { responseType: 'text' as 'json' });
  }
}
