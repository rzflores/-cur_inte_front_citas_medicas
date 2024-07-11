import { Consultorio } from "./Consultorio.model";
import { Disponibilidad } from "./Disponibilidad.model";
import { Doctor } from "./Doctor.model";
import { Paciente } from "./Paciente.model";
import { Usuario } from "./Usuario.model";

export interface Reservacion {
    fecha: string;
    paciente: Paciente;
    doctor: Doctor;
    consultorio: Consultorio;
    ID_reservacion: string;
    estado: number;
    disponibilidad: Disponibilidad
}