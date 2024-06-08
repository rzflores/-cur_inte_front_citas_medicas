import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../Common/models/UsuarioLogin.model';
import { SharedService } from '../Common/api/Shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './PacientePage.component.html',
  styleUrl: './PacientePage.component.css',
  providers: []
})
export class PacientePageComponent implements OnInit { 
  public usuarioLogin! : UsuarioLogin | null;
  constructor(
    private _sharedService: SharedService,
  ) {
    
  }
  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }
  

  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin() ?? null
    console.log(this.usuarioLogin)
  }

}
