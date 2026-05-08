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
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Historial de Inspecciones FO525</h1>
          <p class="subtitle">Control IND-MEC-01 de cabezales y motores</p>
        </div>
        <div class="actions flex items-center gap-4">
          <div class="magic-box flex items-center gap-2">
            <mat-form-field appearance="outline" class="w-24 dense-field">
              <mat-label>Cant.</mat-label>
              <input matInput type="number" [(ngModel)]="magicCount" min="1" max="50">
            </mat-form-field>
            <button mat-stroked-button class="magic-btn" (click)="generateMagicInspections()">
              <svg lucideZap class="w-4 h-4 mr-2"></svg>
              Generar {{ magicCount }} Máquinas
            </button>
          </div>
          <button mat-flat-button class="premium-btn" routerLink="/inspeccion/nuevo">
            <svg lucidePlus></svg>
            Nueva Inspección Manual
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-row flex gap-4 mt-6">
        <div class="mini-card glass-card flex-1 p-4 flex items-center gap-4">
          <svg lucideClipboardCheck class="w-8 h-8 text-indigo-500"></svg>
          <div>
             <span class="text-xs text-slate-500 block">Total Inspecciones</span>
             <span class="text-xl font-bold">{{ allInspections.length }}</span>
          </div>
        </div>
        <div class="mini-card glass-card flex-1 p-4 flex items-center gap-4">
          <svg lucideHistory class="w-8 h-8 text-blue-500"></svg>
          <div>
             <span class="text-xs text-slate-500 block">Reportes Generados</span>
             <span class="text-xl font-bold">{{ groupedHistory.length }}</span>
          </div>
        </div>
      </div>

      <div class="table-container glass-card mt-6">
        <table mat-table [dataSource]="groupedHistory" class="premium-table" *ngIf="groupedHistory.length > 0">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha Creación </th>
            <td mat-cell *matCellDef="let element"> {{element.fechaCreacion}} </td>
          </ng-container>

          <ng-container matColumnDef="batch">
            <th mat-header-cell *matHeaderCellDef> ID de Reporte </th>
            <td mat-cell *matCellDef="let element"> 
               <span class="batch-id">{{ element.id }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="maquinas">
            <th mat-header-cell *matHeaderCellDef> Máquinas </th>
            <td mat-cell *matCellDef="let element"> {{ element.items.length }} unidades </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let element">
              <div class="flex gap-2">
                <button mat-icon-button (click)="downloadBatch(element)" title="Descargar PDF Batch">
                  <svg lucideFileText class="w-6 h-6 text-red-500"></svg>
                </button>
                <button mat-icon-button (click)="deleteBatch(element)" title="Eliminar Lote">
                  <svg lucideTrash2 class="w-5 h-5 text-slate-400 hover:text-red-600"></svg>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['fecha', 'batch', 'maquinas', 'acciones']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['fecha', 'batch', 'maquinas', 'acciones'];"></tr>
        </table>

        <div *ngIf="groupedHistory.length === 0" class="empty-state p-12 text-center">
           <svg lucideClipboardCheck class="w-16 h-16 text-slate-300 mx-auto mb-4"></svg>
           <p class="text-slate-500 text-lg font-medium">No hay lotes de inspección registrados.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1.5rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; }
    .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05); }
    .batch-id { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #6366f1; background: #eef2ff; padding: 4px 8px; border-radius: 6px; }
    .premium-btn { border-radius: 12px !important; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); font-weight: 600; height: 50px !important; }
    .magic-btn { border: 2px solid #eab308 !important; color: #a16207 !important; border-radius: 12px !important; height: 50px !important; font-weight: 700; background: #fefce8 !important; }
    .premium-table { width: 100%; background: transparent !important; }
    .dense-field { height: 65px; margin-bottom: -15px; }
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
