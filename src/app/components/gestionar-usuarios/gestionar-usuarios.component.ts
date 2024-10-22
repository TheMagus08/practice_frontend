import { Component, OnInit } from '@angular/core';
import { userList } from '../../entities/userList';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router'; // Importa el Router
import { Role } from '../../entities/enum/role';
import { TiposexoService } from '../../services/tiposexo/tiposexo.service';
import { tipoSexo } from '../../entities/tipoSexo';
import { tipoDocumento } from '../../entities/tipoDocumento';
import { DocumentoService } from '../../services/services/documento.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.css'
})
export class GestionarUsuariosComponent implements OnInit {

  users: userList[] = [];
  newUser: any = { username: '', role: '', password: '',tipoSexo:'', tipoDocumento:'' };
  roles: Role[] = [];
  tipoSexo: tipoSexo[] = [];
  documento: tipoDocumento[] =[];


  constructor(private userService: UserService, private router: Router, private tipoSexoService :TiposexoService, private tipoDocumento: DocumentoService ) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });

    this.tipoSexoService.getSexos().subscribe((data:tipoSexo[])=>{
      this.tipoSexo = data;
    });

    this.tipoDocumento.getDocumento().subscribe((data:tipoDocumento[])=>{
      this.documento=data;
    })



    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: userList[]) => {
      this.users = data;
    }, error => {
      console.error('Error al obtener los usuarios', error);
    });
  }


   // Manejando cambio de rol
   onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.newUser.role = selectElement.value;
    console.log('Role seleccionado:', this.newUser.role);  // Verifica qué valor está siendo asignado

  }

  // Manejando cambios en los inputs genéricos
  onInputChange(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    this.newUser[field] = inputElement.value;
    console.log(`Valor de ${field}:`, this.newUser[field]);  // Verifica el valor asignado

  }

  onAction(user: userList) {

    console.log(`Acción ejecutada para el usuario: ${user.primerNombre}`);
    console.log(`Acción ejecutada para el usuario: ${user.id}`);

    this.router.navigate(['/perfil', user.id]);
  }

  onSubmit() {
    // Aquí puedes hacer la llamada al servicio para crear un nuevo usuario
    this.userService.createUser(this.newUser).subscribe(response => {

      console.log(this.newUser);
      console.log('Usuario creado exitosamente');
      this.loadUsers(); // Recargar la lista de usuarios
    }, error => {
      console.log('Acción ejecutada para el usuario:',this.newUser);
      console.error('Error al crear el usuario', error);
    });
  }

}
