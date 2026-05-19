import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideLayoutDashboard, 
  LucideDatabase, 
  LucideClipboardList, 
  LucideZap, 
  LucideTrendingUp, 
  LucideAlertCircle,
  LucideCheckCircle2,
  LucideHistory
} from '@lucide/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    LucideDatabase,
    LucideZap,
    LucideTrendingUp,
    LucideAlertCircle,
    LucideCheckCircle2,
    LucideHistory
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-700">
      <!-- Header Section -->
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Panel de Control</h1>
          <p class="text-slate-500 mt-1 font-medium">Resumen general del estado de planta CottonKnit</p>
        </div>
        <div class="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">Sistema Online</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stock Agujas -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg lucideDatabase class="w-6 h-6"></svg>
            </div>
            <span class="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
              <svg lucideTrendingUp class="w-3 h-3"></svg>
              +12.5%
            </span>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Stock Agujas</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">1,240</h3>
            <p class="text-xs text-slate-400 mt-2 font-medium">Actualizado hace 5 min</p>
          </div>
        </div>

        <!-- Reportes Pendientes -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <svg lucideAlertCircle class="w-6 h-6"></svg>
            </div>
            <span class="flex items-center gap-1 text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg animate-pulse">
              Prioridad Alta
            </span>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Reportes Pendientes</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">8</h3>
            <p class="text-xs text-slate-400 mt-2 font-medium">4 requieren validación inmediata</p>
          </div>
        </div>

        <!-- Eficiencia Línea -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg lucideCheckCircle2 class="w-6 h-6"></svg>
            </div>
            <div class="w-24 h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div class="h-full bg-emerald-500 w-[94%]"></div>
            </div>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Eficiencia Línea</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">94.2%</h3>
            <p class="text-xs text-slate-400 mt-2 font-medium">Superando meta de 90.0%</p>
          </div>
        </div>
      </div>

      <!-- Main Section: Activity & Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Activity List -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 class="font-bold text-slate-800 flex items-center gap-2">
              <svg lucideHistory class="w-5 h-5 text-indigo-500"></svg>
              Actividad Reciente en Planta
            </h3>
            <button class="text-xs font-bold text-indigo-600 hover:underline">Ver todo el historial</button>
          </div>
          <div class="flex-1 p-6">
            <div class="space-y-6">
              <div *ngFor="let act of activities; let last = last" class="relative pl-8 group">
                <!-- Timeline Line -->
                <div *ngIf="!last" class="absolute left-[11px] top-7 bottom-[-24px] w-0.5 bg-slate-100 group-hover:bg-indigo-100 transition-colors"></div>
                
                <!-- Timeline Dot -->
                <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110" [ngClass]="act.color">
                  <div class="w-2 h-2 rounded-full bg-current"></div>
                </div>

                <div>
                  <div class="flex justify-between items-start">
                    <p class="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{{ act.title }}</p>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ act.time }}</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{{ act.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions / Shortcuts -->
        <div class="space-y-6">
          <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
            <div class="relative z-10">
              <h4 class="font-bold text-lg mb-1">Acceso Rápido</h4>
              <p class="text-indigo-100 text-xs mb-6 font-medium">Genera reportes técnicos FO-026 en segundos.</p>
              <button class="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                <svg lucideZap class="w-4 h-4"></svg>
                Nueva Inspección
              </button>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 class="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Alertas de Stock
            </h4>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <span class="text-xs font-black text-amber-600">R</span>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-700">Agujas Rectas</p>
                  <p class="text-[10px] text-slate-500 font-medium italic">Stock bajo: 45 unidades</p>
                </div>
              </div>
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
export class DashboardComponent {
  activities = [
    { 
      title: 'Actualización de Stock', 
      time: 'Hace 10 min', 
      desc: 'Se ingresaron 500 agujas tipo Remalle para la Línea Muestras.',
      color: 'bg-indigo-500 text-indigo-500'
    },
    { 
      title: 'Nuevo Reporte de Mantenimiento', 
      time: 'Hace 1 hora', 
      desc: 'Darwin registró una incidencia en la máquina CR-041 (Salto de puntada).',
      color: 'bg-amber-500 text-amber-500'
    },
    { 
      title: 'Inspección Completada', 
      time: 'Hace 3 horas', 
      desc: 'La línea MUESTAS-A ha pasado la inspección técnica satisfactoriamente.',
      color: 'bg-emerald-500 text-emerald-500'
    },
    { 
      title: 'Ajuste de Parámetros', 
      time: 'Ayer', 
      desc: 'Se recalibraron los sensores de las máquinas circulares.',
      color: 'bg-slate-400 text-slate-400'
    }
  ];
}
