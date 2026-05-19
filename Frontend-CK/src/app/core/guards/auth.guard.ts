import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Si la ruta requiere roles específicos (ej: ['ADMIN'])
    const requiredRoles = route.data?.['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length > 0) {
      const user = authService.getCurrentUser();
      const hasRequiredRole = requiredRoles.some(role =>
        user ? user.rol.toUpperCase() === role.toUpperCase() : false
      );
      if (!hasRequiredRole) {
        // Redirigir al dashboard si no tiene permisos
        router.navigate(['/dashboard']);
        return false;
      }
    }
    return true;
  }

  // Redirigir al login si no ha iniciado sesión
  router.navigate(['/login']);
  return false;
};
