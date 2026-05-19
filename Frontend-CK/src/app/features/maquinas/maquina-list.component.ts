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
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Maestro de Máquinas</h1>
          <!-- Rebuild trigger -->
          <p class="text-slate-500 font-medium mt-1">Gestión centralizada del inventario industrial CottonKnit</p>
        </div>
        <button 
          (click)="openDialog()"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <svg lucidePlus class="w-5 h-5"></svg>
          Agregar Nueva Máquina
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <svg lucideSettings class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Máquinas</p>
            <p class="text-2xl font-black text-slate-900 mt-1">{{ dataSource.length }}</p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <svg lucideCheckCircle class="w-6 h-6"></svg>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Activas</p>
            <p class="text-2xl font-black text-emerald-600 mt-1">{{ totalActivas }}</p>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <!-- Filter Header -->
        <div class="p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <div class="relative w-full max-w-md">
             <svg lucideSettings class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></svg>
             <input 
               type="text" 
               (keyup)="applyFilter($event)"
               placeholder="Buscar por código, marca o línea..."
               class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
             >
           </div>
           <div class="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
             <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
             {{ filteredData.length }} resultados encontrados
           </div>
        </div>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="filteredData" class="w-full">
            <!-- Codigo Column -->
            <ng-container matColumnDef="codigo">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Código </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                 <span class="bg-indigo-50 text-indigo-700 font-mono text-xs font-black px-2.5 py-1 rounded-md border border-indigo-100 shadow-sm">{{element.codigo}}</span>
              </td>
            </ng-container>

            <!-- Linea Column -->
            <ng-container matColumnDef="linea">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Línea </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-bold text-slate-700"> {{element.linea}} </td>
            </ng-container>

            <!-- Marca Column -->
            <ng-container matColumnDef="marca">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Marca / Modelo </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                 <div class="flex flex-col">
                    <span class="text-sm font-black text-slate-800">{{element.marca}}</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{element.modelo}}</span>
                 </div>
              </td>
            </ng-container>

            <!-- Serie Column -->
            <ng-container matColumnDef="serie">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Serie </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-medium text-slate-500 font-mono"> {{element.serie || '---'}} </td>
            </ng-container>

            <!-- Estado Column -->
            <ng-container matColumnDef="estado">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-center"> Estado </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-center">
                 <div class="flex items-center justify-center gap-2">
                   <mat-slide-toggle 
                     [checked]="element.activa" 
                     (change)="toggleStatus(element)" 
                     color="primary"
                     class="scale-90"
                   ></mat-slide-toggle>
                   <span class="text-[10px] font-black uppercase tracking-widest" [ngClass]="element.activa ? 'text-emerald-600' : 'text-slate-400'">
                     {{ element.activa ? 'Activa' : 'Inactiva' }}
                   </span>
                 </div>
              </td>
            </ng-container>

            <!-- Acciones Column -->
            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-right"> Acciones </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1">
                  <button (click)="openDialog(element)" class="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors group">
                    <svg lucideEdit class="w-4 h-4 group-hover:scale-110 transition-transform"></svg>
                  </button>
                  <button (click)="deleteMaquina(element)" class="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors group">
                    <svg lucideTrash2 class="w-4 h-4 group-hover:scale-110 transition-transform"></svg>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns" class="h-14"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                class="h-16 hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0"
                [class.opacity-50]="!row.activa"></tr>
          </table>
        </div>
        
        <!-- Empty State -->
        <div *ngIf="filteredData.length === 0" class="p-20 text-center flex flex-col items-center">
           <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
             <svg lucideSettings class="w-8 h-8 text-slate-200"></svg>
           </div>
           <h4 class="font-bold text-slate-800">No se encontraron máquinas</h4>
           <p class="text-sm text-slate-400 mt-1">Prueba con otro código o ajusta los filtros.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .mat-mdc-slide-toggle.mat-primary { --mdc-switch-selected-focus-state-layer-color: #4f46e5; --mdc-switch-selected-handle-color: #4f46e5; --mdc-switch-selected-track-color: #c7d2fe; }
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
