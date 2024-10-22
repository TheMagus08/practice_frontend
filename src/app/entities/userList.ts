import { Role } from "./enum/role";

export interface userList {
  id:number;
  primerNombre: string;
  segundoNombre: string;
  apellidoP: string;
  apellidoM: string;
  codigo: string;
  email: string;
  numeroDocumento: string;
  role: Role;

}
