import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsuarioLogin } from '../Common/models/UsuarioLogin.model';
import { SharedService } from '../Common/api/Shared.service';
import { CustomCalendarDateComponent } from './components/CustomCalendarDate/CustomCalendarDate.component';
declare var bootstrap: any;
@Component({
  selector: 'app-paciente-seleccionar-cita-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomCalendarDateComponent
  ],
  templateUrl: './PacienteSeleccionarCitaPage.component.html',
  styleUrl: './PacienteSeleccionarCitaPage.component.css',
})
export class PacienteSeleccionarCitaPageComponent { 
  public usuarioLogin! : UsuarioLogin | null;
  private _modalProcesarElement : any ;
  private _modalProcesar : any ;
 


  constructor(
    private _sharedService: SharedService,
  ) {
    
  }
  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
    this._modalProcesarElement = document.getElementById('modalProcesar');
    this._modalProcesar = new bootstrap.Modal(this._modalProcesarElement);
  }
  

  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin() ?? null
    console.log(this.usuarioLogin)
  }

  abrirModalProcesar(){
    this._modalProcesar.show()
  }

}
