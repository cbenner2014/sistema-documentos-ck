import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { StockAgujasListComponent } from './features/stock-agujas/stock-agujas-list/stock-agujas-list';
import { MantenimientoListComponent } from './features/mantenimiento/mantenimiento-list/mantenimiento-list';
import { InspeccionFormComponent } from './features/inspeccion-maquinas/inspeccion-form/inspeccion-form';
import { InspeccionListComponent } from './features/inspeccion-maquinas/inspeccion-list/inspeccion-list';
import { MaquinaListComponent } from './features/maquinas/maquina-list.component';
import { LoginComponent } from './features/auth/login/login';
import { UsuarioListComponent } from './features/usuarios/usuario-list/usuario-list';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'stock-agujas', component: StockAgujasListComponent },
      { path: 'mantenimiento', component: MantenimientoListComponent },
      { path: 'inspeccion', component: InspeccionListComponent },
      { path: 'inspeccion/nuevo', component: InspeccionFormComponent },
      { path: 'inspeccion-maquinas', redirectTo: 'inspeccion' },
      { path: 'maquinas', component: MaquinaListComponent },
      { 
        path: 'usuarios', 
        component: UsuarioListComponent,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
      },
      { path: 'settings', component: DashboardComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
