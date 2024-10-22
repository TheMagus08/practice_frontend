import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfertasService } from '../../services/ofertas/ofertas.service';
import { ofertas } from '../../entities/ofertas';
@Component({
  selector: 'app-gestionar-ofertas',
  templateUrl: './gestionar-ofertas.component.html',
  styleUrl: './gestionar-ofertas.component.css'
})
export class GestionarOfertasComponent implements OnInit {

  ofertas: ofertas[] = [];


  constructor(private router: Router, private ofertasService: OfertasService) {}


  ngOnInit(): void {
    this.loadOfertas();
  }
  crear() {
    // Redirigir a la página de creación de oferta
    this.router.navigateByUrl('/crear-ofertas');

  }

  loadOfertas(): void {
    this.ofertasService.getAllOfertas().subscribe(
      (data: ofertas[]) => {
        this.ofertas = data;
      },
      (error) => {
        console.error('Error al cargar las ofertas', error);
      }
    );
  }

  editar(id: number): void {
    // Redirigir a la página de edición de oferta con el ID correspondiente
    this.router.navigateByUrl(`/oferta/${id}`);
  }

  eliminar(id: number): void {
    // Implementar la lógica para eliminar una oferta
    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      this.ofertasService.deleteOferta(id).subscribe(
        () => {
          this.ofertas = this.ofertas.filter(oferta => oferta.id !== id);
          alert('Oferta eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar la oferta', error);
          alert('Error al eliminar la oferta');
        }
      );
    }
  }

}
