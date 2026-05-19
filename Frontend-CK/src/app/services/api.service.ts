import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAgujas, Usuario } from '../models/entities.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

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

  // Máquinas (Master List)
  listarMaquinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/maquinas`);
  }

  listarMaquinasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/maquinas/activas`);
  }

  guardarMaquina(maquina: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/maquinas`, maquina);
  }

  eliminarMaquina(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/maquinas/${id}`);
  }

  toggleMaquinaStatus(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/maquinas/${id}/status`, {});
  }
}
