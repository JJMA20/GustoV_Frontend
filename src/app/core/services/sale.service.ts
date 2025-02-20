import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Venta {
    metodoPago: string;
    detalles: { menuId: number; cantidad: number }[];
  }
  
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/Venta`;

  constructor(private http: HttpClient) {}

  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  obtenerVentaById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  registrarVenta(venta: Venta): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }

}