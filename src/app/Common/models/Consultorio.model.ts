import { Doctor } from "./Doctor.model";
import { Emfermera } from "./Emfermera.model";
import { Especialidad } from "./Especialidad.model";

export interface Consultorio {
    ID_consultorio:     string;
    nombre_consultorio: string;
    ubicacion:          string;
    es_eliminado:       boolean;
    es_activo:          boolean;
    especialidad:       Especialidad;
    doctor:             Doctor;
    emfermera :         Emfermera;
}
