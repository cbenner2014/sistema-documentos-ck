import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface UserSession {
  id: number;
  username: string;
  nombreCompleto: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<UserSession | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Restaurar sesión al cargar
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('ck_user_session');
      if (savedUser) {
        try {
          this.currentUserSubject.next(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('ck_user_session');
        }
      }
    }
  }

  login(credentials: { username: string; password: String }): Observable<UserSession> {
    return this.http.post<UserSession>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(user => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('ck_user_session', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ck_user_session');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): UserSession | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.rol.toUpperCase() === role.toUpperCase() : false;
  }
}
