import { Routes } from '@angular/router';
import { LoginPageComponent } from './LoginPage/LoginPage.component';
import { MainPageComponent } from './MainPage/MainPage.component';
import { PacientePageComponent } from './PacientePage/PacientePage.component';
import { RegistroPageComponent } from './RegistroPage/RegistroPage.component';
import { AdminPageComponent } from './AdminPage/AdminPage.component';
import { ConsultorioComponent } from './AdminPage/components/Consultorio/Consultorio.component';
import { DoctorComponent } from './AdminPage/components/Doctor/Doctor.component';
import { EspecialidadComponent } from './AdminPage/components/Especialidad/Especialidad.component';
import { ReservacionComponent } from './AdminPage/components/Reservacion/Reservacion.component';
import { PacienteComponent } from './AdminPage/components/Paciente/Paciente.component';
import { RolComponent } from './AdminPage/components/Rol/Rol.component';
import { UsuarioComponent } from './AdminPage/components/Usuario/Usuario.component';

export const routes: Routes = [
    { path : 'main' , component: MainPageComponent },
    { path : 'paciente' , component: PacientePageComponent },
    { path : 'registro' , component: RegistroPageComponent },
    { path : 'recuperar' , component: LoginPageComponent },
    { path : 'admin' , 
        component: AdminPageComponent ,
        children : [
            { path: 'consultorio', component: ConsultorioComponent  },
            { path: 'doctor', component:  DoctorComponent },
            { path: 'especialidad', component:  EspecialidadComponent },
            { path: 'reservacion', component:  ReservacionComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'rol', component:  RolComponent },
            { path: 'usuario', component:  UsuarioComponent },
        ]
    },
    { path : 'login' , component : LoginPageComponent },
    { path : '' , component : LoginPageComponent },
];
