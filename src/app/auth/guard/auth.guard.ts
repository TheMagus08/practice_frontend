import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);  // Inyecta el servicio de login
  const router = inject(Router);  // Inyecta el router para redirigir si es necesario

  if (loginService.isTokenExpired()) {
    // Si el token ha expirado, redirigir al login
    loginService.logout();
    router.navigate(['/login']);
    return false;
  }

  if (loginService.currentUserLoginOn.value) {
    // Si el usuario está autenticado, permitimos la navegación
    return true;
  } else {
    // Si no está autenticado, lo redirigimos al login
    router.navigate(['/inicio']);
    return false;
  }


};
