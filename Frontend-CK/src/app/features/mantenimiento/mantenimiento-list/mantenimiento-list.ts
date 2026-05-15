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
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Registro de Mantenimiento Correctivo</h1>
          <p class="subtitle">Gestión de incidencias técnicas en líneas de confección</p>
        </div>
        <div class="actions">
          <button mat-stroked-button class="magic-btn" (click)="generateMagicData()">
            <svg lucideZap class="w-4 h-4 mr-2"></svg>
            Generación Semanal (6 días - 30 reg.)
          </button>
          <button mat-flat-button class="premium-btn" (click)="toggleForm()">
            <svg lucidePlus></svg>
            {{ showForm ? 'Cerrar Formulario' : 'Nuevo Registro' }}
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-row">
        <div class="mini-card glass-card">
          <svg lucideWrench class="icon orange"></svg>
          <div class="info">
            <span class="label">Total Reparaciones</span>
            <span class="val">{{ allData.length }}</span>
          </div>
        </div>
        <div class="mini-card glass-card">
          <svg lucideHistory class="icon blue"></svg>
          <div class="info">
            <span class="label">Reportes Generados</span>
            <span class="val">{{ groupedHistory.length }}</span>
          </div>
        </div>
      </div>

      <!-- New Record Form -->
      <div class="form-container glass-card mb-6" *ngIf="showForm">
        <h3 class="flex items-center gap-2">
          <svg lucidePlus class="w-5 h-5 text-indigo-600"></svg>
          Llenado de Registro FO-026
        </h3>
        <div class="form-grid">
           <mat-form-field appearance="outline">
             <mat-label>Fecha</mat-label>
             <input matInput type="date" [(ngModel)]="newRecord.fecha">
           </mat-form-field>
           
           <mat-form-field appearance="outline">
             <mat-label>Problema / Solución (Cod.)</mat-label>
             <mat-select [(ngModel)]="newRecord.catalogoErrorId">
               <mat-option *ngFor="let item of catalogos" [value]="item.id">
                 {{ item.id }} - {{ item.problema }}
               </mat-option>
             </mat-select>
           </mat-form-field>

           <mat-form-field appearance="outline">
             <mat-label>Cód. Máquina</mat-label>
             <input matInput placeholder="Ej: RB-029" [(ngModel)]="newRecord.maquinaId">
           </mat-form-field>

           <mat-form-field appearance="outline">
             <mat-label>Hra Parada</mat-label>
             <input matInput type="time" [(ngModel)]="newRecord.horaParada">
           </mat-form-field>

           <mat-form-field appearance="outline">
             <mat-label>Hra Término</mat-label>
             <input matInput type="time" [(ngModel)]="newRecord.horaTermino">
           </mat-form-field>
        </div>
        <div class="form-actions">
           <button mat-button (click)="toggleForm()" class="mr-2">Cancelar</button>
           <button mat-flat-button class="save-btn" (click)="addRecord()" [disabled]="!isFormValid()">
              <svg lucideCheckCircle class="w-4 h-4 mr-2"></svg>
              Guardar en Base de Datos
           </button>
        </div>
      </div>

      <!-- HISTORIAL DE REPORTES GENERADOS -->
      <div class="section-title mb-4">
        <h2 class="flex items-center gap-2 text-slate-700">
          <svg lucideHistory class="w-5 h-5"></svg>
          Historial de Documentos FO-026
        </h2>
      </div>

      <div class="table-container glass-card mb-8">
        <table mat-table [dataSource]="groupedHistory" class="premium-table">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha de Creación </th>
            <td mat-cell *matCellDef="let element"> {{element.fechaCreacion}} </td>
          </ng-container>

          <ng-container matColumnDef="periodo">
            <th mat-header-cell *matHeaderCellDef> Periodo de Reporte </th>
            <td mat-cell *matCellDef="let element"> 
               <span class="badge blue">{{element.fechaInicio}} a {{element.fechaFin}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="registros">
            <th mat-header-cell *matHeaderCellDef> Total Filas </th>
            <td mat-cell *matCellDef="let element"> {{element.items.length}} registros </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="flex items-center gap-2">
                <button mat-icon-button class="pdf-row-btn" (click)="downloadBatch(element)" title="Descargar PDF">
                  <svg lucideFileText class="w-6 h-6 text-red-500"></svg>
                </button>
                <button mat-icon-button class="delete-row-btn" (click)="deleteBatch(element)" title="Eliminar del Historial">
                  <svg lucideTrash2 class="w-5 h-5 text-slate-400 hover:text-red-600"></svg>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['fecha', 'periodo', 'registros', 'acciones']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['fecha', 'periodo', 'registros', 'acciones'];"></tr>
        </table>
        
        <div *ngIf="groupedHistory.length === 0" class="empty-state p-12 text-center">
           <svg lucideHistory class="w-12 h-12 text-slate-200 mx-auto mb-4"></svg>
           <p class="text-slate-400 italic font-medium">No hay reportes generados aún en el historial.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .stats-row { display: flex; gap: 1rem; margin-bottom: 2rem; }
    .mini-card { flex: 1; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; }
    .icon.orange { color: #f59e0b; } .icon.blue { color: #3b82f6; }
    .mini-card .info .label { font-size: 0.75rem; color: #64748b; display: block; }
    .mini-card .info .val { font-size: 1.2rem; font-weight: 700; color: #1e293b; }
    
    .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05); }
    .table-container { overflow: hidden; }
    .premium-table { width: 100%; background: transparent !important; }
    
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
    .badge.blue { background: #e0f2fe; color: #0369a1; }
    
    .pdf-row-btn:hover { background: rgba(239, 68, 68, 0.1); transform: scale(1.1); transition: 0.2s; }
    .delete-row-btn:hover { background: rgba(239, 68, 68, 0.1); transition: 0.2s; }
    
    .premium-btn { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; border-radius: 12px !important; height: 50px !important; padding: 0 25px !important; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); font-weight: 600; }
    .magic-btn { border: 2px solid #eab308 !important; color: #a16207 !important; border-radius: 12px !important; height: 50px !important; font-weight: 700; background: #fefce8 !important; margin-right: 10px; }
    .save-btn { background: #059669 !important; color: white !important; border-radius: 8px !important; font-weight: 600; }
  `]
})
export class MantenimientoListComponent implements OnInit {
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
