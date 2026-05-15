import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LucidePlus, LucideCheckCircle, LucideTrash2, LucideEdit, LucideSettings } from '@lucide/angular';
import { ApiService } from '../../services/api.service';
import { MaquinaDialogComponent } from './maquina-dialog.component';

@Component({
  selector: 'app-maquina-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    LucidePlus,
    LucideCheckCircle,
    LucideTrash2,
    LucideEdit,
    LucideSettings
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1 class="gradient-text">Maestro de Máquinas</h1>
          <p class="subtitle">Gestión centralizada del inventario industrial CottonKnit</p>
        </div>
        <div class="actions">
          <button mat-flat-button class="premium-btn" (click)="openDialog()">
            <svg lucidePlus class="w-4 h-4 mr-2"></svg>
            Agregar Nueva Máquina
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-row flex gap-4 mt-6 mb-6">
        <div class="mini-card glass-card flex-1 p-4 flex items-center gap-4">
          <svg lucideSettings class="w-8 h-8 text-indigo-500"></svg>
          <div>
             <span class="text-xs text-slate-500 block">Total Máquinas</span>
             <span class="text-xl font-bold">{{ dataSource.length }}</span>
          </div>
        </div>
        <div class="mini-card glass-card flex-1 p-4 flex items-center gap-4">
          <svg lucideCheckCircle class="w-8 h-8 text-green-500"></svg>
          <div>
             <span class="text-xs text-slate-500 block">Activas</span>
             <span class="text-xl font-bold text-green-600">{{ totalActivas }}</span>
          </div>
        </div>
      </div>

      <div class="table-container glass-card overflow-hidden">
        <div class="p-4 bg-slate-50/50 border-b flex justify-between items-center">
           <mat-form-field appearance="outline" class="w-full max-w-md dense-field no-subscript">
              <mat-label>Buscar máquina por código, marca o línea...</mat-label>
              <input matInput (keyup)="applyFilter($event)" placeholder="Ej: CR-041">
           </mat-form-field>
        </div>

        <table mat-table [dataSource]="filteredData" class="premium-table">
          <ng-container matColumnDef="codigo">
            <th mat-header-cell *matHeaderCellDef> Código </th>
            <td mat-cell *matCellDef="let element"> 
               <span class="badge blue font-mono">{{element.codigo}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="linea">
            <th mat-header-cell *matHeaderCellDef> Línea </th>
            <td mat-cell *matCellDef="let element"> {{element.linea}} </td>
          </ng-container>

          <ng-container matColumnDef="marca">
            <th mat-header-cell *matHeaderCellDef> Marca / Modelo </th>
            <td mat-cell *matCellDef="let element"> 
               <div class="flex flex-col">
                  <span class="font-medium">{{element.marca}}</span>
                  <span class="text-xs text-slate-400">{{element.modelo}}</span>
               </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="serie">
            <th mat-header-cell *matHeaderCellDef> Serie </th>
            <td mat-cell *matCellDef="let element"> {{element.serie || '---'}} </td>
          </ng-container>

          <ng-container matColumnDef="estado">
            <th mat-header-cell *matHeaderCellDef> Estado </th>
            <td mat-cell *matCellDef="let element">
               <mat-slide-toggle [checked]="element.activa" (change)="toggleStatus(element)" color="primary">
                  {{ element.activa ? 'Activa' : 'Inactiva' }}
               </mat-slide-toggle>
            </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let element">
              <div class="flex gap-2">
                <button mat-icon-button class="edit-btn" (click)="openDialog(element)" title="Editar">
                  <svg lucideEdit class="w-5 h-5 text-indigo-500"></svg>
                </button>
                <button mat-icon-button class="delete-btn" (click)="deleteMaquina(element)" title="Eliminar">
                  <svg lucideTrash2 class="w-5 h-5 text-red-400"></svg>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" [class.inactive-row]="!row.activa"></tr>
        </table>
        
        <div *ngIf="filteredData.length === 0" class="empty-state p-12 text-center">
           <svg lucideSettings class="w-16 h-16 text-slate-200 mx-auto mb-4"></svg>
           <p class="text-slate-400 italic">No se encontraron máquinas que coincidan con la búsqueda.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 1.5rem; }
    .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05); }
    .premium-btn { border-radius: 12px !important; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; height: 50px !important; padding: 0 25px !important; font-weight: 600; }
    .premium-table { width: 100%; background: transparent !important; }
    .badge { padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }
    .badge.blue { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .no-subscript ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; }
    .inactive-row { opacity: 0.6; background-color: #f8fafc; }
    .edit-btn:hover { background: #eef2ff; border-radius: 8px; }
    .delete-btn:hover { background: #fef2f2; border-radius: 8px; }
  `]
})
export class MaquinaListComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'linea', 'marca', 'serie', 'estado', 'acciones'];
  dataSource: any[] = [];
  filteredData: any[] = [];
  totalActivas = 0;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMaquinas();
  }

  loadMaquinas() {
    this.apiService.listarMaquinas().subscribe((data: any[]) => {
      this.dataSource = data;
      this.filteredData = data;
      this.totalActivas = data.filter((m: any) => m.activa).length;
      this.cdr.detectChanges();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter((m: any) => 
      m.codigo.toLowerCase().includes(filterValue) || 
      m.marca?.toLowerCase().includes(filterValue) || 
      m.linea?.toLowerCase().includes(filterValue)
    );
  }

  openDialog(maquina?: any) {
    const dialogRef = this.dialog.open(MaquinaDialogComponent, {
      width: '600px',
      data: maquina || {},
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadMaquinas();
    });
  }

  toggleStatus(maquina: any) {
    this.apiService.toggleMaquinaStatus(maquina.id).subscribe(() => {
      maquina.activa = !maquina.activa;
      this.totalActivas = this.dataSource.filter((m: any) => m.activa).length;
      this.snackBar.open(`Máquina ${maquina.codigo} ${maquina.activa ? 'activada' : 'desactivada'}`, 'OK', { duration: 2000 });
    });
  }

  deleteMaquina(maquina: any) {
    if (confirm(`¿Estás seguro de eliminar permanentemente la máquina ${maquina.codigo}?`)) {
      this.apiService.eliminarMaquina(maquina.id).subscribe(() => {
        this.snackBar.open('Máquina eliminada con éxito', 'OK', { duration: 3000 });
        this.loadMaquinas();
      });
    }
  }
}
