import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LucideLock, LucideUser, LucideAlertCircle, LucideLoader2 } from '@lucide/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideLock, LucideUser, LucideAlertCircle, LucideLoader2],
  template: `
    <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      <!-- Background Decorative Lights -->
      <div class="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] top-10 left-10 animate-pulse"></div>
      <div class="absolute w-96 h-96 rounded-full bg-violet-500/10 blur-[120px] bottom-10 right-10 animate-pulse" style="animation-delay: 2s"></div>

      <!-- Login Card -->
      <div class="w-full max-w-md p-8 mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center">
        <!-- Logo -->
        <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/30 mb-4 scale-95 hover:scale-100 transition-transform duration-300">
          CK
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Cotton<span class="text-indigo-400">Knit</span></h1>
        <p class="text-slate-400 text-sm mt-1 mb-8">Sistema de Documentos y Reportes</p>

        <!-- Alert Error -->
        <div *ngIf="errorMessage" class="w-full mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 text-sm animate-shake">
          <svg lucideAlertCircle class="w-5 h-5 shrink-0"></svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" class="w-full space-y-5">
          <!-- Username Input -->
          <div class="space-y-2">
            <label for="username" class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Usuario</label>
            <div class="relative flex items-center">
              <svg lucideUser class="absolute left-4 w-5 h-5 text-slate-400"></svg>
              <input 
                id="username"
                type="text" 
                name="username" 
                [(ngModel)]="username" 
                required
                class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500 text-sm"
                placeholder="Ingresa tu usuario"
              >
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label for="password" class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Contraseña</label>
            </div>
            <div class="relative flex items-center">
              <svg lucideLock class="absolute left-4 w-5 h-5 text-slate-400"></svg>
              <input 
                id="password"
                type="password" 
                name="password" 
                [(ngModel)]="password" 
                required
                class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500 text-sm"
                placeholder="••••••••"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="isLoading"
            class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-4"
          >
            <svg *ngIf="isLoading" lucideLoader2 class="w-4 h-4 animate-spin"></svg>
            <span>{{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .animate-shake {
      animation: shake 0.3s ease-in-out;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    // Redirigir al dashboard si ya hay sesión activa
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor ingresa todos los campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ 
      username: this.username.trim(), 
      password: this.password.trim() 
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al conectar al servidor.';
        }
      }
    });
  }
}
