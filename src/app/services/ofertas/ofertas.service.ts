import { tipoSector } from './../../entities/tipoSector';
import { tipoEstado } from './../../entities/tipoEstado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ofertas } from '../../entities/ofertas';
import { tipoTiempo } from '../../entities/tipoTiempo';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private apiUrl = 'http://localhost:8080/api/v1/ofertas';
  private apiUrlList = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

  getAllOfertas(): Observable<ofertas[]> {
    return this.http.get<ofertas[]>(`${this.apiUrl}`);
  }

  getOfertas(sectorId?: number, tiempoId?: number): Observable<ofertas[]> {
    let url = `${this.apiUrl}/publicadas/filtrar`;
    const params = [];

    if (sectorId) {
      params.push(`sectorId=${sectorId}`);
    }
    if (tiempoId) {
      params.push(`tiempoId=${tiempoId}`);
    }

    if (params.length) {
      url += '?' + params.join('&');
    }

    return this.http.get<ofertas[]>(url);
  }

  getOfertaById(id: number): Observable<ofertas> {
    return this.http.get<ofertas>(`${this.apiUrl}/${id}`);
  }

  getTiposSectores(): Observable<tipoSector[]> {
    return this.http.get<tipoSector[]>(`${this.apiUrlList}/sector/listar`);
  }

  getTiposTiempo(): Observable<tipoTiempo[]> {
    return this.http.get<tipoTiempo[]>(`${this.apiUrlList}/tiempo/listar`);
  }

  getTiposEstado(): Observable<tipoEstado[]> {
    return this.http.get<tipoEstado[]>(`${this.apiUrlList}/estado/listar`);
  }

  getOfertasPublicadas(): Observable<ofertas[]> {
    return this.http.get<ofertas[]>(`${this.apiUrl}/publicadas`);
  }

  getOfertasPorSector(sectorId: number): Observable<ofertas[]> {
    const url = `${this.apiUrl}/publicadas/sector?sectorId=${sectorId}`;
    return this.http.get<ofertas[]>(url);
  }

  getOfertasFiltradas(sectorId: number, tiempoId: number): Observable<ofertas[]> {
    // Construir la URL con los parámetros de consulta
    const params = new URLSearchParams();
    if (sectorId) {
      params.append('sectorId', sectorId.toString());
    }
    if (tiempoId) {
      params.append('tiempoId', tiempoId.toString());
    }

    return this.http.get<ofertas[]>(`${this.apiUrl}/publicadas/filtrar?${params.toString()}`);
  }

  saveOferta(oferta: ofertas): Observable<ofertas> {
    return this.http.post<ofertas>(`${this.apiUrl}`, oferta);
  }

  updateOferta(oferta: ofertas): Observable<ofertas> {
    return this.http.put<ofertas>(`${this.apiUrl}/${oferta.id}`, oferta);
  }

  deleteOferta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
