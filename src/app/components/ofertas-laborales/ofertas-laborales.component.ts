import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas/ofertas.service';
import { ofertas } from '../../entities/ofertas';
import { tipoSector } from '../../entities/tipoSector';
import { tipoTiempo } from '../../entities/tipoTiempo';
@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrl: './ofertas-laborales.component.css'
})
export class OfertasLaboralesComponent implements OnInit{

  ofertas: ofertas[] = [];
  sectorId: number | undefined;  // Cambiado a undefined
  tiempoId: number | undefined ;  // Camb
  sectores: tipoSector[] = []; // Asegúrate de definir este tipo
  tiempos: tipoTiempo[] = [];   // Asegúrate de definir este tipo

    public selectedSectorId: number = 0;
    public selectedTiempoId: number = 0;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.loadOfertas();
    this.loadSectores();
    this.loadTiempos();
  }

  loadOfertas(): void {
    this.ofertasService.getOfertas(this.sectorId, this.tiempoId).subscribe(data => {
      this.ofertas = data;
    });
  }


  loadSectores(): void {
    this.ofertasService.getTiposSectores().subscribe(data => {
      this.sectores = data;

    });
  }

  loadTiempos(): void {
    this.ofertasService.getTiposTiempo().subscribe(data => {
      this.tiempos = data;

    });
  }

  onSectorChange(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    this.sectorId = Number(selectElement.value);
    console.log('ELIMINAAAAAAAAAAR:',this.sectorId );

    this.loadOfertas();
  }

  onTiempoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.tiempoId = Number(selectElement.value);
    this.loadOfertas();
  }

}
