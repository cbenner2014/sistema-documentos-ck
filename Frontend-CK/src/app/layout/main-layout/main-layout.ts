import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { 
  LucideLayoutDashboard, 
  LucideDatabase, 
  LucideClipboardList, 
  LucideSettings, 
  LucideLogOut, 
  LucideMenu,
  LucideChevronRight,
  LucideCheckCircle,
  LucideBell,
  LucideSun,
  LucideMoon,
  LucideSearch,
  LucideDynamicIcon,
  LucideUsers
} from '@lucide/angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatSidenavModule, 
    MatButtonModule,
    MatTooltipModule,
    LucideLogOut,
    LucideChevronRight,
    LucideSearch,
    LucideBell,
    LucideDynamicIcon
  ],
  template: `
    <div class="h-screen w-full flex bg-[#f4f6f9] overflow-hidden" [class.dark]="isDarkMode">
      <!-- Sidebar -->
      <aside 
        class="bg-white h-full border-r border-slate-200 transition-all duration-300 ease-in-out relative flex flex-col z-50 shadow-sm"
        [class.w-72]="!isCollapsed"
        [class.w-20]="isCollapsed"
      >
        <div class="p-6 flex items-center gap-3 overflow-hidden h-20 border-b border-slate-100/50">
          <div class="w-10 h-10 min-w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 shrink-0">
            CK
          </div>
          <span 
            class="font-extrabold text-xl tracking-tight text-slate-800 transition-opacity duration-200 whitespace-nowrap"
            [class.opacity-0]="isCollapsed"
            [class.pointer-events-none]="isCollapsed"
          >
            Cotton<span class="text-indigo-600">Knit</span>
          </span>
        </div>

        <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <a *ngFor="let item of getFilteredMenuItems()" 
             [routerLink]="item.path" 
             routerLinkActive="bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100"
             class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
             [matTooltip]="isCollapsed ? item.label : ''"
             matTooltipPosition="right"
          >
            <svg [lucideIcon]="item.icon" class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110"></svg>
            <span 
              class="font-semibold text-[15px] whitespace-nowrap transition-opacity duration-200"
              [class.opacity-0]="isCollapsed"
              [class.pointer-events-none]="isCollapsed"
            >
              {{ item.label }}
            </span>
          </a>
        </nav>

        <div class="p-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            (click)="onLogout()"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors group overflow-hidden"
          >
            <svg lucideLogOut class="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform"></svg>
            <span 
              class="font-bold text-[15px] whitespace-nowrap transition-opacity"
              [class.opacity-0]="isCollapsed"
            >
              Cerrar Sesión
            </span>
          </button>
        </div>

        <!-- Toggle Collapse Button -->
        <button 
          (click)="isCollapsed = !isCollapsed"
          class="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 hover:text-white transition-all z-[60]"
        >
          <svg lucideChevronRight 
               class="w-4 h-4 transition-transform duration-300" 
               [class.rotate-180]="!isCollapsed">
          </svg>
        </button>
      </aside>

      <!-- Main Content Container -->
      <div class="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        <!-- Header -->
        <header class="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 z-40 sticky top-0 shrink-0">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-slate-800 tracking-tight">Menú Principal</h2>
          </div>

          <div class="flex items-center gap-6">
            <!-- Search Bar (Desktop) -->
            <div class="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <svg lucideSearch class="w-4 h-4 text-slate-400 mr-2"></svg>
              <input type="text" placeholder="Buscar..." class="bg-transparent border-none outline-none text-sm w-48 text-slate-600 placeholder:text-slate-400">
            </div>

            <div class="flex items-center gap-2 border-r border-slate-200 pr-4">
              <button (click)="isDarkMode = !isDarkMode" class="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <svg [lucideIcon]="isDarkMode ? LucideSun : LucideMoon" class="w-5 h-5"></svg>
              </button>
              <button class="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 relative transition-colors">
                <svg lucideBell class="w-5 h-5"></svg>
                <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <!-- Dynamic User Display -->
            <div class="flex items-center gap-3" *ngIf="authService.currentUser$ | async as user">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-slate-800 leading-none">{{ user.nombreCompleto }}</p>
                <p class="text-xs text-slate-500 mt-1 font-medium">
                  {{ user.rol === 'ADMIN' ? 'Administrador' : 'Mecánico' }}
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold shadow-sm uppercase">
                {{ user.nombreCompleto.substring(0, 1) }}
              </div>
            </div>
          </div>
        </header>

        <!-- Dynamic Content -->
        <main class="flex-1 overflow-y-auto p-8 scroll-smooth bg-[#f4f6f9]/50">
          <div class="max-w-7xl mx-auto">
             <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    ::ng-deep .active-link { @apply bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100; }
  `]
})
export class MainLayoutComponent {
  isCollapsed = false;
  isDarkMode = false;
  LucideSun = LucideSun;
  LucideMoon = LucideMoon;

  constructor(public authService: AuthService) {}

  getFilteredMenuItems() {
    const items: any[] = [
      { label: 'Dashboard', icon: LucideLayoutDashboard, path: '/dashboard' },
      { label: 'Stock Agujas', icon: LucideDatabase, path: '/stock-agujas' },
      { label: 'Mantenimiento', icon: LucideClipboardList, path: '/mantenimiento' },
      { label: 'Inspección', icon: LucideCheckCircle, path: '/inspeccion' },
      { label: 'Maestro de Máquinas', icon: LucideSettings, path: '/maquinas' },
    ];
    
    if (this.authService.hasRole('ADMIN')) {
      items.push({ label: 'Gestión de Usuarios', icon: LucideUsers, path: '/usuarios' });
    }
    
    return items;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
