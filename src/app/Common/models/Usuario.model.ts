import { Rol } from "./Rol.model";

export interface Usuario {
    ID_usuario:  string;
    nombre:      string;
    apellido:    string;
    email:       string;
    contrasenia: string;
    numero_documento: string;
    tipo_documento: string;
    celular:     string;
    rol:         Rol;
    es_activo:   boolean;
}

