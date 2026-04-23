import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { StockAgujasListComponent } from './features/stock-agujas/stock-agujas-list/stock-agujas-list';
import { MantenimientoListComponent } from './features/mantenimiento/mantenimiento-list/mantenimiento-list';
import { InspeccionFormComponent } from './features/inspeccion-maquinas/inspeccion-form/inspeccion-form';
import { InspeccionListComponent } from './features/inspeccion-maquinas/inspeccion-list/inspeccion-list';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'stock-agujas', component: StockAgujasListComponent },
      { path: 'mantenimiento', component: MantenimientoListComponent },
      { path: 'inspeccion', component: InspeccionListComponent },
      { path: 'inspeccion/nuevo', component: InspeccionFormComponent },
      { path: 'inspeccion-maquinas', redirectTo: 'inspeccion' }, // Alias for compatibility
      { path: 'settings', component: DashboardComponent }, // Placeholder
    ]
  }
];
