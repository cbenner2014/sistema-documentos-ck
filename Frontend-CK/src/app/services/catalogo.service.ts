import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CatalogoError {
  id: number;
  problema: string;
  solucion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  // Datos extraídos del PDF 224
  private catalogos: CatalogoError[] = [
    { id: 1, problema: 'Salta Puntada', solucion: 'Regula Alimentación' },
    { id: 2, problema: 'Varia Tensión', solucion: 'Regulador De Tensión' },
    { id: 3, problema: 'Rotura Hilo', solucion: 'Cambiar De Aguja Y Regular Tensión' },
    { id: 4, problema: 'Revirado', solucion: 'Se Bajó Diferencial' },
    { id: 5, problema: 'Acordonado', solucion: 'Se Suelta Tensión Del Garfio' },
    { id: 6, problema: 'Contraste (Ojitos)', solucion: 'Se Graduó Tensión Y Tira Hilo' },
    { id: 7, problema: 'Rotura De Aguja', solucion: 'Se Cambió De Placa' },
    { id: 8, problema: 'Graduación De Maquina', solucion: 'Cambio De Prénsatela Y Regula Tensiones' },
    { id: 9, problema: 'Regulación De Pedal', solucion: 'Se Ajustó Pedal' },
    { id: 10, problema: 'Embolsado', solucion: 'Regular Deferencial Impelente' },
    { id: 11, problema: 'Variación De Pestaña', solucion: 'Cambio Prénsatela Y Embudo' },
    { id: 12, problema: 'Sale Hueco', solucion: 'Se Cambió La Aguja Por Marcado' },
    { id: 13, problema: 'Sale Dientes', solucion: 'Corregir Al Guiador' },
    { id: 14, problema: 'Rectificación De Placa', solucion: 'Para Cerrado De Costado' },
    { id: 15, problema: 'Sale Orillado', solucion: 'Regular Tensión' },
    { id: 16, problema: 'No Cazada', solucion: 'Afiliar Cuchilla' },
    { id: 17, problema: 'Tensión Ajustada', solucion: 'Se Suelta Tensiones' },
    { id: 18, problema: 'Soldar Guía Prénsatela', solucion: 'Para Cerrado' },
    { id: 19, problema: 'Pica Tejido (Tela)', solucion: 'Cambio De Aguja Y Regular Prénsatela' },
    { id: 20, problema: 'Salto De Puntada', solucion: 'Regulación De Garfio Y Prénsatela' },
    { id: 21, problema: 'Motor Ruidoso', solucion: 'Graduar Motor' },
    { id: 22, problema: 'Repuesto Defectuoso', solucion: 'Maquina Mal Graduada' },
    { id: 23, problema: 'Cambio De Modelo', solucion: 'Mover Línea' },
    { id: 24, problema: 'Mancha Aceite (papel testigo)', solucion: 'Limpieza De Maquina' }
  ];

  constructor() {}

  getCatalogos(): Observable<CatalogoError[]> {
    return of(this.catalogos);
  }
}
