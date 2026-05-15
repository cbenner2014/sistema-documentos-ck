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
    <div class="dialog-container">
      <div class="dialog-header flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold gradient-text">{{ data.id ? 'Editar Máquina' : 'Nueva Máquina' }}</h2>
        <button mat-icon-button (click)="close()" class="text-slate-400">
           <svg lucideX class="w-6 h-6"></svg>
        </button>
      </div>

      <div class="dialog-content">
        <div class="grid grid-cols-2 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Código de Máquina</mat-label>
            <input matInput [(ngModel)]="maquina.codigo" placeholder="Ej: CR-041" required [disabled]="!!data.id">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Línea</mat-label>
            <mat-select [(ngModel)]="maquina.linea">
               <mat-option value="MUESTRAS">Muestras</mat-option>
               <mat-option value="PRODUCCIÓN A">Producción A</mat-option>
               <mat-option value="PRODUCCIÓN B">Producción B</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Marca</mat-label>
            <input matInput [(ngModel)]="maquina.marca" placeholder="Ej: BROTHER">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Modelo</mat-label>
            <input matInput [(ngModel)]="maquina.modelo" placeholder="Ej: S-7200C">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Serie Cabezal</mat-label>
            <input matInput [(ngModel)]="maquina.serie" placeholder="N° de Serie">
          </mat-form-field>

          <div class="col-span-2 border-b my-2 pb-1">
             <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Datos del Motor</span>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Marca Motor</mat-label>
            <input matInput [(ngModel)]="maquina.marcaMotor">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Modelo Motor</mat-label>
            <input matInput [(ngModel)]="maquina.modeloMotor">
          </mat-form-field>

          <mat-form-field appearance="outline" class="col-span-2">
            <mat-label>Serie Motor</mat-label>
            <input matInput [(ngModel)]="maquina.serieMotor">
          </mat-form-field>

          <div class="col-span-2 border-b my-2 pb-1">
             <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Seguimiento</span>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Fecha Próx. Preventivo</mat-label>
            <input matInput type="date" [(ngModel)]="maquina.fechaPreventivo">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Fecha Próx. Cambio Aceite</mat-label>
            <input matInput type="date" [(ngModel)]="maquina.fechaCambioAceite">
          </mat-form-field>
        </div>
      </div>

      <div class="dialog-actions flex justify-end gap-2 mt-6">
        <button mat-button (click)="close()" class="text-slate-500">Cancelar</button>
        <button mat-flat-button class="save-btn" (click)="save()" [disabled]="!maquina.codigo">
          <svg lucideCheckCircle class="w-4 h-4 mr-2"></svg>
          {{ data.id ? 'Actualizar Máquina' : 'Guardar Máquina' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container { padding: 10px; }
    .gradient-text { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .save-btn { background: #4f46e5 !important; color: white !important; border-radius: 8px !important; }
    ::ng-deep .mat-mdc-dialog-container .mdc-dialog__surface { border-radius: 16px !important; }
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
