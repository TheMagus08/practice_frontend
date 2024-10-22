import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Si es un error 401 (Unauthorized), significa que el token es inválido o ha expirado
          this.loginService.logout(); // Desconectar al usuario
          this.router.navigate(['/login']); // Redirigir al login
        }
        else if(error.status === 500){
          this.loginService.logout(); // Desconectar al usuario
          this.router.navigate(['/login']); // Redirigir al login
        }
        return throwError(() => new Error(error.message));
      })
    )
  }
}
