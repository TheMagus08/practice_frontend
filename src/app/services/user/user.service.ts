import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { userList } from '../../entities/userList';
import { Role } from '../../entities/enum/role';
import { tipoDocumento } from '../../entities/tipoDocumento';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"/user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  createUser(user: any): Observable<any> {
    return this.http.post(environment.urlHost+"auth/register", user);
  }

  getUsers(): Observable<userList[]> {
    return this.http.get<userList[]>(environment.urlApi+"/user/list");
  }

  updateUser(userRequest:User):Observable<any>
  {
    const url = `${environment.urlApi}/user/${userRequest.id}`;
  return this.http.put(url, userRequest).pipe(
    catchError(this.handleError)
  );
  }


   private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.urlHost+"role/roles");
  }

  getTipoDocumento():Observable<tipoDocumento[]>{
    return this.http.get<tipoDocumento[]>(environment.urlHost+"documento/listar");
  }
}
