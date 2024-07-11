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
import { AuthGuard } from './Common/guards/login-usuario.guard';
import { PacienteSeleccionarCitaPageComponent } from './PacienteSeleccionarCitaPage/PacienteSeleccionarCitaPage.component';
import { PacienteCitasComponent } from './PacienteCitas/PacienteCitas.component';
import { EmfermeraComponent } from './AdminPage/components/Emfermera/Emfermera.component';

export const routes: Routes = [
    { path : 'main' , component: MainPageComponent },
    { path : 'paciente' , component: PacientePageComponent },
    { path : 'paciente/selecionar-cita' , component: PacienteSeleccionarCitaPageComponent },
    { path : 'paciente/citas' , component: PacienteCitasComponent },
    { path : 'registro' , component: RegistroPageComponent },
    { path : 'recuperar' , component: LoginPageComponent },
    { path : 'admin' , 
        component: AdminPageComponent ,
        // canActivate: [AuthGuard],
        children : [
            { path: 'consultorio', component: ConsultorioComponent  },
            { path: 'doctor', component:  DoctorComponent },
            { path: 'especialidad', component:  EspecialidadComponent },
            { path: 'reservacion', component:  ReservacionComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'rol', component:  RolComponent },
            { path: 'usuario', component:  UsuarioComponent },
            { path: 'emfermera', component:  EmfermeraComponent },
        ]
    },
    { path : 'login' , component : LoginPageComponent },
    { path : '' , component : LoginPageComponent },
];
