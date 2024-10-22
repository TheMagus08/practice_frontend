import { tipoEstado } from "./tipoEstado";
import { tipoSector } from "./tipoSector";
import { tipoTiempo } from "./tipoTiempo";

export interface ofertas{

     id: number;
     fechaInicio: string| null;
     fechaFin: string| null;
     tipoSector: tipoSector |null,
     industria: string| null;
     titulo: string| null;
     empresa: string| null;
     modalidad: string| null;
     enumTiempo: tipoTiempo| null;
     salario: string| null;
     estado: tipoEstado| null;
}
