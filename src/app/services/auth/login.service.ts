import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import jwt_decode, { jwtDecode } from 'jwt-decode';



interface JwtPayload {
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
  this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");

  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        //this.currentUserData.next(userData.userId);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");

    this.currentUserLoginOn.next(false);
  }


  getId(){
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error('Error al decodificar el token:');
      return 1; // No hay token disponible
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token); // Decodificar el token
      return decodedToken.userId ?? null; // Obtener userId, o null si no está definido
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return 1; // Retornar null en caso de error
    }
  }


  isTokenExpired(): boolean {
    const token = sessionStorage.getItem("token");
    if (!token) {

      return true;  // Si no hay token, se considera expirado
    }
    else{console.log(token)}


    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decodificar el payload del token
      const expiry = payload.exp;  // Extraer el campo exp (tiempo de expiración)

      // Verificar si el token ha expirado comparando la fecha actual con la fecha de expiración
      if (expiry && Math.floor(Date.now() / 1000) >= expiry) {
        return true;  // Token expirado
      }
      return false;  // Token válido
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;  // En caso de error, consideramos que el token es inválido/expirado
    }
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }


  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
