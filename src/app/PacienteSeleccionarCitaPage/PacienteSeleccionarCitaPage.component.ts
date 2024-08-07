import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsuarioLogin } from '../Common/models/UsuarioLogin.model';
import { SharedService } from '../Common/api/Shared.service';
import { CustomCalendarDateComponent } from './components/CustomCalendarDate/CustomCalendarDate.component';
import { EspecialidadService } from '../AdminPage/services/Especialidad.service';
import { Observable, of } from 'rxjs';
import { Especialidad } from '../Common/models/Especialidad.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../AdminPage/services/Doctor.service';
import { NestResponse } from '../Common/models/NestResponse.model';
import { Doctor } from '../Common/models/Doctor.model';
import Swal from 'sweetalert2';
import { ConsultorioService } from '../AdminPage/services/Consultorio.service';
import { Consultorio } from '../Common/models/Consultorio.model';
import { DisponibilidadService } from '../AdminPage/services/Disponibilidad.service.ts.service';
import { Disponibilidad } from '../Common/models/Disponibilidad.model';
import { convertFormaterDate } from '../Common/helpers/FormaterHelpers.helpers';
import { ReservacionService } from '../AdminPage/services/Reservacion.service';
import { ClassValidatorResponse } from '../Common/models/ClassValidatorResponse.model';
import { Reservacion } from '../Common/models/Reservacion.model';
import { UsuarioService } from '../Common/api/Usuario.service';
import { Paciente } from '../Common/models/Paciente.model';
import { Usuario } from '../Common/models/Usuario.model';
import { CulquiService } from './Culqui.service';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;


interface CulqiConfig {
  publicKey: string;
  settings(options: any): void;
  options(options: any): void;
  open(): void;
  // Agrega otras propiedades o métodos de Culqi que necesites utilizar
}

declare global {
  interface Window {
    Culqi: CulqiConfig;
  }
}

@Component({
  selector: 'app-paciente-seleccionar-cita-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomCalendarDateComponent,
    ReactiveFormsModule,
    RouterModule, 
  ],
  templateUrl: './PacienteSeleccionarCitaPage.component.html',
  styleUrl: './PacienteSeleccionarCitaPage.component.css',
  providers: [  
                EspecialidadService , 
                DoctorService ,
                ConsultorioService , 
                DisponibilidadService,
                ReservacionService,
                UsuarioService
              ]
})
export class PacienteSeleccionarCitaPageComponent { 
  listaEspecialidades$ : Observable<Especialidad[]> = of([]);
  listaEspecialidades : Especialidad[] = [];
  listaDoctores : Doctor[] = [];
  listaDisDoctor : Disponibilidad[] = [];
  ubicacionConsultorio: string = "";
  usuarioPaciente: Usuario | null  = null ;

  infoPersonalDisable : boolean = false;
  calendarioDisable: boolean = false;
  turnoDisable : boolean = false;

  public usuarioLogin! : UsuarioLogin | null;

  litEspecialidad: string = "";
  litMedico:string = "";
  litTurno:string = "";
  litPrecio:string = "";
 
  private _especialidadService = inject(EspecialidadService);
  private _doctorService = inject(DoctorService);
  private _consultorioService = inject(ConsultorioService);
  private _disponibilidadService = inject(DisponibilidadService);
  private _reservaService = inject(ReservacionService);
  private _usuarioService = inject(UsuarioService);

  formCrearReserva : FormGroup ;
  turnoSelecionado: string = '';

  constructor(
    private _sharedService: SharedService,
    private _formBuilder: FormBuilder,
    private culquiService: CulquiService,
    private _router: Router
  ) {
    this.formCrearReserva = this._formBuilder.group({
      IdPacienteUsuario: ['', [Validators.required]],
      especialidadC: ['', [Validators.required]],
      consultorioC: ['', [Validators.required]],
      doctorC: ['', [Validators.required]],
      fechaModeloC : ['',Validators.required],
      turnoC : ['',Validators.required]
    });
    this.formCrearReserva.get('doctorC')?.disable();
    this.formCrearReserva.get('consultorioC')?.disable();
  }
  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
    this.obtenerListaEspecialidades();
    this.formCrearReserva.get('turnoC')?.valueChanges.subscribe(valor => {
      this.turnoSelecionado = valor;
    });
    this.obtenerUsuario(this.usuarioLogin?.ID_usuario ?? "");
  }
  
  obtenerListaEspecialidades(){
    this._especialidadService.GetEspecialidades().subscribe({
      next: (res) => {
        this.listaEspecialidades = res;
      }
    });
    
  }

  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin() ?? null
  }

  obtenerUsuario(uuidUsuario:string){
    this._usuarioService.GetUsuarioId(uuidUsuario).subscribe({
      next: (res) => {
        this.usuarioPaciente = res;
      }
    })
  }

  obtenerDoctoresPorEspecialidad(tipoComando : string){
    let valorEspecialidadSelected = '';
    if(tipoComando === 'Crear'){
      valorEspecialidadSelected = this.formCrearReserva.get('especialidadC')?.value
    }
    this._doctorService.GetDoctoresPorEspecialidad(valorEspecialidadSelected).subscribe({
      next : (response : NestResponse | Doctor[]) => {
        if( 'status' in response ){
          if(response.status == 404){
            Swal.fire({
              title: 'Error',          
              html: `<p>${response.message}</p>`,
              icon: 'error',          
            });
            this.formCrearReserva.get('doctorC')?.disable();
            return;
          }
        }else{
          this.listaDoctores = response;
          this.formCrearReserva.get('doctorC')?.enable();
        }
      },
      error : (err ) => {
        if(!err.ok) {
          Swal.fire({
            title: 'Error',          
            html: '<p>Error con el servidor<br><b>Contacte con el Administrador</b></p>',
            icon: 'error',          
          });
        }
        this.formCrearReserva.get('doctorC')?.disable();
      }
    })
    
  }
  seleccionarInfoPersonal(){
    this.infoPersonalDisable = true;
  }
  obtenerConsultorioPorDoctor(){
    let idDoctor = this.formCrearReserva.get('doctorC')?.value;
    this._consultorioService.PostConsultorioPorDoctor(idDoctor).subscribe({
      next : (response : Consultorio ) => {
            this.formCrearReserva.get('consultorioC')?.setValue(response.ID_consultorio);
            this.ubicacionConsultorio = response.ubicacion
      },
      error : (err ) => {
        if(!err.ok) {
          Swal.fire({
            title: 'Error',          
            html: '<p>Error con el servidor<br><b>Contacte con el Administrador</b></p>',
            icon: 'error',          
          });
        }
      }

    })

  }

  recibirFechaModelo(modeloFecha : any){
    this.formCrearReserva.get('fechaModeloC')?.setValue(modeloFecha);
    console.log(this.formCrearReserva.get('fechaModeloC')?.value)
  }
  obtenerDisponibilidadPorDoctor(){
    let uuidDoctor = this.formCrearReserva.get('doctorC')?.value;
    console.log(uuidDoctor)
    this._disponibilidadService.PostDisponibilidadPorDoctor(uuidDoctor).subscribe({
      next: (res) => {
        this.listaDisDoctor = res;
      }
    });
    this.calendarioDisable = true;
  }
  seleccionarTurno(){
    this.formCrearReserva.get('turnoC')?.valueChanges.subscribe(valor => {
      console.log('Valor seleccionado:', valor);
    });

    this.turnoDisable = true;

    let turnoForm = this.formCrearReserva.get('turnoC')?.value;
    let medicoForm =this.formCrearReserva.get('doctorC')?.value;      
    let especialidadForm = this.formCrearReserva.get('especialidadC')?.value;

    this.litMedico = this.listaDoctores.find( item => item.ID_doctor === medicoForm )?.usuario.nombre ?? "";;
    this.litTurno = this.listaDisDoctor.find( item => item.ID_disponibilidad === turnoForm )?.descripcion ?? "";
    this.litEspecialidad = this.listaEspecialidades.find( item => item.ID_especialidad === especialidadForm )?.nombre_especialidad ?? "";
    this.litPrecio = this.listaEspecialidades.find( item => item.ID_especialidad === especialidadForm )?.precio_especialidad.toString() ?? "" ;

   
  }

  grabarReserva(){
    let fechaString = convertFormaterDate(this.formCrearReserva.get('fechaModeloC')?.value);
    let newReservacion = {
      id_paciente: this.usuarioPaciente?.paciente.ID_paciente,
      id_doctor:this.formCrearReserva.get('doctorC')?.value ,
      id_consultorio:this.formCrearReserva.get('consultorioC')?.value,
      id_disponibilidad:this.formCrearReserva.get('turnoC')?.value,
      fecha: fechaString
    }



   

    //crear reservacion
    this._reservaService.PostCrearReservacion(newReservacion).subscribe({  
      next : (response : Reservacion | NestResponse ) => {
        if( 'status' in response ){
          if(response.status == 404){
            Swal.fire({
              title: 'Error',          
              html: `<p>${response.message}</p>`,
              icon: 'error',          
            });
            return;
          }
        }else{
          this.culquiService.configurarCulqi(this.litPrecio);


          setTimeout(() => {
            this.culquiService.closeCulqui();
            Swal.fire({
              title: 'Exito',          
              html: `<p>Reserva Registrada Correctamente.</p>`,
              icon: 'success',          
            }).then( res => {
              console.log(res)
              if(res.isConfirmed){
                this._router.navigate(['/pacienteCitas']);
              }
            }
            )
          }, 20000); 
         
        }
      },
      error: (err) =>{
        if( 'error' in err.error ){
          let validatorError = err.error as ClassValidatorResponse
          if(validatorError.statusCode == 400){
            Swal.fire({
              title: 'Error',          
              html: `<p><b>${validatorError.message.join(' , ')}</b></p>`,
              icon: 'error',          
            });
          }
        
        }
        else{
          Swal.fire({
            title: 'Error',          
            html: '<p><b>No se pudo registrar un Consultorio</b></p>',
            icon: 'error',          
          });
        }
      },
      complete: ()=>{
       
      }
    });
   

   
    
    

  }
}
