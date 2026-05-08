import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAgujas, Usuario } from '../models/entities.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api'; // Ajustar según backend

  constructor(private http: HttpClient) {}

  // Stock Agujas
  listarStockAgujas(): Observable<StockAgujas[]> {
    return this.http.get<StockAgujas[]>(`${this.apiUrl}/stock`);
  }

  guardarStockAgujas(stock: StockAgujas): Observable<StockAgujas> {
    return this.http.post<StockAgujas>(`${this.apiUrl}/stock`, stock);
  }

  // Usuarios
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  // Mantenimiento
  listarCatalogos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/catalogo`);
  }

  listarReportesMantenimiento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mantenimiento`);
  }

  guardarReporteMantenimiento(reporte: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mantenimiento`, reporte);
  }

  guardarReportesBatch(reportes: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mantenimiento/batch`, reportes);
  }

  eliminarReportesBatch(batchId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/mantenimiento/batch/${batchId}`);
  }

  // Inspección
  listarInspecciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inspeccion`);
  }

  guardarInspeccion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inspeccion`, data);
  }

  guardarInspeccionesBatch(data: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/inspeccion/batch`, data);
  }

  eliminarInspeccionesBatch(batchId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inspeccion/batch/${batchId}`);
  }
}
