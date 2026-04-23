import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LucideLayoutDashboard, LucidePlus, LucideWrench, LucideClock, LucideSearch, LucideFileText, LucideCheckCircle } from '@lucide/angular';
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
    LucideClock, 
    LucideSearch,
    LucideFileText,
    LucideCheckCircle
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Registro de Mantenimiento Correctivo</h1>
          <p class="subtitle">Gestión de incidencias técnicas en líneas de confección</p>
        </div>
        <div class="actions">
          <button mat-stroked-button class="export-btn" (click)="exportPDF()">
            <svg lucideFileText></svg>
            Exportar PDF (FO-026)
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
            <span class="val">{{ dataSource.length }}</span>
          </div>
        </div>
        <div class="mini-card glass-card">
          <svg lucideClock class="icon blue"></svg>
          <div class="info">
            <span class="label">Último Registro</span>
            <span class="val">{{ dataSource[0]?.hraTermino || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- New Record Form (Dynamic) -->
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

      <!-- Filters -->
      <div class="filter-bar glass-card mb-6" *ngIf="allData.length > 0">
        <div class="filter-group">
          <svg lucideSearch class="search-icon"></svg>
          <input type="text" placeholder="Filtrar por Máquina..." (input)="applyFilter($event)" class="filter-input">
        </div>
        <mat-form-field appearance="fill" class="mini-select" *ngIf="catalogos.length > 0">
          <mat-label>Filtrar Problema</mat-label>
          <mat-select (selectionChange)="filterByProblem($event.value)">
             <mat-option [value]="null">Todos</mat-option>
             <mat-option *ngFor="let item of catalogos" [value]="item.id">{{ item.problema }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="table-container glass-card">
        <table mat-table [dataSource]="dataSource" class="premium-table">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha </th>
            <td mat-cell *matCellDef="let element"> {{element.fecha}} </td>
          </ng-container>

          <ng-container matColumnDef="maquina">
            <th mat-header-cell *matHeaderCellDef> Cod. Maq </th>
            <td mat-cell *matCellDef="let element"> 
              <span class="machine-code">{{element.maquinaId || element.codMaq}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="problema">
            <th mat-header-cell *matHeaderCellDef> Problema (D) </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="code-pair">
                <span class="code-val">{{element.catalogoError?.id || element.prob}}</span>
                <span class="code-desc">{{ element.catalogoError?.descripcionProblema || getProblemDesc(element.prob) }}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="solucion">
            <th mat-header-cell *matHeaderCellDef> Solución (E) </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="code-pair">
                <span class="code-val">{{element.catalogoError?.id || element.sol}}</span>
                <span class="code-desc">{{ element.catalogoError?.descripcionSolucion || getSolutionDesc(element.sol) }}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="horas">
            <th mat-header-cell *matHeaderCellDef> Tiempo (Parada → Fin) </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="time-range">
                <span>{{element.horaParada || element.hraParada}}</span>
                <span class="separator">→</span>
                <span>{{element.horaTermino || element.hraTermino}}</span>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        
        <div *ngIf="dataSource.length === 0" class="empty-state p-8 text-center bg-white/50 backdrop-blur rounded-xl border border-dashed border-indigo-200 mt-4">
           <svg lucideWrench class="w-12 h-12 text-indigo-300 mx-auto mb-4"></svg>
           <p class="text-slate-500 font-medium italic">No se encontraron reportes en el sistema.</p>
           <p class="text-xs text-slate-400 mt-1">Inténtelo de nuevo o agrege un registro.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { display: flex; flex-direction: column; gap: 1rem; padding: 1rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    
    .stats-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .mini-card { flex: 1; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; }
    .mini-card .icon { width: 24px; height: 24px; }
    .icon.orange { color: #f59e0b; }
    .icon.blue { color: #3b82f6; }
    .mini-card .info .label { font-size: 0.75rem; color: #64748b; display: block; }
    .mini-card .info .val { font-size: 1.2rem; font-weight: 700; color: #1e293b; }

    .mb-6 { margin-bottom: 1.5rem; }
    .form-container { padding: 1.5rem; border: 1px solid rgba(79, 70, 229, 0.2); }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
    .form-actions { display: flex; justify-content: flex-end; margin-top: 1.5rem; }

    .filter-bar { padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
    .filter-group { display: flex; align-items: center; gap: 10px; background: rgba(241, 245, 249, 0.5); padding: 8px 16px; border-radius: 12px; flex: 1; margin-right: 2rem; border: 1px solid #e2e8f0; }
    .filter-input { background: transparent; border: none; outline: none; width: 100%; font-size: 0.9rem; }
    .search-icon { width: 18px; color: #94a3b8; }
    .mini-select { width: 220px; }

    .premium-table { width: 100%; background: transparent !important; }
    .machine-code { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #4f46e5; background: #eef2ff; padding: 2px 8px; border-radius: 6px; }
    
    .code-pair { display: flex; align-items: center; gap: 8px; }
    .code-val { background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: bold; min-width: 28px; text-align: center; font-size: 0.8rem; }
    .code-desc { font-size: 0.85rem; color: #475569; font-weight: 500; }
    
    .time-range { display: flex; align-items: center; gap: 8px; font-variant-numeric: tabular-nums; font-weight: 600; color: #334155; }
    .separator { color: #cbd5e1; }
    
    .premium-btn { border-radius: 12px !important; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); font-weight: 600; }
    .export-btn { border-radius: 12px !important; border: 1px solid #e2e8f0 !important; color: #475569 !important; font-weight: 600; margin-right: 10px; }
    .save-btn { background: #059669 !important; color: white !important; border-radius: 8px !important; font-weight: 600; }
    .save-btn:disabled { background: #9ca3af !important; }
  `]
})
export class MantenimientoListComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'maquina', 'problema', 'solucion', 'horas'];
  dataSource: any[] = [];
  allData: any[] = [];

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
    this.apiService.listarCatalogos().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.catalogos = data.map(c => ({
            id: c.id,
            problema: c.descripcionProblema,
            solucion: c.descripcionSolucion
          }));
          this.cdr.detectChanges();
        }, 0);
      },
      error: () => {
        this.catalogoService.getCatalogos().subscribe(data => {
            setTimeout(() => {
                this.catalogos = data;
                this.cdr.detectChanges();
            }, 0);
        });
      }
    });
  }

  loadReports() {
    this.apiService.listarReportesMantenimiento().subscribe({
      next: (data) => {
        setTimeout(() => {
            this.dataSource = data;
            this.allData = data;
            this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => {
        console.error('Error al cargar reportes', err);
      }
    });
  }

  isFormValid() {
    return this.newRecord.fecha && 
           this.newRecord.maquinaId && 
           this.newRecord.catalogoErrorId && 
           this.newRecord.horaParada && 
           this.newRecord.horaTermino;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  getProblemDesc(id: number): string {
    return this.catalogos.find(c => c.id === id)?.problema || '---';
  }

  getSolutionDesc(id: number): string {
    return this.catalogos.find(c => c.id === id)?.solucion || '---';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.allData.filter(row => 
      row.maquinaId.toLowerCase().includes(filterValue) || 
      row.catalogoError?.descripcionProblema?.toLowerCase().includes(filterValue)
    );
  }

  filterByProblem(id: number | null) {
    if (id === null) {
      this.dataSource = this.allData;
    } else {
      this.dataSource = this.allData.filter(row => row.catalogoError?.id === id);
    }
  }

  exportPDF() {
    this.pdfService.generateMaintenancePDF(this.dataSource, {
      linea: 'Línea de Producción',
      mecanico: 'Mecánico de Turno'
    });
  }

  addRecord() {
    if (!this.isFormValid()) return;

    const payload = {
      fecha: this.newRecord.fecha,
      maquinaId: this.newRecord.maquinaId,
      catalogoError: { id: this.newRecord.catalogoErrorId },
      horaParada: this.newRecord.horaParada + ':00',
      horaTermino: this.newRecord.horaTermino + ':00'
    };

    this.apiService.guardarReporteMantenimiento(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Registro guardado exitosamente', 'Cerrar', { duration: 3000 });
        this.loadReports();
        this.showForm = false;
        this.newRecord = {
          fecha: new Date().toISOString().split('T')[0],
          maquinaId: '',
          catalogoErrorId: null,
          horaParada: '',
          horaTermino: ''
        };
      },
      error: (err) => {
        this.snackBar.open('Error al guardar registro', 'Cerrar', { duration: 5000 });
        console.error(err);
      }
    });
  }
}
