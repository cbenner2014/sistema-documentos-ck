import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LucideLayoutDashboard, LucidePlus, LucideClipboardCheck, LucideFileText } from '@lucide/angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-inspeccion-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    LucidePlus,
    LucideClipboardCheck,
    LucideFileText
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Historial de Inspecciones</h1>
          <p class="subtitle">Control IND-MEC-01 de cabezales y motores</p>
        </div>
        <div class="actions">
          <button mat-flat-button class="premium-btn" routerLink="/inspeccion/nuevo">
            <svg lucidePlus></svg>
            Nueva Inspección
          </button>
        </div>
      </div>

      <div class="table-container glass-card mt-6">
        <table mat-table [dataSource]="dataSource" class="premium-table" *ngIf="dataSource.length > 0">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha </th>
            <td mat-cell *matCellDef="let element"> {{element.fecha}} </td>
          </ng-container>

          <ng-container matColumnDef="maquina">
            <th mat-header-cell *matHeaderCellDef> Máquina </th>
            <td mat-cell *matCellDef="let element"> 
              <span class="machine-code">{{ element.codigoMaquina || 'N/A' }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="linea">
            <th mat-header-cell *matHeaderCellDef> Línea </th>
            <td mat-cell *matCellDef="let element"> {{ element.linea || '---' }} </td>
          </ng-container>

          <ng-container matColumnDef="mecanico">
            <th mat-header-cell *matHeaderCellDef> Mecánico </th>
            <td mat-cell *matCellDef="let element"> {{ element.mecanico || '---' }} </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button class="text-indigo-600" title="Ver Detalles">
                <svg lucideFileText class="w-5 h-5"></svg>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div *ngIf="dataSource.length === 0" class="empty-state p-12 text-center">
           <svg lucideClipboardCheck class="w-16 h-16 text-slate-300 mx-auto mb-4"></svg>
           <p class="text-slate-500 text-lg font-medium">No hay inspecciones registradas.</p>
           <button mat-stroked-button color="primary" class="mt-4" routerLink="/inspeccion/nuevo">
             Registrar la primera ahora
           </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; }
    .machine-code { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #4f46e5; background: #eef2ff; padding: 2px 8px; border-radius: 6px; }
    .premium-btn { border-radius: 12px !important; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); font-weight: 600; }
    .premium-table { width: 100%; background: transparent !important; }
    .mt-6 { margin-top: 1.5rem; }
  `]
})
export class InspeccionListComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'maquina', 'linea', 'mecanico', 'acciones'];
  dataSource: any[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections() {
    this.apiService.listarInspecciones().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.dataSource = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar inspecciones', err)
    });
  }
}
