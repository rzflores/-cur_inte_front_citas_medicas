import { Rol } from "./Rol.model";

export interface Usuario {
    ID_usuario:  string;
    nombre:      string;
    apellido:    string;
    email:       string;
    contrasenia: string;
    celular:     string;
    rol:         Rol;
}

