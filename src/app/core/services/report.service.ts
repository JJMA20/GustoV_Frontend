import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/Venta`;

  constructor(private http: HttpClient) {}

  obtenerReporteDiario(fecha: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reporte-diario?fecha=${fecha}`);
  }

  descargarReporteDiarioExcel(fecha: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte-diario/excel?fecha=${fecha}`, {
      responseType: 'blob',
    });
  }
}
