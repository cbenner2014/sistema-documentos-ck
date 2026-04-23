export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  nombreCompleto: string;
  rol: string;
}

export interface StockAgujas {
  id?: number;
  fecha: string;
  linea: string;
  cliente: string;
  tipoRecta: number;
  tipoRemalle: number;
  tipoRecubierto: number;
  tipoEspeciales: number;
  total: number;
  observaciones?: string;
}
