import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReservacionService } from '../AdminPage/services/Reservacion.service';
import { SharedService } from '../Common/api/Shared.service';
import { UsuarioLogin } from '../Common/models/UsuarioLogin.model';
import { UsuarioService } from '../Common/api/Usuario.service';
import { Usuario } from '../Common/models/Usuario.model';
import { Reservacion } from '../Common/models/Reservacion.model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-citas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './PacienteCitas.component.html',
  styleUrl: './PacienteCitas.component.css',
  providers: [ ReservacionService , UsuarioService ]
})
export class PacienteCitasComponent { 
  public usuarioLogin! : UsuarioLogin | null;
  private _reservaService = inject(ReservacionService);
  private _usuarioService = inject(UsuarioService);
  usuarioPaciente: Usuario | null  = null ;
  listaHistorialCitas : Reservacion[] = [];


  constructor(
    private _sharedService: SharedService,
  ) {
    
  }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();

    if (this.usuarioLogin?.ID_usuario) {
      of(this.usuarioLogin.ID_usuario)
        .pipe(
          switchMap((uuidUsuario) => this.obtenerUsuarioPaciente(uuidUsuario)),
          switchMap((usuarioPaciente) => {
            this.usuarioPaciente = usuarioPaciente;
            if (usuarioPaciente?.paciente?.ID_paciente) {
              return this.obtenerHistorialCitas(usuarioPaciente.paciente.ID_paciente);
            } else {
              return of(null); // Return an empty observable if no patient ID
            }
          }),
          catchError((error) => {
            console.error('Error:', error);
            return of(null); // Handle the error and return an empty observable
          })
        )
        .subscribe((historialCitas) => {
          this.listaHistorialCitas = historialCitas;
        });
    }


  }

  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin() ?? null
  }

  obtenerUsuarioPaciente(uuidUsuario: string): Observable<any> {
    return this._usuarioService.GetUsuarioId(uuidUsuario);
  }
  
  obtenerHistorialCitas(uuidPaciente: string): Observable<any> {
    return this._reservaService.PostObtenerReservacionPorPaciente(uuidPaciente);
  }

  

}
