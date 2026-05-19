import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { 
  LucidePlus, 
  LucideEdit, 
  LucideTrash2, 
  LucideSearch, 
  LucideX, 
  LucideShieldAlert
} from '@lucide/angular';

interface User {
  id?: number;
  username: string;
  nombreCompleto: string;
  password?: string;
  rol: string;
}

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucidePlus, 
    LucideEdit, 
    LucideTrash2, 
    LucideSearch, 
    LucideX, 
    LucideShieldAlert
  ],
  template: `
    <div class="space-y-8">
      <!-- Top header bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-800">Gestión de Usuarios</h1>
          <p class="text-slate-500 mt-1 font-medium text-sm">Administra los usuarios del sistema y sus niveles de acceso.</p>
        </div>
        <button 
          (click)="openCreateModal()"
          class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 text-[14px]"
        >
          <svg lucidePlus class="w-5 h-5"></svg>
          Agregar Usuario
        </button>
      </div>

      <!-- Controls & Search -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="relative flex items-center flex-1 max-w-md">
          <svg lucideSearch class="absolute left-4 w-5 h-5 text-slate-400"></svg>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="filterUsers()"
            placeholder="Buscar por usuario o nombre completo..." 
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 text-sm font-medium"
          >
        </div>
        <div class="flex items-center gap-2 text-sm text-slate-500 font-semibold">
          Total de usuarios: <span class="bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-extrabold text-xs">{{ filteredUsers.length }}</span>
        </div>
      </div>

      <!-- Loading / Empty states -->
      <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div class="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="text-slate-500 mt-4 font-semibold text-sm">Cargando usuarios...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
        <svg lucideShieldAlert class="w-5 h-5 shrink-0"></svg>
        <span class="font-semibold">{{ errorMessage }}</span>
      </div>

      <!-- Grid / Table of Users -->
      <div *ngIf="!isLoading && !errorMessage" class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50/50">
                <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Usuario</th>
                <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</th>
                <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Rol</th>
                <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr *ngFor="let user of filteredUsers" class="hover:bg-slate-50/50 transition-colors group">
                <td class="p-5">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold text-sm shrink-0">
                      {{ user.username.substring(0, 2).toUpperCase() }}
                    </div>
                    <span class="font-bold text-slate-800 text-[15px]">{{ user.username }}</span>
                  </div>
                </td>
                <td class="p-5">
                  <span class="font-semibold text-slate-600 text-[14px]">{{ user.nombreCompleto }}</span>
                </td>
                <td class="p-5">
                  <span 
                    [ngClass]="{
                      'bg-purple-50 text-purple-700 border-purple-100': user.rol === 'ADMIN',
                      'bg-teal-50 text-teal-700 border-teal-100': user.rol === 'MECANICO',
                      'bg-slate-50 text-slate-600 border-slate-100': user.rol !== 'ADMIN' && user.rol !== 'MECANICO'
                    }"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border"
                  >
                    {{ user.rol }}
                  </span>
                </td>
                <td class="p-5 text-right">
                  <div class="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      (click)="openEditModal(user)"
                      class="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-all"
                      title="Editar usuario"
                    >
                      <svg lucideEdit class="w-4 h-4"></svg>
                    </button>
                    <button 
                      *ngIf="user.username !== 'admin'"
                      (click)="deleteUser(user)"
                      class="p-2.5 hover:bg-red-50 rounded-xl text-slate-500 hover:text-red-600 transition-all"
                      title="Eliminar usuario"
                    >
                      <svg lucideTrash2 class="w-4 h-4"></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Empty Row -->
              <tr *ngIf="filteredUsers.length === 0">
                <td colspan="4" class="p-10 text-center text-slate-400 font-semibold text-sm">
                  No se encontraron usuarios.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create / Edit Modal -->
      <div *ngIf="isModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-scaleUp">
          <!-- Modal Header -->
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800">
              {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h3>
            <button (click)="closeModal()" class="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
              <svg lucideX class="w-5 h-5"></svg>
            </button>
          </div>

          <!-- Modal Body -->
          <form (ngSubmit)="saveUser()" class="p-6 space-y-5">
            <!-- Username Input -->
            <div class="space-y-2">
              <label for="modal-username" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario (Username)</label>
              <input 
                id="modal-username"
                type="text" 
                [(ngModel)]="formData.username" 
                name="username" 
                required 
                [disabled]="isEditing && formData.username === 'admin'"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-semibold"
                placeholder="Ej: jperez"
              >
            </div>

            <!-- Full Name Input -->
            <div class="space-y-2">
              <label for="modal-nombre" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre Completo</label>
              <input 
                id="modal-nombre"
                type="text" 
                [(ngModel)]="formData.nombreCompleto" 
                name="nombreCompleto" 
                required 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-semibold"
                placeholder="Ej: Juan Perez"
              >
            </div>

            <!-- Password Input -->
            <div class="space-y-2">
              <label for="modal-password" class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contraseña {{ isEditing ? '(Dejar en blanco para no cambiar)' : '' }}
              </label>
              <input 
                id="modal-password"
                type="password" 
                [(ngModel)]="formData.password" 
                name="password" 
                [required]="!isEditing"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-semibold"
                placeholder="••••••••"
              >
            </div>

            <!-- Role Select -->
            <div class="space-y-2">
              <label for="modal-rol" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</label>
              <select 
                id="modal-rol"
                [(ngModel)]="formData.rol" 
                name="rol" 
                required
                [disabled]="isEditing && formData.username === 'admin'"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-semibold"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MECANICO">MECANICO</option>
              </select>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button" 
                (click)="closeModal()" 
                class="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all text-sm"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all text-sm"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-scaleUp {
      animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class UsuarioListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';
  isLoading = true;
  errorMessage = '';

  // Modal control
  isModalOpen = false;
  isEditing = false;
  formData: User = {
    username: '',
    nombreCompleto: '',
    password: '',
    rol: 'MECANICO'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.listarUsuarios().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'No se pudieron cargar los usuarios del servidor.';
        console.error(err);
      }
    });
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(u => 
        u.username.toLowerCase().includes(query) || 
        u.nombreCompleto.toLowerCase().includes(query)
      );
    }
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.formData = {
      username: '',
      nombreCompleto: '',
      password: '',
      rol: 'MECANICO'
    };
    this.isModalOpen = true;
  }

  openEditModal(user: User): void {
    this.isEditing = true;
    this.formData = {
      id: user.id,
      username: user.username,
      nombreCompleto: user.nombreCompleto,
      password: '', // Blank by default, if left blank it won't change
      rol: user.rol
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveUser(): void {
    if (!this.formData.username.trim() || !this.formData.nombreCompleto.trim()) {
      return;
    }

    if (!this.isEditing && !this.formData.password?.trim()) {
      return;
    }

    this.isLoading = true;
    const requestData = { ...this.formData };
    
    // Clean blank password on edit
    if (this.isEditing && !requestData.password?.trim()) {
      delete requestData.password;
    }

    const request$ = this.isEditing && this.formData.id
      ? this.apiService.actualizarUsuario(this.formData.id, requestData)
      : this.apiService.guardarUsuario(requestData);

    request$.subscribe({
      next: () => {
        this.closeModal();
        this.loadUsers();
      },
      error: (err) => {
        this.isLoading = false;
        alert('Error al guardar el usuario. Intente con otro nombre de usuario.');
        console.error(err);
      }
    });
  }

  deleteUser(user: User): void {
    if (!user.id) return;
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.username}"?`)) {
      this.isLoading = true;
      this.apiService.eliminarUsuario(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.isLoading = false;
          alert('No se pudo eliminar el usuario.');
          console.error(err);
        }
      });
    }
  }
}
