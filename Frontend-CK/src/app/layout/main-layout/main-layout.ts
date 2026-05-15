import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { 
  LucideLayoutDashboard, 
  LucideDatabase, 
  LucideClipboardList, 
  LucideSettings, 
  LucideLogOut, 
  LucideMenu,
  LucideChevronRight,
  LucideCheckCircle
} from '@lucide/angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatListModule, 
    MatButtonModule,
    LucideLayoutDashboard,
    LucideDatabase,
    LucideClipboardList,
    LucideSettings,
    LucideLogOut,
    LucideMenu,
    LucideChevronRight,
    LucideCheckCircle
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav premium-sidebar"
          [attr.role]="'navigation'"
          mode="side"
          [opened]="true">
        <div class="sidebar-header">
          <div class="logo-container">
            <div class="logo-icon">CK</div>
            <span class="logo-text gradient-text">CottonKnit</span>
          </div>
        </div>
        
        <mat-nav-list class="nav-list">
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
            <svg lucideLayoutDashboard class="nav-icon"></svg>
            <span class="nav-label">Dashboard</span>
            <svg lucideChevronRight class="arrow-icon"></svg>
          </a>
          <a mat-list-item routerLink="/stock-agujas" routerLinkActive="active-link">
            <svg lucideDatabase class="nav-icon"></svg>
            <span class="nav-label">Stock Agujas</span>
          </a>
          <a mat-list-item routerLink="/mantenimiento" routerLinkActive="active-link">
            <svg lucideClipboardList class="nav-icon"></svg>
            <span class="nav-label">Mantenimiento</span>
          </a>
          <a mat-list-item routerLink="/inspeccion" routerLinkActive="active-link">
            <svg lucideCheckCircle class="nav-icon"></svg>
            <span class="nav-label">Inspección</span>
          </a>
          <a mat-list-item routerLink="/maquinas" routerLinkActive="active-link">
            <svg lucideSettings class="nav-icon"></svg>
            <span class="nav-label">Maestro de Máquinas</span>
          </a>
          <div class="nav-divider"></div>
          <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
            <svg lucideSettings class="nav-icon"></svg>
            <span class="nav-label">Configuración</span>
          </a>
        </mat-nav-list>

        <div class="sidebar-footer">
          <button mat-button class="logout-btn">
            <svg lucideLogOut class="nav-icon"></svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </mat-sidenav>
      
      <mat-sidenav-content class="main-content">
        <mat-toolbar class="header glass-card">
          <button mat-icon-button (click)="drawer.toggle()" class="menu-btn">
            <svg lucideMenu></svg>
          </button>
          <span class="spacer"></span>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">Darwin Admin</span>
              <span class="user-role">Administrador</span>
            </div>
            <div class="user-avatar">D</div>
          </div>
        </mat-toolbar>

        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
      background: #f8fafc;
    }
    .premium-sidebar {
      width: 280px;
      background: #1e293b !important; /* Fondo oscuro elegante */
      color: white !important;
      border: none !important;
      box-shadow: 4px 0 24px rgba(0,0,0,0.1);
    }
    .sidebar-header {
      padding: 2.5rem 1.5rem;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-weight: 800;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
    }
    .logo-text {
      font-size: 1.4rem;
      font-weight: 700;
      color: white;
    }
    .nav-list {
      padding: 0 1rem;
    }
    .nav-list a {
      margin-bottom: 6px;
      border-radius: 12px !important;
      color: #94a3b8 !important;
      height: 50px !important;
      display: flex !important;
      align-items: center !important;
    }
    .nav-list a:hover {
      background: rgba(255, 255, 255, 0.05) !important;
      color: white !important;
    }
    .active-link {
      background: linear-gradient(90deg, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0) 100%) !important;
      color: #818cf8 !important;
      border-left: 4px solid #4f46e5;
    }
    .nav-icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
    .nav-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 1.5rem 1rem;
    }
    .sidebar-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 1.5rem;
    }
    .logout-btn {
      width: 100%;
      color: #f87171 !important;
      border-radius: 12px !important;
      background: rgba(248, 113, 113, 0.05) !important;
    }
    .main-content {
      background: #f8fafc;
    }
    .header {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      height: 70px;
      padding: 0 2rem;
    }
    .spacer { flex: 1; }
    .user-profile { display: flex; align-items: center; gap: 12px; }
    .user-info { display: flex; flex-direction: column; align-items: flex-end; }
    .user-name { font-weight: 600; font-size: 0.9rem; }
    .user-role { font-size: 0.75rem; color: #64748b; }
    .user-avatar {
      width: 38px; height: 38px;
      background: #4f46e5; color: white;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-weight: bold;
    }
    .content-area {
      padding: 2rem;
    }
    .gradient-text {
      background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `]
})
export class MainLayoutComponent {}
