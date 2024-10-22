import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tipoSexo } from '../../entities/tipoSexo';

@Injectable({
  providedIn: 'root'
})
export class TiposexoService {

  private apiUrl = 'http://localhost:8080/sexo/listar';
  constructor(private http:HttpClient) { }

  getSexos(): Observable<tipoSexo[]> {
    return this.http.get<tipoSexo[]>(this.apiUrl);
  }
}
