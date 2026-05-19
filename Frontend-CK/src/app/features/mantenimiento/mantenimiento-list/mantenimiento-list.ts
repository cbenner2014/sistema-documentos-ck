import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LucideLayoutDashboard, LucidePlus, LucideWrench, LucideFileText, LucideCheckCircle, LucideZap, LucideHistory, LucideTrash2 } from '@lucide/angular';
import { CatalogoService, CatalogoError } from '../../../services/catalogo.service';
import { PdfService } from '../../../services/pdf.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-mantenimiento-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatTableModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    LucidePlus, 
    LucideWrench, 
    LucideFileText,
    LucideCheckCircle,
    LucideZap,
    LucideHistory,
    LucideTrash2
  ],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Registro de Mantenimiento Correctivo</h1>
          <p class="text-slate-500 font-medium mt-1 tracking-tight">Gestión de incidencias técnicas en líneas de confección (FO-026)</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            (click)="generateMagicData()"
            class="px-5 py-3 rounded-xl border-2 border-amber-500 text-amber-600 bg-amber-50/50 font-bold flex items-center gap-2 hover:bg-amber-100 transition-all active:scale-95 shrink-0 shadow-sm shadow-amber-100"
          >
            <svg lucideZap class="w-4 h-4"></svg>
            Generación Semanal
          </button>
          <button 
            (click)="toggleForm()"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95 shrink-0"
          >
            <svg lucidePlus class="w-5 h-5 transition-transform" [class.rotate-45]="showForm"></svg>
            {{ showForm ? 'Cerrar Formulario' : 'Nuevo Registro' }}
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group">
          <div class="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <svg lucideWrench class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Reparaciones</p>
            <p class="text-2xl font-black text-slate-900 mt-1">{{ allData.length }}</p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group">
          <div class="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <svg lucideHistory class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Reportes FO-026</p>
            <p class="text-2xl font-black text-slate-900 mt-1">{{ groupedHistory.length }}</p>
          </div>
        </div>
      </div>

      <!-- New Record Form (Collapsible) -->
      <div *ngIf="showForm" class="bg-white rounded-2xl border-2 border-indigo-100 shadow-xl shadow-indigo-50/50 overflow-hidden animate-in zoom-in-95 duration-300">
        <div class="p-6 border-b border-indigo-50 bg-indigo-50/30 flex items-center justify-between">
          <h3 class="font-bold text-indigo-900 flex items-center gap-2">
            <svg lucidePlus class="w-5 h-5"></svg>
            Llenado de Registro de Mantenimiento (FO-026)
          </h3>
          <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Planta 01 - CottonKnit</span>
        </div>
        
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fecha</label>
              <input type="date" [(ngModel)]="newRecord.fecha" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>

            <div class="space-y-1.5 lg:col-span-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Problema / Solución</label>
              <select [(ngModel)]="newRecord.catalogoErrorId" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none">
                <option [ngValue]="null">Seleccione un código...</option>
                <option *ngFor="let item of catalogos" [value]="item.id">
                  {{ item.id }} - {{ item.problema }}
                </option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cód. Máquina</label>
              <input type="text" [(ngModel)]="newRecord.maquinaId" placeholder="Ej: RB-029" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Inicio</label>
                <input type="time" [(ngModel)]="newRecord.horaParada" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Término</label>
                <input type="time" [(ngModel)]="newRecord.horaTermino" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8 gap-3">
            <button (click)="toggleForm()" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
            <button 
              (click)="addRecord()" 
              [disabled]="!isFormValid()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              <svg lucideCheckCircle class="w-5 h-5"></svg>
              Guardar Reporte Técnico
            </button>
          </div>
        </div>
      </div>

      <!-- History Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
          <h2 class="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <svg lucideHistory class="w-5 h-5 text-indigo-500"></svg>
            Historial de Documentos FO-026
          </h2>
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ groupedHistory.length }} reportes generados</span>
        </div>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="groupedHistory" class="w-full">
            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Fecha de Creación </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-bold text-slate-600"> {{element.fechaCreacion}} </td>
            </ng-container>

            <ng-container matColumnDef="periodo">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Periodo de Reporte </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                 <span class="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-tighter">
                   {{element.fechaInicio}} <span class="mx-1 text-blue-300">→</span> {{element.fechaFin}}
                 </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="registros">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-center"> Total Filas </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-center">
                 <span class="text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded">{{element.items.length}} registros</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-right"> Acciones </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-right"> 
                <div class="flex justify-end gap-1">
                  <button (click)="downloadBatch(element)" class="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors group" title="Descargar PDF">
                    <svg lucideFileText class="w-5 h-5 group-hover:scale-110 transition-transform"></svg>
                  </button>
                  <button (click)="deleteBatch(element)" class="p-2 hover:bg-slate-100 text-slate-300 hover:text-red-600 rounded-lg transition-colors" title="Eliminar">
                    <svg lucideTrash2 class="w-4 h-4"></svg>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="['fecha', 'periodo', 'registros', 'acciones']" class="h-14"></tr>
            <tr mat-row *matRowDef="let row; columns: ['fecha', 'periodo', 'registros', 'acciones'];" class="h-16 hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0"></tr>
          </table>
        </div>
        
        <div *ngIf="groupedHistory.length === 0" class="p-24 text-center flex flex-col items-center">
           <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
             <svg lucideHistory class="w-8 h-8"></svg>
           </div>
           <h4 class="font-bold text-slate-800 tracking-tight">No hay reportes generados aún</h4>
           <p class="text-sm text-slate-400 mt-1 font-medium">Los reportes semanales aparecerán aquí después de la generación.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class MantenimientoListComponent implements OnInit {
  LucidePlus = LucidePlus;
  LucideZap = LucideZap;
  LucideWrench = LucideWrench;
  LucideHistory = LucideHistory;
  LucideTrash2 = LucideTrash2;
  LucideFileText = LucideFileText;
  LucideCheckCircle = LucideCheckCircle;

  allData: any[] = [];
  groupedHistory: any[] = [];
  catalogos: CatalogoError[] = [];
  showForm = false;
  
  newRecord = {
    fecha: new Date().toISOString().split('T')[0],
    maquinaId: '',
    catalogoErrorId: null as number | null,
    horaParada: '',
    horaTermino: ''
  };

  constructor(
    private catalogoService: CatalogoService,
    private pdfService: PdfService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCatalogos();
    this.loadReports();
  }

  loadCatalogos() {
    this.apiService.listarCatalogos().subscribe(data => {
      this.catalogos = data.map(c => ({ id: c.id, problema: c.descripcionProblema, solucion: c.descripcionSolucion }));
    });
  }

  loadReports() {
    this.apiService.listarReportesMantenimiento().subscribe(data => {
      this.allData = data;
      this.processHistory(data);
      this.cdr.detectChanges();
    });
  }

  processHistory(data: any[]) {
    const groups = new Map();
    data.forEach(item => {
      const bId = item.batchId || 'manual-' + item.fecha;
      if (!groups.has(bId)) {
        groups.set(bId, {
          id: bId,
          fechaCreacion: item.fecha,
          items: [],
          fechaInicio: item.fecha,
          fechaFin: item.fecha
        });
      }
      const group = groups.get(bId);
      group.items.push(item);
      if (item.fecha < group.fechaInicio) group.fechaInicio = item.fecha;
      if (item.fecha > group.fechaFin) group.fechaFin = item.fecha;
    });
    this.groupedHistory = Array.from(groups.values()).reverse();
  }

  generateMagicData() {
    const machines = ['CR-041', 'CR-057', 'CR-253', 'R3-038', 'R4-188', 'R4-121', 'RP-065', 'RB-062', 'RC-050', 'RP-004'];
    const pCodes = [1, 6, 10, 17, 9, 16, 21, 2, 7, 8, 4, 13];
    const bId = 'BATCH-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const magicEntries: any[] = [];
    
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      let hour = 8;
      let min = 30;

      for (let j = 0; j < 5; j++) {
        const pCode = pCodes[Math.floor(Math.random() * pCodes.length)];
        
        // Formatear hora de inicio
        const startH = hour.toString().padStart(2, '0');
        const startM = min.toString().padStart(2, '0');
        
        // Calcular hora de término (evitando que los minutos pasen de 59)
        const duration = 15 + Math.floor(Math.random() * 20);
        let totalMin = min + duration;
        let endH = hour + Math.floor(totalMin / 60);
        let endM = totalMin % 60;

        magicEntries.push({
          fecha: dateStr,
          maquinaId: machines[Math.floor(Math.random() * machines.length)],
          catalogoError: { id: pCode },
          horaParada: `${startH}:${startM}:00`,
          horaTermino: `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}:00`,
          batchId: bId
        });

        // Saltar al siguiente registro (minimo 45 min después)
        let gap = 45 + Math.floor(Math.random() * 60);
        let nextTotalMin = endM + gap;
        hour = endH + Math.floor(nextTotalMin / 60);
        min = nextTotalMin % 60;

        if (hour >= 18) break;
      }
    }

    this.apiService.guardarReportesBatch(magicEntries).subscribe(() => {
      this.snackBar.open('¡Reporte generado con éxito!', 'OK', { duration: 3000 });
      this.loadReports();
    });
  }

  downloadBatch(group: any) {
    this.pdfService.generateMaintenancePDF(group.items, {
      linea: 'Muestras / Producción',
      mecanico: 'Darwin'
    });
  }

  deleteBatch(group: any) {
    if (confirm(`¿Estás seguro de eliminar este reporte semanal?`)) {
      this.apiService.eliminarReportesBatch(group.id).subscribe(() => {
        this.snackBar.open('Reporte eliminado', 'OK', { duration: 3000 });
        this.loadReports();
      });
    }
  }

  isFormValid() { return this.newRecord.fecha && this.newRecord.maquinaId && this.newRecord.catalogoErrorId; }
  toggleForm() { this.showForm = !this.showForm; }
  addRecord() { /* ... */ }
}
