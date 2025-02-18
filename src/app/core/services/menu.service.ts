import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/Menu`;

  constructor(private http: HttpClient) {}

  obtenerMenus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerMenu(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarMenu(menu: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, menu);
  }

  actualizarMenu(menu: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${menu.id}`, menu);
  }

  eliminarMenu(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}