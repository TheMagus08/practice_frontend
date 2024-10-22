import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofertas } from '../../../entities/ofertas';
import { OfertasService } from '../../../services/ofertas/ofertas.service';
@Component({
  selector: 'app-ofertas-laborales-user',
  templateUrl: './ofertas-laborales-user.component.html',
  styleUrl: './ofertas-laborales-user.component.css'
})
export class OfertasLaboralesUserComponent implements OnInit {
  ofertas: ofertas[] = []; // Suponiendo que tienes una lista de ofertas
  id: number | null = null;
  oferta?:ofertas;
  errorMessage:String="";

  constructor(private route: ActivatedRoute, private Router:Router, private ofertasService: OfertasService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de los parámetros de la ruta
    if (idParam) {
      console.log(idParam);
      const ofertaId = +idParam; // Convierte a número

      // Cargar los detalles del usuario logueado
      this.ofertasService.getOfertaById(ofertaId).subscribe({
        next: (ofertData) => {
          this.oferta = ofertData;
          console.log('Datos de la oferta:', ofertData);
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        }
      });

      // Llama al servicio para obtener la oferta por ID

}

  }
}
