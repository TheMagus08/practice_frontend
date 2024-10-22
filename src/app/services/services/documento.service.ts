import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tipoDocumento } from '../../entities/tipoDocumento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  getDocumento(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(environment.urlHost+"documento/listar");
  }

}
