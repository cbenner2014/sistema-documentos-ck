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
          [mode]="'side'"
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
      
      <mat-sidenav-content>
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
      background: #f1f5f9;
    }
    .sidenav {
      width: 280px;
      border: none !important;
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 2rem;
      text-align: center;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: center;
    }
    .logo-icon {
      background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
      color: white;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-weight: bold;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    .logo-text {
      font-size: 1.5rem;
      letter-spacing: -0.5px;
    }
    .nav-list {
      padding: 0 1rem;
      flex: 1;
    }
    .nav-list a {
      margin-bottom: 8px;
      border-radius: 12px !important;
      color: rgba(255, 255, 255, 0.7) !important;
      transition: all 0.3s ease;
      height: 48px !important;
      display: flex !important;
      align-items: center !important;
    }
    .nav-list a:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      color: white !important;
    }
    .active-link {
      background: rgba(79, 70, 229, 0.2) !important;
      color: #93c5fd !important;
      border-right: 3px solid #60a5fa;
    }
    .nav-icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
    .nav-label {
      font-size: 0.95rem;
      font-weight: 500;
    }
    .arrow-icon {
      width: 14px;
      height: 14px;
      margin-left: auto;
      opacity: 0.5;
    }
    .nav-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.05);
      margin: 1.5rem 0;
    }
    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fca5a5 !important;
      border-radius: 12px !important;
    }
    .header {
      margin: 1rem;
      width: calc(100% - 2rem);
      height: 70px;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      color: #1e293b;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .user-role {
      font-size: 0.75rem;
      color: #64748b;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      background: #e2e8f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #4f46e5;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .content-area {
      padding: 2rem;
      min-height: calc(100vh - 100px);
    }
    .menu-btn {
      color: #64748b;
    }
  `]
})
export class MainLayoutComponent {}
