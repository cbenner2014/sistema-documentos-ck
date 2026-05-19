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
import { LucideCheckCircle, LucideZap, LucideSave, LucideSettings } from '@lucide/angular';

interface InspectionItem {
  name: string;
  status: 'OK' | 'D' | 'F' | null;
  obs: string;
}

@Component({
  selector: 'app-inspeccion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatSnackBarModule, LucideSave, LucideCheckCircle, LucideZap, LucideSettings],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <!-- Sticky Header -->
      <div class="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 -mx-6 px-6 py-4 mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">Inspección Técnica FO525</h1>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mantenimiento Preventivo de Cabezales y Motores</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button (click)="autofillOK()" class="px-4 py-2.5 rounded-xl border-2 border-amber-500 text-amber-600 bg-amber-50/50 font-bold text-xs flex items-center gap-2 hover:bg-amber-100 transition-all active:scale-95 shadow-sm shadow-amber-100">
              <svg lucideZap class="w-4 h-4"></svg>
              Auto-OK
            </button>
            <button (click)="save(false)" class="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-all">
              <svg lucideSave class="w-4 h-4"></svg>
              Solo Guardar
            </button>
            <button (click)="save(true)" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95 shrink-0">
              <svg lucideCheckCircle class="w-4 h-4"></svg>
              Guardar y Exportar PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Main Form Data -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fecha</label>
            <input type="date" [(ngModel)]="model.fecha" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cód. Máquina</label>
            <input type="text" [(ngModel)]="model.codigoMaquina" placeholder="Ej: RY-203" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono uppercase">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo Cabezal</label>
            <input type="text" [(ngModel)]="model.modeloCabezal" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Línea / Módulo</label>
            <input type="text" [(ngModel)]="model.linea" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca Motor</label>
            <input type="text" [(ngModel)]="model.marcaMotor" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo Motor</label>
            <input type="text" [(ngModel)]="model.modeloMotor" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Mecánico</label>
            <input type="text" [(ngModel)]="model.mecanico" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cód. Mecánico</label>
            <input type="text" [(ngModel)]="model.codigoMecanico" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono">
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
          <!-- CABEZALES -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
               <svg lucideSettings class="w-5 h-5"></svg>
               <h3 class="text-sm font-black uppercase tracking-widest">Inspección de Cabezales</h3>
            </div>
            <div class="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
              <table class="w-full text-xs">
                <thead class="bg-slate-100/50 text-slate-400 font-black uppercase tracking-widest">
                  <tr>
                    <th class="px-4 py-3 text-left">Componente</th>
                    <th class="px-4 py-3 text-center w-32">Estado</th>
                    <th class="px-4 py-3 text-left">Observaciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr *ngFor="let item of cabezales" class="hover:bg-white transition-colors">
                    <td class="px-4 py-3 font-bold text-slate-700">{{item.name}}</td>
                    <td class="px-4 py-3 text-center">
                       <div class="flex items-center justify-center gap-1">
                         <button (click)="item.status = 'OK'" [class.bg-emerald-500]="item.status === 'OK'" [class.text-white]="item.status === 'OK'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">OK</button>
                         <button (click)="item.status = 'D'" [class.bg-amber-500]="item.status === 'D'" [class.text-white]="item.status === 'D'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">D</button>
                         <button (click)="item.status = 'F'" [class.bg-red-500]="item.status === 'F'" [class.text-white]="item.status === 'F'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">F</button>
                       </div>
                    </td>
                    <td class="px-4 py-3">
                      <input type="text" [(ngModel)]="item.obs" placeholder="Parte #" class="w-full bg-white border border-slate-100 rounded-lg px-2 py-1.5 focus:border-indigo-400 outline-none transition-all italic text-slate-500">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ACEITE Y MOTORES -->
          <div class="space-y-8">
            <!-- Section ACEITE -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
                 <svg lucideZap class="w-5 h-5"></svg>
                 <h3 class="text-sm font-black uppercase tracking-widest">Lubricación y Mueble</h3>
              </div>
              <div class="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
                <table class="w-full text-xs">
                  <tbody class="divide-y divide-slate-100">
                    <tr *ngFor="let item of aceite" class="hover:bg-white transition-colors">
                      <td class="px-4 py-3 font-bold text-slate-700">{{item.name}}</td>
                      <td class="px-4 py-3 text-center w-32">
                         <div class="flex items-center justify-center gap-1">
                           <button (click)="item.status = 'OK'" [class.bg-emerald-500]="item.status === 'OK'" [class.text-white]="item.status === 'OK'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">OK</button>
                           <button (click)="item.status = 'D'" [class.bg-amber-500]="item.status === 'D'" [class.text-white]="item.status === 'D'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">D</button>
                           <button (click)="item.status = 'F'" [class.bg-red-500]="item.status === 'F'" [class.text-white]="item.status === 'F'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">F</button>
                         </div>
                      </td>
                      <td class="px-4 py-3">
                        <input type="text" [(ngModel)]="item.obs" class="w-full bg-white border border-slate-100 rounded-lg px-2 py-1.5 focus:border-indigo-400 outline-none transition-all italic text-slate-500">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Section MOTORES -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-xl">
                 <svg lucideZap class="w-5 h-5"></svg>
                 <h3 class="text-sm font-black uppercase tracking-widest tracking-widest">Sistema Eléctrico / Motor</h3>
              </div>
              <div class="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
                <table class="w-full text-xs">
                  <tbody class="divide-y divide-slate-100">
                    <tr *ngFor="let item of motores" class="hover:bg-white transition-colors">
                      <td class="px-4 py-3 font-bold text-slate-700">{{item.name}}</td>
                      <td class="px-4 py-3 text-center w-32">
                         <div class="flex items-center justify-center gap-1">
                           <button (click)="item.status = 'OK'" [class.bg-emerald-500]="item.status === 'OK'" [class.text-white]="item.status === 'OK'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">OK</button>
                           <button (click)="item.status = 'D'" [class.bg-amber-500]="item.status === 'D'" [class.text-white]="item.status === 'D'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">D</button>
                           <button (click)="item.status = 'F'" [class.bg-red-500]="item.status === 'F'" [class.text-white]="item.status === 'F'" class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-[10px] font-black transition-all">F</button>
                         </div>
                      </td>
                      <td class="px-4 py-3">
                        <input type="text" [(ngModel)]="item.obs" class="w-full bg-white border border-slate-100 rounded-lg px-2 py-1.5 focus:border-indigo-400 outline-none transition-all italic text-slate-500">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Comments -->
        <div class="pt-12 border-t border-slate-100">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <svg lucideFileText class="w-4 h-4"></svg>
                Observaciones Finales
              </label>
              <textarea [(ngModel)]="model.observaciones" rows="4" placeholder="Detalles técnicos adicionales..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"></textarea>
            </div>
            <div class="space-y-6">
              <div class="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                 <h4 class="text-xs font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <svg lucideCheckCircle class="w-4 h-4"></svg>
                   Prueba de Funcionamiento
                 </h4>
                 <div class="flex items-center gap-4">
                    <button 
                      (click)="model.pruebaCostura = !model.pruebaCostura" 
                      [class.bg-emerald-600]="model.pruebaCostura"
                      [class.border-emerald-600]="model.pruebaCostura"
                      class="flex-1 py-3 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-all"
                      [ngClass]="model.pruebaCostura ? 'text-white' : 'border-slate-200 text-slate-400'"
                    >
                      Conforme
                    </button>
                    <div class="flex-1 space-y-1.5">
                      <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Revisado Por</label>
                      <input type="text" [(ngModel)]="model.revisadoPor" placeholder="Firma / Nombre" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold">
                    </div>
                 </div>
              </div>
              <p class="text-[10px] text-slate-400 italic text-center">Este documento tiene carácter de declaración jurada técnica.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
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
