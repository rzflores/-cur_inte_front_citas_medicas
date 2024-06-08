import { Especialidad } from "./Especialidad.model";
import { Usuario } from "./Usuario.model";

export interface Doctor {
    ID_doctor:         string;
    anios_experiencia: number;
    codigo_colegio:    string;
    es_eliminado:      boolean;
    usuario :          Usuario; 
    especialidad:      Especialidad;
    es_activo:   boolean;
}