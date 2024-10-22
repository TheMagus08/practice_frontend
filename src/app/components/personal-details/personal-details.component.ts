import { Component , OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { HijosService } from '../../services/hijos/hijos.service';
import { hijos } from '../../entities/hijos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { tipoSexo } from '../../entities/tipoSexo';
import { TiposexoService } from '../../services/tiposexo/tiposexo.service';
import { take } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { tipoDocumento } from '../../entities/tipoDocumento';
import { Departamento } from '../../entities/ubigeo/departamento';
import { Provincia } from '../../entities/ubigeo/provincia';
import { Distrito } from '../../entities/ubigeo/distrito';
import { UbigeoService } from '../../services/ubigeo/ubigeo.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent  implements OnInit {
  mostrarMensaje: boolean = false;


  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  sexos: tipoSexo[] = [];
  editMode:boolean=false;
  documentos: tipoDocumento[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  selectedSexo: tipoSexo | undefined;
  isEditing: boolean = false;
  hijos: hijos[] = []; // Lista completa de hijos
  deletedChildren: Set<number> = new Set();
  private hijosAEliminar: string[] = [];



  selectedDepartamentoId: number | undefined;
selectedProvinciaId: number | undefined;
selectedDistritoId: number | undefined;

  registerForm=this.formBuilder.group({
    id:[''],
    sexo: [{ value: '', disabled: true }],
    primerNombre:  [{ value: '', disabled: true }],
    segundoNombre:[{ value: '', disabled: true }],
    codigo:[{ value: '', disabled: true }],
    apellidoM: [{ value: '', disabled: true }],
    apellidoP: [{ value: '', disabled: true }],
    fechaNac: [{ value: '', disabled: true }],
    ciudadNac: [{ value: '', disabled: true }],
    estadoCivil: [{ value: '', disabled: true }],
    tipoDocumento: [{ value: '', disabled: true }],
    numeroDocumento: [{ value: '', disabled: true }],
    telefono1: [{ value: '', disabled: true }],
    telefono2: [{ value: '', disabled: true }],
    username: [{ value: '', disabled: true }],
    direccion: [{ value: '', disabled: true }],
    urbanizacion: [{ value: '', disabled: true }],
    departamento:[{ value: '', disabled: true }],
    provincia: [{ value: '', disabled: true }],
    distrito: [{ value: '', disabled: true }],
    linkedin: [{ value: '', disabled: true }],
    facebook: [{ value: '', disabled: true }],
    instagram: [{ value: '', disabled: true }],
    universidad: [{ value: '', disabled: true }],
    anhoUniversidad: [{ value: '', disabled: true }],
    titulo: [{ value: '', disabled: true }],
    anhoTitulo: [{ value: '', disabled: true }],
    selectedDepartamentoId: [{value:'', disabled: true }],
    selectedProvinciaId: [{value:'', disabled: true }],
    selectedDistritoId: [{value:'', disabled: true }],



    children: this.formBuilder.array([]) // Inicializado vacío

    //children: this.formBuilder.array([this.createChildForm()])
  });

  constructor(
    private userService: UserService,
    private hijosService: HijosService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private tipoSexoService: TiposexoService,
    private toastr: ToastrService,
    private UbigeoService: UbigeoService,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef) {


    }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {

      // Cargar el usuario seleccionado de la lista
      this.loadUserProfile(Number(userId));
      console.log('Datos del usuario logueado recibidos:', userId);

      this.userService.getUser(Number(userId)).subscribe({
        next: (userData) => {
          this.user = userData;
          console.log('Datos del usuario logueado recibidos:', userData);
          this.populateUserData(userData);
          this.loadChildren(userData.id);
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        }
      });
    } else {
      // Cargar los detalles del usuario logueado
      this.userService.getUser(this.loginService.getId()).subscribe({
        next: (userData) => {
          this.user = userData;
          console.log('Datos del usuario logueado recibidos:', userData);
          this.populateUserData(userData);
          this.loadChildren(userData.id);
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        }
      });
    }
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

     // Cargar la lista de sexos
     this.tipoSexoService.getSexos().subscribe({
      next: (data: tipoSexo[]) => {
        this.sexos = data;

      },
      error: (error) => console.error('Error fetching sexos', error)
    });

    this.userService.getTipoDocumento().subscribe({
      next: (data: tipoDocumento[]) => {
        this.documentos = data;
      },
      error: (error) => console.error('Error fetching documentos', error)
    });

    this.loadDepartamentos();



  }

  onDepartamentoChange() {
    const departamentoId = this.registerForm.get('selectedDepartamentoId')?.value;
    if (departamentoId) {
      this.UbigeoService.getProvinciasByDepartamento(departamentoId).subscribe((data) => {
        this.provincias = data;


      });
    }
  }

  onProvinciaChange() {
    const provinciaId = this.registerForm.get('selectedProvinciaId')?.value;
    if (provinciaId) {
      this.UbigeoService.getDistritosByProvincia(provinciaId).subscribe((data) => {
        this.distritos = data;
        this.registerForm.get('selectedDistritoId')?.setValue('');
      });
    }
  }

  loadUserProfile(id: number) {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
    });
  }

  loadDepartamentos() {
    this.UbigeoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }


  loadSexos(): void {
    this.tipoSexoService.getSexos().subscribe({
      next: (sexos) => {
        this.sexos = sexos;
      },
      error: (errorData) => console.error(errorData)
    });
  }

  // Crear un FormGroup para cada hijo
  createChildForm(child?: hijos): FormGroup {
    return this.formBuilder.group({
      id: [child?.id || ''],
      nombres: [{ value: child?.nombres || '', disabled: !this.isEditing }, Validators.required],
      sexo: [{ value: child?.sexo || '', disabled: !this.isEditing }, Validators.required],
      fechaNacimiento: [{ value: child?.fechaNacimiento || '', disabled: !this.isEditing }, Validators.required],
      dni: [{ value: child?.dni || '', disabled: !this.isEditing }, [Validators.required, Validators.minLength(8)]],

    });
  }

  // Obtener el FormArray para los hijos
  get children(): FormArray {
    return this.registerForm.get('children') as FormArray;
  }

    // Cargar hijos para un usuario específico
    loadChildren(userId: number): void {
    this.hijosService.getHijosByUserId(userId).subscribe({
        next: (children) => {
            this.hijos = children;
            this.children.clear(); // Limpiar el FormArray
            children.forEach(child => this.children.push(this.createChildForm(child))); // Agregar hijos al FormArray
        },
        error: (errorData) => console.error(errorData)
    });
}








  // Poblar los datos de usuario en el formulario
  populateUserData(userData: User) {
    this.registerForm.patchValue({
      id: userData.id.toString(),
      primerNombre: userData.primerNombre,
      segundoNombre: userData.segundoNombre,
      codigo: userData.codigo,
      apellidoM: userData.apellidoM,
      apellidoP: userData.apellidoP,
      sexo: userData.sexo,
      fechaNac: userData.fechaNac,
      ciudadNac: userData.ciudadNac,
      estadoCivil: userData.estadoCivil,
      tipoDocumento: userData.tipoDocumento,
      numeroDocumento: userData.numeroDocumento,
      telefono1:userData.telefono1,
      telefono2:userData.telefono2,
      username:userData.username,
      urbanizacion:userData.urbanizacion,
      direccion:userData.direccion,
      facebook:userData.facebook,
      instagram:userData.instagram,
      linkedin:userData.linkedin
    });

  }

  mostrarAlerta() {
     // Mostrar la alerta
     this.mostrarMensaje = true;

     // Forzar la detección de cambios
     this.cdr.detectChanges();

     // Ocultar la alerta automáticamente después de 3 segundos
     //setTimeout(() => {
      //this.mostrarMensaje = false;
     // this.cdr.detectChanges(); // Asegurar que la vista se actualiza al esconder la alerta
    //}, 3000);
  }

  // Guardar los detalles personales
  savePersonalDetailsData() {
    //if (this.registerForm.valid) {
      console.log('Datos a enviar:', this.registerForm.value);
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: () => {
          this.editMode = false;

          this.toastr.success('Datos guardados exitosamente', 'Éxito');

          this.saveChildren();

           //Actualizar los datos del usuario después de guardar
          this.userService.getUser(this.loginService.getId()).pipe(take(1)).subscribe({
            next: (userData) => {
              this.user = userData;
              console.log('Datos actualizados:', this.user);
              this.mostrarAlerta();


               //Recargar la página después de 3 segundos
              setTimeout(() => {
                window.location.reload();
              }, 1000);


            },
            error: (errorData) => {
              console.error(errorData);


            }
          });
        },
        error: (errorData) => console.error(errorData)
      });
    //}
  }




  // Guardar cambios en los hijos
  saveChildren() {
    console.log('saveChildren called'); // Para depuración
    const childrenToUpdate = this.children.value as hijos[];
    const id = this.loginService.getId();

  // Luego actualizar o agregar los hijos
    childrenToUpdate.forEach(child => {
      const childData = { ...child, id };
      console.log('Sexo del hijo:', child.sexo); // Verificar el valor del sexo
      console.log('Datos del hijo a enviar:', childData);

      if (child.id) {
        this.hijosService.updateHijo(child.id, childData).subscribe({
          next: () => console.log(`Hijo ${child.id} actualizado`),
          error: (errorData) => console.error(`Error actualizando hijo ${child.id}:`, errorData)
        });
      } else {
        this.hijosService.addHijo(childData).subscribe({
          next: () => console.log('Hijo añadido'),

          error: (errorData) => console.error('Error añadiendo hijo:', errorData)
        });
      }
    });

    console.log('Hijos a eliminar:', this.hijosAEliminar);


    // Eliminar hijos marcados
  this.hijosAEliminar.forEach(id => {
    const idAsNumber = Number(id); // Convierte el ID a número
    console.log('ELIMINAAAAAAAAAAR:',idAsNumber );

    this.hijosService.deleteHijo(idAsNumber).subscribe({
      next: () => console.log(`Hijo ${idAsNumber} eliminado`),
      error: (errorData) => console.error(`Error eliminando hijo ${idAsNumber}:`, errorData)
    });
  });

  // Limpiar el estado de eliminación después de guardar
  this.hijosAEliminar = [];

  }

   // Agregar un nuevo hijo
   addChild(): void {
    const newChild = this.createChildForm(); // Crear un nuevo hijo
    this.children.push(newChild); // Agregar el nuevo hijo al FormArray

  }

  removeChild(index: number) {

    const childId = this.children.controls[index].get('id')?.value;
    if (childId) {
      console.log('ELIMINAAAAAAAAAAR:',childId );

      const idAsNumber = Number(childId);
      this.hijosAEliminar.push(childId); // Asegúrate de agregar aquí


    }
    this.children.removeAt(index);
  }


  enableEdit() {
    this.isEditing = true;
    this.enableChildrenEdit();
    this.registerForm.enable();

  }

  // Puedes tener otras funciones, como la de deshabilitar el select
  disableEdit() {
    this.isEditing = false;
    this.disableChildrenEdit();
    this.registerForm.disable();

  }



  // Método para habilitar la edición de los campos de los hijos
  enableChildrenEdit(): void {
    this.children.controls.forEach(childControl => {
      childControl.enable();
    });
  }

  // Método para deshabilitar la edición de los campos de los hijos
  disableChildrenEdit(): void {

    this.children.controls.forEach(childControl => {
      childControl.disable();
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.isEditing = false;
    this.registerForm.get('sexo')?.disable();
    this.registerForm.get('codigo')?.disable();
    this.registerForm.get('tipoDocumento')?.disable();
    this.registerForm.get('primerNombre')?.disable();
    this.registerForm.get('segundoNombre')?.disable();
    this.registerForm.get('fechaNac')?.disable();
    this.registerForm.get('apellidoM')?.disable();
    this.registerForm.get('apellidoP')?.disable();
    this.registerForm.get('estadoCivil')?.disable();
    this.registerForm.get('ciudadNac')?.disable();
    this.registerForm.get('numeroDocumento')?.disable();
    this.registerForm.get('telefono1')?.disable();
    this.registerForm.get('telefono2')?.disable();
    this.registerForm.get('direccion')?.disable();
    this.registerForm.get('urbanizacion')?.disable();
    this.registerForm.get('linkedin')?.disable();
    this.registerForm.get('facebook')?.disable();
    this.registerForm.get('instagram')?.disable();

  }


  // Getters para los campos del formulario
  get primerNombre() { return this.registerForm.controls.primerNombre; }
  get segundoNombre() { return this.registerForm.controls.segundoNombre; }
  get codigo() { return this.registerForm.controls.codigo; }
  get fechaNac() { return this.registerForm.controls.fechaNac; }
  get apellidoM() { return this.registerForm.controls.apellidoM; }
  get apellidoP() { return this.registerForm.controls.apellidoP; }
  get estadoCivil() { return this.registerForm.controls.estadoCivil; }
  get ciudadNac() { return this.registerForm.controls.ciudadNac; }
  get sexo() { return this.registerForm.controls.sexo; }
  get tipoDocumento() { return this.registerForm.controls.tipoDocumento; }
  get numeroDocumento() { return this.registerForm.controls.numeroDocumento; }
  get telefono1() { return this.registerForm.controls.telefono1; }
  get telefono2() { return this.registerForm.controls.telefono2; }
  get direccion() { return this.registerForm.controls.direccion; }
  get urbanizacion() { return this.registerForm.controls.urbanizacion; }
  get linkedin() { return this.registerForm.controls.linkedin; }
  get facebook() { return this.registerForm.controls.facebook; }
  get instagram() { return this.registerForm.controls.instagram; }




}

