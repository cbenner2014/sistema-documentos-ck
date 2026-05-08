import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { PdfService } from '../../../services/pdf.service';
import { Router } from '@angular/router';
import { LucideCheckCircle, LucideZap, LucideSave } from '@lucide/angular';

interface InspectionItem {
  name: string;
  status: 'OK' | 'D' | 'F' | null;
  obs: string;
}

@Component({
  selector: 'app-inspeccion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatSnackBarModule, LucideSave, LucideCheckCircle, LucideZap],
  template: `
    <div class="page-container">
      <header class="page-header justify-between">
        <div class="title-group">
          <h1 class="gradient-text">Inspección de Máquinas de Confección</h1>
          <p class="subtitle">IND-MEC-01 | Control de Cabezales, Motores y Mantenimiento</p>
        </div>
        <div class="header-actions flex gap-2">
           <button mat-stroked-button class="autofill-btn" (click)="autofillOK()">
             <svg lucideZap class="w-4 h-4 mr-2"></svg>
             Autocompletar TODO (OK)
           </button>
           <button mat-flat-button class="save-btn" (click)="save(false)">
             <svg lucideSave></svg>
             Guardar
           </button>
           <button mat-flat-button class="premium-btn" (click)="save(true)">
             <svg lucideCheckCircle class="w-4 h-4 mr-2"></svg>
             Guardar y Exportar PDF
           </button>
        </div>
      </header>

      <div class="header-data glass-card">
        <div class="data-grid-3">
           <!-- Column 1 -->
           <div class="col-section">
             <div class="field">
               <label>Fecha</label>
               <input type="date" [(ngModel)]="model.fecha">
             </div>
             <div class="field">
               <label>Código Máquina</label>
               <input type="text" placeholder="Ej: RY-203" [(ngModel)]="model.codigoMaquina">
             </div>
             <div class="field">
               <label>Modelo (Cabezal)</label>
               <input type="text" [(ngModel)]="model.modeloCabezal">
             </div>
             <div class="field">
               <label>Serie Cabezal</label>
               <input type="text" [(ngModel)]="model.serieCabezal">
             </div>
           </div>

           <!-- Column 2 -->
           <div class="col-section pt-10">
             <div class="field">
               <label>Marca/Motor</label>
               <input type="text" [(ngModel)]="model.marcaMotor">
             </div>
             <div class="field">
               <label>Modelo (Motor)</label>
               <input type="text" [(ngModel)]="model.modeloMotor">
             </div>
             <div class="field">
               <label>Serie Motor</label>
               <input type="text" [(ngModel)]="model.serieMotor">
             </div>
           </div>

           <!-- Column 3 -->
           <div class="col-section pt-10">
             <div class="field">
               <label>Línea</label>
               <input type="text" [(ngModel)]="model.linea">
             </div>
             <div class="field">
               <label>Mecánico</label>
               <input type="text" [(ngModel)]="model.mecanico">
             </div>
             <div class="field">
               <label>Código Mecánico</label>
               <input type="text" [(ngModel)]="model.codigoMecanico">
             </div>
           </div>
        </div>
      </div>

      <div class="form-sections">
        <!-- Section 1 -->
        <section class="section glass-card">
          <h3 class="section-title">LIMPIEZA E INSPECCIÓN DE CABEZALES</h3>
          <div class="checklist">
            <div class="item-header">
              <span>Componente</span>
              <span class="center">OK | D | F</span>
              <span>Observaciones / # Parte</span>
            </div>
            <div class="row" *ngFor="let item of cabezales">
              <span class="name">{{item.name}}</span>
              <mat-radio-group [(ngModel)]="item.status" class="status-group">
                <mat-radio-button value="OK"></mat-radio-button>
                <mat-radio-button value="D"></mat-radio-button>
                <mat-radio-button value="F"></mat-radio-button>
              </mat-radio-group>
              <input type="text" [(ngModel)]="item.obs" class="obs-field">
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="section glass-card mt-6">
          <h3 class="section-title">REAJUSTE Y REVISIÓN DE TORNILLOS (Detección de Hollín)</h3>
          <div class="checklist">
            <div class="row">
              <span class="name">Tornillos</span>
              <mat-radio-group [(ngModel)]="model.tornillosStatus" class="status-group">
                <mat-radio-button value="OK"></mat-radio-button>
                <mat-radio-button value="D"></mat-radio-button>
                <mat-radio-button value="F"></mat-radio-button>
              </mat-radio-group>
              <input type="text" class="obs-field" [(ngModel)]="model.tornillosObs" placeholder="Observaciones...">
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="section glass-card mt-6">
          <h3 class="section-title">FILTRO Y CAMBIO DE ACEITE (Fugas y Lubricación)</h3>
          <div class="checklist">
            <div class="row" *ngFor="let item of aceite">
              <span class="name">{{item.name}}</span>
              <mat-radio-group [(ngModel)]="item.status" class="status-group">
                <mat-radio-button value="OK"></mat-radio-button>
                <mat-radio-button value="D"></mat-radio-button>
                <mat-radio-button value="F"></mat-radio-button>
              </mat-radio-group>
              <input type="text" [(ngModel)]="item.obs" class="obs-field">
            </div>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="section glass-card mt-6">
          <h3 class="section-title">LIMPIEZA DE MOTORES</h3>
          <div class="checklist">
            <div class="row" *ngFor="let item of motores">
              <span class="name">{{item.name}}</span>
              <mat-radio-group [(ngModel)]="item.status" class="status-group">
                <mat-radio-button value="OK"></mat-radio-button>
                <mat-radio-button value="D"></mat-radio-button>
                <mat-radio-button value="F"></mat-radio-button>
              </mat-radio-group>
              <input type="text" [(ngModel)]="item.obs" class="obs-field">
            </div>
          </div>
        </section>

        <!-- Observations Area -->
        <div class="bottom-area mt-6">
           <div class="glass-card full-width p-6">
              <h4>COMENTARIOS Y OBSERVACIONES</h4>
              <textarea rows="4" placeholder="Escriba comentarios adicionales..." [(ngModel)]="model.observaciones"></textarea>
           </div>
           
           <div class="grid-2-cols mt-6">
             <div class="glass-card p-6">
                <h4>PRUEBA DE COSTURA</h4>
                <div class="check-box-wrapper">
                  <mat-checkbox [(ngModel)]="model.pruebaCostura">Conforme</mat-checkbox>
                </div>
             </div>
             <div class="glass-card p-6">
                <h4>REVISADO POR</h4>
                <input type="text" class="bottom-input" placeholder="Nombre del revisor" [(ngModel)]="model.revisadoPor">
             </div>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { display: flex; flex-direction: column; gap: 1.5rem; overflow-y: auto; max-height: calc(100vh - 40px); padding: 1.5rem; }
    .header-data { padding: 1.5rem; }
    .data-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
    .col-section { display: flex; flex-direction: column; gap: 1rem; }
    .pt-10 { padding-top: 38px; } /* To align with the first row after 'Fecha' */
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field label { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
    .field input { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px; font-size: 0.9rem; }
    
    .section { padding: 1.5rem; }
    .section-title { font-size: 0.95rem; font-weight: 800; color: #1e293b; margin-bottom: 1.2rem; background: #f8fafc; padding: 8px 12px; border-radius: 8px; border-left: 5px solid #4f46e5; }
    
    .item-header { display: grid; grid-template-columns: 250px 140px 1fr; gap: 1.5rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 10px; font-size: 0.75rem; font-weight: 800; color: #94a3b8; }
    .row { display: grid; grid-template-columns: 250px 140px 1fr; gap: 1.5rem; align-items: center; border-bottom: 1px solid #f8fafc; padding: 8px 0; }
    .name { font-size: 0.9rem; color: #334155; font-weight: 500; }
    .status-group { display: flex; justify-content: space-around; }
    .obs-field { width: 100%; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 10px; font-size: 0.85rem; }
    .obs-field:focus { border-color: #4f46e5; outline: none; }
    
    .grid-2-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .p-6 { padding: 1.5rem; }
    h4 { font-size: 0.8rem; font-weight: 800; color: #64748b; margin: 0 0 12px; }
    textarea { width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 0.9rem; resize: none; background: #fcfdfe; }
    .bottom-input { width: 100%; border-bottom: 2px solid #e2e8f0; border-left: none; border-right: none; border-top: none; padding: 8px 0; font-size: 1rem; color: #1e293b; font-weight: 600; }
    .check-box-wrapper { padding: 10px; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; }

    .mt-6 { margin-top: 1.5rem; }
    .save-btn { background: #64748b !important; color: white !important; border-radius: 12px !important; height: 50px !important; padding: 0 20px !important; font-weight: 600; }
    .premium-btn { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; border-radius: 12px !important; height: 50px !important; padding: 0 25px !important; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); font-weight: 600; }
    .autofill-btn { border: 2px solid #eab308 !important; color: #a16207 !important; border-radius: 12px !important; height: 50px !important; font-weight: 700; background: #fefce8 !important; }
    .save-btn svg, .premium-btn svg { width: 22px; height: 22px; margin-right: 10px; }
    .center { text-align: center; }
    .flex { display: flex; }
    .gap-2 { gap: 0.5rem; }
  `]
})
export class InspeccionFormComponent {
  
  model: any = {
    fecha: new Date().toISOString().split('T')[0],
    codigoMaquina: '',
    marcaMotor: '',
    linea: '',
    modeloCabezal: '',
    modeloMotor: '',
    mecanico: '',
    serieCabezal: '',
    serieMotor: '',
    codigoMecanico: '',
    observaciones: '',
    pruebaCostura: false,
    revisadoPor: '',
    tornillosStatus: 'OK',
    tornillosObs: ''
  };

  cabezales: InspectionItem[] = [
    { name: 'Garfios', status: 'OK', obs: '' },
    { name: 'Cuchillas', status: 'OK', obs: '' },
    { name: 'Placa de Aguja', status: 'OK', obs: '' },
    { name: 'Peines', status: 'OK', obs: '' },
    { name: 'Prénsatela', status: 'OK', obs: '' },
    { name: 'Barra de aguja', status: 'OK', obs: '' },
    { name: 'Bocina', status: 'OK', obs: '' },
    { name: 'Protector de dedo', status: 'OK', obs: '' },
    { name: 'Protector de vista', status: 'OK', obs: '' },
    { name: 'Protector de cabeza', status: 'OK', obs: '' },
    { name: 'Sticker de seguridad', status: 'OK', obs: '' },
    { name: 'Otros', status: null, obs: '' },
  ];

  aceite: InspectionItem[] = [
    { name: 'Retenes', status: 'OK', obs: '' },
    { name: 'Filtro', status: 'OK', obs: '' },
    { name: 'Aceite textol SE ISO 32 /46 PLUS', status: 'OK', obs: '' },
    { name: 'Grasa', status: 'OK', obs: '' },
    { name: 'Mueble', status: 'OK', obs: '' },
    { name: 'Pedestal(pintado)', status: 'OK', obs: '' },
    { name: 'Ruedas', status: 'OK', obs: '' },
    { name: 'Esquineros', status: 'OK', obs: '' },
  ];

  motores: InspectionItem[] = [
    { name: 'Rodajes y Vibraciones', status: 'OK', obs: '' },
    { name: 'Fajas', status: 'OK', obs: '' },
    { name: 'Tapas protectoras', status: 'OK', obs: '' },
    { name: 'Otros', status: null, obs: '' },
  ];

  constructor(
    private apiService: ApiService, 
    private pdfService: PdfService,
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  autofillOK() {
    this.cabezales.forEach(i => i.status = 'OK');
    this.aceite.forEach(i => i.status = 'OK');
    this.motores.forEach(i => i.status = 'OK');
    this.model.tornillosStatus = 'OK';
    this.model.pruebaCostura = true;
    this.snackBar.open('¡Todo marcado como OK!', 'Genial', { duration: 2000 });
  }

  save(andExport: boolean = false) {
    // Consolidar detalles
    const detalles: any[] = [];
    
    this.cabezales.forEach(x => detalles.push({ seccion: 'CABEZALES', componente: x.name, estado: x.status, observaciones: x.obs }));
    detalles.push({ seccion: 'TORNILLOS', componente: 'Revision de Tornillos', estado: this.model.tornillosStatus, observaciones: this.model.tornillosObs });
    this.aceite.forEach(x => detalles.push({ seccion: 'ACEITE', componente: x.name, estado: x.status, observaciones: x.obs }));
    this.motores.forEach(x => detalles.push({ seccion: 'MOTORES', componente: x.name, estado: x.status, observaciones: x.obs }));

    const payload = {
      ...this.model,
      detalles: detalles
    };

    this.apiService.guardarInspeccion(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Inspección guardada exitosamente', 'Cerrar', { duration: 3000 });
        if (andExport) {
          this.pdfService.generateInspectionPDF(payload);
        }
        this.router.navigate(['/inspeccion']);
      },
      error: (err) => {
        this.snackBar.open('Error al guardar inspección', 'Cerrar', { duration: 5000 });
        console.error(err);
      }
    });
  }
}
