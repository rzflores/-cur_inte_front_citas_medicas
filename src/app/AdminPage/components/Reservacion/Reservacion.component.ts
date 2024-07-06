import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReservacionService } from '../../services/Reservacion.service';
import { Reservacion } from '../../../Common/models/Reservacion.model';
import { Observable, of } from 'rxjs';
import { UsuarioLogin } from '../../../Common/models/UsuarioLogin.model';
import { SharedService } from '../../../Common/api/Shared.service';

@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Reservacion.component.html',
  styleUrl: './Reservacion.component.css',
  providers:[ ReservacionService ]
})
export class ReservacionComponent implements OnInit {
  listaReservaciones$ : Observable<Reservacion[]> = of([]);
  public usuarioLogin! : UsuarioLogin | null;
  private _reservacionService = inject(ReservacionService);
  uuidUsuario : string = "all";
  constructor(
    private _sharedService: SharedService,
  ) {
    
  }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
    this.obtenerListaResevaciones();
  }
  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin() ?? null;
  }
  obtenerListaResevaciones(){
    if(this.usuarioLogin != null){
      this.uuidUsuario = this.usuarioLogin.rol.nombre === "Administrador" ? "all" : this.usuarioLogin.ID_usuario
    }
    this.listaReservaciones$ = this._reservacionService.GetReservaciones(this.uuidUsuario);
  }
 }
