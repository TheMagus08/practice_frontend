import { Component  , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfertasService } from '../../services/ofertas/ofertas.service';
import { ofertas } from '../../entities/ofertas';
import { tipoTiempo } from '../../entities/tipoTiempo';
import { tipoEstado } from '../../entities/tipoEstado';
import { tipoSector } from './../../entities/tipoSector';
import { ActivatedRoute, Router } from '@angular/router';
import { sector } from '../../entities/enum/sector';


@Component({
  selector: 'app-crear-ofertas',
  templateUrl: './crear-ofertas.component.html',
  styleUrl: './crear-ofertas.component.css'
})
export class CrearOfertasComponent  implements OnInit {

  ofertaId?: number;
  isEditMode = false;
  tiposSectores: tipoSector[] = [];
  tiposTiempo: tipoTiempo[] = [];
  tiposEstado: tipoEstado[] = [];


 registerForm: FormGroup = new FormGroup({});

  constructor(   private formBuilder: FormBuilder ,    private OfertasService: OfertasService, private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      id: [null],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      sector: [null],
      industria: ['', Validators.required],
      titulo: ['', Validators.required],
      empresa: ['', Validators.required],
      modalidad: ['', Validators.required],
      tiempo: [null],
      salario: ['', Validators.required],
      estado: [null, Validators.required],
    });

    this.loadTiposSectores();
    this.loadTiposTiempo();
    this.loadTiposEstado();

    // Cargar la oferta a editar si existe un id en la URL
    this.route.paramMap.subscribe(params => {
      this.ofertaId = Number(params.get('id'));
      if (this.ofertaId) {
        this.isEditMode = true;
        this.loadOferta(this.ofertaId);
      }
      else{
        this.isEditMode = false;
      }
    });
  }

  loadTiposSectores(): void {
    this.OfertasService.getTiposSectores().subscribe((data) => {
      this.tiposSectores = data;
    });
  }

  loadTiposTiempo(): void {
    this.OfertasService.getTiposTiempo().subscribe((data) => {
      this.tiposTiempo = data;
    });
  }

  loadTiposEstado(): void {
    this.OfertasService.getTiposEstado().subscribe((data) => {
      this.tiposEstado = data;
    });
  }

  // Método para cargar la oferta
loadOferta(id: number): void {
  this.OfertasService.getOfertaById(id).subscribe(
    oferta => {
      console.log('Datos recibidos de la oferta:', oferta);
      console.log('Valores del formulario antes de patchValue:', this.registerForm.value);

      // Asegúrate de que los valores son del tipo correcto para el formulario
      this.registerForm.patchValue({
        id: oferta.id,
        fechaInicio: oferta.fechaInicio || '',
        fechaFin: oferta.fechaFin || '',
        sector: oferta.tipoSector?.id ,
        industria: oferta.industria || '',
        titulo: oferta.titulo || '',
        empresa: oferta.empresa || '',
        modalidad: oferta.modalidad || '',
        tiempo: oferta.enumTiempo?.id,
        salario: oferta.salario || '',
        estado: oferta.estado?.id,

      });

      console.log('Valores del formulario después de patchValue:', this.registerForm.value);

    },
    error => {
      console.error('Error al cargar la oferta:', error);
    }
  );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const sectorId = this.registerForm.get('sector')?.value;
      const sector = this.tiposSectores.find(s => s.id === Number(sectorId)) ?? null;

      const tiempoId = this.registerForm.get('tiempo')?.value;
      const tiempo = this.tiposTiempo.find(t => t.id === Number(tiempoId)) ?? null;

      const estadoId = this.registerForm.get('estado')?.value;
      const estado = this.tiposEstado.find(e => e.id === Number(estadoId)) ?? null;

      const nuevaOferta: ofertas = {
        id: this.registerForm.get('id')?.value ?? 0,
        fechaInicio: this.registerForm.get('fechaInicio')?.value ?? null,
        fechaFin: this.registerForm.get('fechaFin')?.value ?? null,
        tipoSector: sector,
        industria: this.registerForm.get('industria')?.value ?? null,
        titulo: this.registerForm.get('titulo')?.value ?? null,
        empresa: this.registerForm.get('empresa')?.value ?? null,
        modalidad: this.registerForm.get('modalidad')?.value ?? null,
        enumTiempo: tiempo,
        salario: this.registerForm.get('salario')?.value ?? null,
        estado: estado,
      };

      if (this.isEditMode) {
        // Lógica para editar la oferta
        this.OfertasService.updateOferta(nuevaOferta).subscribe(
          response => {
            console.log('Oferta editada exitosamente', response);
            alert('Oferta editada exitosamente');
          },
          error => {
            console.error('Error al editar la oferta', error);
            alert('Error al editar la oferta');
          }
        );
      } else {
        // Lógica para guardar una nueva oferta
        this.OfertasService.saveOferta(nuevaOferta).subscribe(
          response => {
            console.log('Oferta guardada exitosamente', response);
            alert('Oferta guardada exitosamente');
          },
          error => {
            console.error('Error al guardar la oferta', error);
            alert('Error al guardar la oferta');
          }
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }

}



