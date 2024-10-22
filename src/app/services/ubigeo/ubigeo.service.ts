import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Departamento } from '../../entities/ubigeo/departamento';
import { Provincia } from '../../entities/ubigeo/provincia';
import { Distrito } from '../../entities/ubigeo/distrito';
@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private apiUrl = 'http://localhost:8080/api/ubicacion';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamentos`);
  }

  getProvinciasByDepartamento(departamentoId: string): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.apiUrl}/departamentos/${departamentoId}/provincias`);
  }

  getDistritosByProvincia(provinciaId: string): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${this.apiUrl}/provincias/${provinciaId}/distritos`);
  }
}
