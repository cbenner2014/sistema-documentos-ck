import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideLayoutDashboard, LucideDatabase, LucideClipboardList } from '@lucide/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    LucideLayoutDashboard, 
    LucideDatabase, 
    LucideClipboardList
  ],
  template: `
    <div class="dashboard-container">
      <header class="page-header">
        <h1 class="gradient-text">Panel de Control</h1>
        <p class="subtitle">Bienvenido al sistema de gestión CottonKnit</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon primary">
            <svg lucideDatabase></svg>
          </div>
          <div class="stat-info">
            <span class="label">Stock Agujas</span>
            <span class="value">1,240</span>
            <span class="trend positive">+12% vs mes anterior</span>
          </div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon accent">
            <svg lucideClipboardList></svg>
          </div>
          <div class="stat-info">
            <span class="label">Reportes Pendientes</span>
            <span class="value">8</span>
            <span class="trend negative">Requiere atención</span>
          </div>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-icon success">
            <svg lucideLayoutDashboard></svg>
          </div>
          <div class="stat-info">
            <span class="label">Eficiencia Línea</span>
            <span class="value">94.2%</span>
            <span class="trend positive">Estable</span>
          </div>
        </div>
      </div>

      <div class="recent-activity glass-card">
        <h3>Actividad Reciente</h3>
        <div class="activity-list">
          <div class="activity-item">
            <div class="dot"></div>
            <div class="activity-content">
              <span class="time">Hace 10 min</span>
              <p>Actualización de stock de agujas - Línea Muestras</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="dot active"></div>
            <div class="activity-content">
              <span class="time">Hace 1 hora</span>
              <p>Nuevo reporte de mantenimiento generado por Darwin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .page-header h1 {
      font-size: 2.5rem;
      margin: 0;
    }
    .subtitle {
      color: #64748b;
      margin-top: 0.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-icon svg {
      width: 28px;
      height: 28px;
    }
    .stat-icon.primary { background: #4f46e5; color: white; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }
    .stat-icon.accent { background: #ec4899; color: white; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2); }
    .stat-icon.success { background: #10b981; color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }
    
    .stat-info { display: flex; flex-direction: column; }
    .stat-info .label { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .stat-info .value { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 4px 0; }
    .stat-info .trend { font-size: 0.75rem; font-weight: 600; }
    .trend.positive { color: #10b981; }
    .trend.negative { color: #ef4444; }

    .recent-activity { padding: 1.5rem; }
    .activity-list { margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem; }
    .activity-item { display: flex; gap: 1rem; align-items: flex-start; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; margin-top: 6px; }
    .dot.active { background: #4f46e5; box-shadow: 0 0 8px #4f46e5; }
    .activity-content { flex: 1; }
    .activity-content .time { font-size: 0.75rem; color: #94a3b8; }
    .activity-content p { margin: 2px 0 0; font-size: 0.9rem; color: #475569; }
  `]
})
export class DashboardComponent {}
