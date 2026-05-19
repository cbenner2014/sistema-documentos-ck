import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // REFRESH 1.1
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LucideLayoutDashboard, LucidePlus, LucideClipboardCheck, LucideFileText, LucideZap, LucideHistory, LucideTrash2 } from '@lucide/angular';
import { ApiService } from '../../../services/api.service';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-inspeccion-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    LucidePlus,
    LucideClipboardCheck,
    LucideFileText,
    LucideZap,
    LucideHistory,
    LucideTrash2
  ],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Historial de Inspecciones FO525</h1>
          <p class="text-slate-500 font-medium mt-1 tracking-tight">Control IND-MEC-01 de cabezales y motores en planta</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 bg-amber-50/50 border-2 border-amber-500/30 rounded-xl px-3 py-1.5 shadow-sm shadow-amber-100">
            <span class="text-[10px] font-black text-amber-600 uppercase tracking-widest">Lote:</span>
            <input 
              type="number" 
              [(ngModel)]="magicCount" 
              min="1" max="50"
              class="w-12 bg-white border border-amber-200 rounded-lg px-2 py-1 text-xs font-bold text-amber-700 outline-none focus:ring-2 focus:ring-amber-500/20"
            >
            <button 
              (click)="generateMagicInspections()"
              class="text-amber-600 hover:text-amber-700 transition-colors"
              title="Generar Inspecciones Mágicas"
            >
              <svg lucideZap class="w-5 h-5 fill-amber-500"></svg>
            </button>
          </div>
          <button 
            routerLink="/inspeccion/nuevo"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95 shrink-0"
          >
            <svg lucidePlus class="w-5 h-5"></svg>
            Nueva Inspección Manual
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group">
          <div class="p-3 bg-indigo-50 text-indigo-500 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <svg lucideClipboardCheck class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Inspecciones Totales</p>
            <p class="text-2xl font-black text-slate-900 mt-1">{{ allInspections.length }}</p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group">
          <div class="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <svg lucideHistory class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Lotes Generados</p>
            <p class="text-2xl font-black text-slate-900 mt-1">{{ groupedHistory.length }}</p>
          </div>
        </div>
      </div>

      <!-- History Section -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
          <h2 class="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <svg lucideHistory class="w-5 h-5 text-indigo-500"></svg>
            Historial de Reportes FO525
          </h2>
          <div class="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
             <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
             Sistema Actualizado
          </div>
        </div>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="groupedHistory" class="w-full">
            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Fecha de Creación </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-bold text-slate-600"> {{element.fechaCreacion}} </td>
            </ng-container>

            <ng-container matColumnDef="batch">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> ID de Reporte </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                 <span class="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">{{ element.id }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="maquinas">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-center"> Máquinas </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-center"> 
                 <span class="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg uppercase tracking-tight">{{ element.items.length }} unidades</span>
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

            <tr mat-header-row *matHeaderRowDef="['fecha', 'batch', 'maquinas', 'acciones']" class="h-14"></tr>
            <tr mat-row *matRowDef="let row; columns: ['fecha', 'batch', 'maquinas', 'acciones'];" class="h-16 hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0"></tr>
          </table>
        </div>
        
        <div *ngIf="groupedHistory.length === 0" class="p-24 text-center flex flex-col items-center">
           <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
             <svg lucideClipboardCheck class="w-8 h-8"></svg>
           </div>
           <h4 class="font-bold text-slate-800 tracking-tight">No hay lotes de inspección registrados</h4>
           <p class="text-sm text-slate-400 mt-1 font-medium text-balance max-w-xs">Comienza generando inspecciones o registra una manualmente.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class InspeccionListComponent implements OnInit {
  allInspections: any[] = [];
  groupedHistory: any[] = [];
  magicCount: number = 2;

  constructor(
    private apiService: ApiService,
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections() {
    this.apiService.listarInspecciones().subscribe({
      next: (data) => {
        this.allInspections = data;
        this.processHistory(data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar inspecciones', err)
    });
  }

  processHistory(data: any[]) {
    const groups = new Map();
    data.forEach(item => {
      const bId = item.batchId || 'MANUAL-' + item.fecha;
      if (!groups.has(bId)) {
        groups.set(bId, {
          id: bId,
          fechaCreacion: item.fecha,
          items: []
        });
      }
      groups.get(bId).items.push(item);
    });
    this.groupedHistory = Array.from(groups.values()).reverse();
  }

  generateMagicInspections() {
    const machines = ['RY-203', 'RB-045', 'RC-012', 'GR-102', 'CR-088', 'RS-022', 'RB-009', 'RY-055', 'RC-067', 'GR-021'];
    const bId = 'INS-BATCH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const today = new Date().toISOString().split('T')[0];
    
    const batchData: any[] = [];

    for (let i = 0; i < this.magicCount; i++) {
      const machineCode = machines[Math.floor(Math.random() * machines.length)];
      batchData.push({
        fecha: today,
        codigoMaquina: machineCode,
        marcaMotor: 'BROTHER',
        linea: 'PRODUCCIÓN A',
        modeloCabezal: 'S-7200C',
        modeloMotor: 'MD-602',
        serieCabezal: 'Z' + Math.floor(Math.random() * 1000000),
        serieMotor: 'M' + Math.floor(Math.random() * 1000000),
        mecanico: 'Darwin',
        codigoMecanico: 'MEC-01',
        observaciones: 'Se realiza limpieza general y lubricación de piezas móviles.',
        pruebaCostura: true,
        revisadoPor: 'Supervisor Admin',
        batchId: bId,
        detalles: this.getInitialChecklist()
      });
    }

    this.apiService.guardarInspeccionesBatch(batchData).subscribe(() => {
      this.snackBar.open(`¡Lote de ${this.magicCount} inspecciones generado!`, 'OK', { duration: 3000 });
      this.loadInspections();
    });
  }

  getInitialChecklist() {
    const components = [
      // CABEZALES
      { s: 'CABEZALES', c: 'Garfios' }, { s: 'CABEZALES', c: 'Cuchillas' }, { s: 'CABEZALES', c: 'Placa de Aguja' },
      { s: 'CABEZALES', c: 'Peines' }, { s: 'CABEZALES', c: 'Prénsatela' }, { s: 'CABEZALES', c: 'Barra de aguja' },
      { s: 'CABEZALES', c: 'Bocina' }, { s: 'CABEZALES', c: 'Protector de dedo' }, { s: 'CABEZALES', c: 'Protector de vista' },
      { s: 'CABEZALES', c: 'Protector de cabeza' }, { s: 'CABEZALES', c: 'Sticker de seguridad' }, { s: 'CABEZALES', c: 'Otros' },
      
      // TORNILLOS
      { s: 'TORNILLOS', c: 'Revision de Tornillos' },
      
      // ACEITE
      { s: 'ACEITE', c: 'Retenes' }, { s: 'ACEITE', c: 'Filtro' }, { s: 'ACEITE', c: 'Aceite textil SE ISO 32/46 PLUS' },
      { s: 'ACEITE', c: 'Grasa' }, { s: 'ACEITE', c: 'Mueble' }, { s: 'ACEITE', c: 'Pedestal(pintado)' }, 
      { s: 'ACEITE', c: 'Ruedas' }, { s: 'ACEITE', c: 'Esquineros' },
      
      // MOTORES
      { s: 'MOTORES', c: 'Rodajes y Vibraciones' }, { s: 'MOTORES', c: 'fajas' }, 
      { s: 'MOTORES', c: 'Tapas protectoras' }, { s: 'MOTORES', c: 'Otros' }
    ];
    return components.map(comp => ({
      seccion: comp.s,
      componente: comp.c,
      estado: 'OK',
      observaciones: ''
    }));
  }

  downloadBatch(group: any) {
    this.pdfService.generateInspectionBatchPDF(group.items);
  }

  deleteBatch(group: any) {
    if (confirm(`¿Eliminar este lote de ${group.items.length} inspecciones?`)) {
      this.apiService.eliminarInspeccionesBatch(group.id).subscribe(() => {
        this.snackBar.open('Lote eliminado', 'OK', { duration: 3000 });
        this.loadInspections();
      });
    }
  }
}
