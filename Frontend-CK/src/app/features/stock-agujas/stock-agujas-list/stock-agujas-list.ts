import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LucideLayoutDashboard, LucidePlus, LucideSearch, LucideFileText, LucideSave, LucideDownload, LucideDatabase } from '@lucide/angular';
import { StockAgujas } from '../../../models/entities.models';
import { ApiService } from '../../../services/api.service';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-stock-agujas-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    LucidePlus, 
    LucideSearch, 
    LucideFileText,
    LucideSave,
    LucideDownload
  ],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Clasificación de Agujas</h1>
          <p class="text-slate-500 font-medium mt-1">Gestión y control de inventario de agujas por línea</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            (click)="exportPDF()" 
            [disabled]="dataSource.length === 0"
            class="px-5 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:border-slate-300 disabled:text-slate-400"
          >
            <svg lucideDownload class="w-4 h-4"></svg>
            Exportar Stock (PDF)
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

      <!-- New Record Form (Collapsible) -->
      <div *ngIf="showForm" class="bg-white rounded-2xl border-2 border-indigo-100 shadow-xl shadow-indigo-50/50 overflow-hidden animate-in zoom-in-95 duration-300">
        <div class="p-6 border-b border-indigo-50 bg-indigo-50/30 flex items-center justify-between">
          <h3 class="font-bold text-indigo-900 flex items-center gap-2">
            <svg lucidePlus class="w-5 h-5"></svg>
            Llenado de Clasificación de Agujas (MDM-01)
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Estado:</span>
            <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded">Editable</span>
          </div>
        </div>
        
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Fecha</label>
              <input type="date" [(ngModel)]="newRecord.fecha" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cliente</label>
              <input type="text" [(ngModel)]="newRecord.cliente" placeholder="Ej: Cotton Knit" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Línea / Módulo</label>
              <input type="text" [(ngModel)]="newRecord.linea" placeholder="Ej: Muestras" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            
            <div class="md:col-span-3 lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Total Agujas</span>
              <span class="text-4xl font-black text-indigo-600 mt-1">{{ newRecord.total }}</span>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cant. Recta</label>
              <input type="number" [(ngModel)]="newRecord.tipoRecta" (input)="updateTotal()" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cant. Remalle</label>
              <input type="number" [(ngModel)]="newRecord.tipoRemalle" (input)="updateTotal()" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cant. Recubierto</label>
              <input type="number" [(ngModel)]="newRecord.tipoRecubierto" (input)="updateTotal()" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cant. Especiales</label>
              <input type="number" [(ngModel)]="newRecord.tipoEspeciales" (input)="updateTotal()" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>
          </div>

          <div class="flex justify-end mt-8 gap-3">
            <button (click)="toggleForm()" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
            <button 
              (click)="saveRecord()" 
              [disabled]="!isFormValid()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              <svg lucideSave class="w-5 h-5"></svg>
              Guardar en Base de Datos
            </button>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/20">
          <div class="relative w-full max-w-sm">
            <svg lucideSearch class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></svg>
            <input 
              type="text" 
              (input)="applyFilter($event)"
              placeholder="Filtrar por cliente o línea..."
              class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            >
          </div>
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Registros</span>
              <span class="text-sm font-black text-slate-700 mt-1">{{ dataSource.length }}</span>
            </div>
            <div class="h-8 w-px bg-slate-200"></div>
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Stock</span>
              <span class="text-sm font-black text-indigo-600 mt-1">1,240</span>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="dataSource" class="w-full">
            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Fecha </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-bold text-slate-600"> {{element.fecha}} </td>
            </ng-container>

            <ng-container matColumnDef="cliente">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Cliente </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                <span class="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase border border-indigo-100">{{element.cliente}}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="linea">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> Línea </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-sm font-bold text-slate-700"> {{element.linea}} </td>
            </ng-container>

            <ng-container matColumnDef="tipos">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30"> R | RM | RC | E </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4"> 
                <div class="flex gap-3 font-mono text-xs text-slate-500 font-bold">
                  <span class="w-8">{{element.tipoRecta}}</span>
                  <span class="w-8">{{element.tipoRemalle}}</span>
                  <span class="w-8">{{element.tipoRecubierto}}</span>
                  <span class="w-8">{{element.tipoEspeciales}}</span>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-center"> Total </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-center">
                 <span class="text-sm font-black text-indigo-600">{{element.total}}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 text-right"> </th>
              <td mat-cell *matCellDef="let element" class="px-6 py-4 text-right">
                <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                  <svg lucideFileText class="w-5 h-5"></svg>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns" class="h-14"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="h-16 hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0"></tr>
          </table>
        </div>
        
        <div *ngIf="dataSource.length === 0" class="p-20 text-center flex flex-col items-center">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
            <svg lucideDatabase class="w-8 h-8"></svg>
          </div>
          <h4 class="font-bold text-slate-800">No hay registros de stock</h4>
          <p class="text-sm text-slate-400 mt-1">Comienza agregando un nuevo registro de clasificación.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class StockAgujasListComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'cliente', 'linea', 'tipos', 'total', 'acciones'];
  dataSource: StockAgujas[] = [];
  allData: StockAgujas[] = [];
  showForm = false;
  LucidePlus = LucidePlus;

  newRecord: StockAgujas = {
    fecha: new Date().toISOString().split('T')[0],
    linea: '',
    cliente: '',
    tipoRecta: 0,
    tipoRemalle: 0,
    tipoRecubierto: 0,
    tipoEspeciales: 0,
    total: 0
  };

  constructor(
    private apiService: ApiService, 
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.listarStockAgujas().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.dataSource = data;
          this.allData = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error(err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  updateTotal() {
    this.newRecord.total = (this.newRecord.tipoRecta || 0) + 
                          (this.newRecord.tipoRemalle || 0) + 
                          (this.newRecord.tipoRecubierto || 0) + 
                          (this.newRecord.tipoEspeciales || 0);
  }

  isFormValid() {
    return this.newRecord.fecha && this.newRecord.cliente && this.newRecord.linea && this.newRecord.total > 0;
  }

  saveRecord() {
    this.apiService.guardarStockAgujas(this.newRecord).subscribe({
      next: (res) => {
        this.snackBar.open('Stock actualizado correctamente', 'OK', { duration: 3000 });
        this.loadData();
        this.showForm = false;
        this.resetForm();
      },
      error: (err) => {
        this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 });
      }
    });
  }

  resetForm() {
    this.newRecord = {
      fecha: new Date().toISOString().split('T')[0],
      linea: '',
      cliente: '',
      tipoRecta: 0,
      tipoRemalle: 0,
      tipoRecubierto: 0,
      tipoEspeciales: 0,
      total: 0
    };
  }

  applyFilter(event: Event) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.allData.filter(x => 
      x.cliente?.toLowerCase().includes(val) || 
      x.linea?.toLowerCase().includes(val)
    );
  }

  exportPDF() {
    this.pdfService.generateStockPDF(this.dataSource);
  }
}
