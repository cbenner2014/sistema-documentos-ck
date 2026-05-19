import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideCheckCircle, LucideX } from '@lucide/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-maquina-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LucideCheckCircle,
    LucideX
  ],
  template: `
    <div class="p-6 bg-white animate-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">{{ data.id ? 'Editar Máquina' : 'Nueva Máquina' }}</h2>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configuración del Activo Industrial</p>
        </div>
        <button (click)="close()" class="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
           <svg lucideX class="w-6 h-6"></svg>
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Código Único</label>
            <input 
              type="text" 
              [(ngModel)]="maquina.codigo" 
              placeholder="Ej: CR-041" 
              [disabled]="!!data.id"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono uppercase disabled:bg-slate-100 disabled:text-slate-400"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Línea Asignada</label>
            <select [(ngModel)]="maquina.linea" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-slate-700">
               <option value="MUESTRAS">Muestras</option>
               <option value="PRODUCCIÓN A">Producción A</option>
               <option value="PRODUCCIÓN B">Producción B</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca / Fabricante</label>
            <input type="text" [(ngModel)]="maquina.marca" placeholder="Ej: BROTHER" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo Cabezal</label>
            <input type="text" [(ngModel)]="maquina.modelo" placeholder="Ej: S-7200C" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          
          <div class="space-y-1.5 md:col-span-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">N° Serie Cabezal</label>
            <input type="text" [(ngModel)]="maquina.serie" placeholder="Ingrese número de serie del fabricante" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
          </div>
        </div>

        <div class="pt-4 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 pb-2">
             <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Información del Motor</span>
             <div class="h-px bg-slate-100 flex-1"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca Motor</label>
              <input type="text" [(ngModel)]="maquina.marcaMotor" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo Motor</label>
              <input type="text" [(ngModel)]="maquina.modeloMotor" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">N° Serie Motor</label>
              <input type="text" [(ngModel)]="maquina.serieMotor" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
            </div>
          </div>
        </div>

        <div class="pt-4 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 pb-2">
             <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fechas de Seguimiento</span>
             <div class="h-px bg-slate-100 flex-1"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Próx. Preventivo</label>
              <input type="date" [(ngModel)]="maquina.fechaPreventivo" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Próx. Cambio Aceite</label>
              <input type="date" [(ngModel)]="maquina.fechaCambioAceite" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-10">
        <button (click)="close()" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
        <button 
          (click)="save()" 
          [disabled]="!maquina.codigo"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 active:scale-95"
        >
          <svg lucideCheckCircle class="w-5 h-5"></svg>
          {{ data.id ? 'Actualizar Registro' : 'Guardar en Inventario' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class MaquinaDialogComponent {
  maquina: any = {};

  constructor(
    public dialogRef: MatDialogRef<MaquinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    if (data.id) {
      this.maquina = { ...data };
    } else {
      this.maquina = {
        linea: 'MUESTRAS',
        activa: true
      };
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.apiService.guardarMaquina(this.maquina).subscribe({
      next: () => {
        this.snackBar.open('Máquina guardada correctamente', 'OK', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.snackBar.open(err.error || 'Error al guardar máquina', 'Cerrar', { duration: 5000 });
      }
    });
  }
}
