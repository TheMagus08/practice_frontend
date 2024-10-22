import { Injectable } from '@angular/core';
import { hijos } from '../../entities/hijos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HijosService {


  private apiUrl = 'http://localhost:8080/api/v1/hijos'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  addHijo(hijo: hijos): Observable<hijos> {
    return this.http.post<hijos>(this.apiUrl, hijo);

  }

  getHijosByUserId(userId: number): Observable<hijos[]> {
    return this.http.get<hijos[]>(`${this.apiUrl}/user/${userId}`);
  }

  getHijoById(id: number): Observable<hijos> {
    return this.http.get<hijos>(`${this.apiUrl}/${id}`);
  }



  updateHijo(id: number, hijo: hijos): Observable<hijos> {
    console.log('Datos que se están enviando para actualizar el hijo:', hijo); // Imprime los datos que estás enviando
  return this.http.put<hijos>(`${this.apiUrl}/${id}`, hijo).pipe(
    tap((response) => {
      console.log('Datos recibidos después de actualizar el hijo:', response); // Imprime la respuesta del servidor
    })
  );
  }

  deleteHijo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
