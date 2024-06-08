import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Doctor } from '../../../Common/models/Doctor.model';
import { Observable, of } from 'rxjs';
import { DoctorService } from '../../services/Doctor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especialidad } from '../../../Common/models/Especialidad.model';
import { EspecialidadService } from '../../services/Especialidad.service';
import { UsuarioService } from '../../../Common/api/Usuario.service';
import { Usuario } from '../../../Common/models/Usuario.model';
import Swal from 'sweetalert2';
import { ClassValidatorResponse } from '../../../Common/models/ClassValidatorResponse.model';
import { getFieldStatus } from '../../../Common/helpers/UIHelpers.helpers';
declare var bootstrap: any; 
@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './Doctor.component.html',
  styleUrl: './Doctor.component.css',
  providers: [DoctorService,EspecialidadService,UsuarioService]
})
export class DoctorComponent { 
  listaEspecialidades$ : Observable<Especialidad[]> = of([]);
  listaDoctores$ : Observable<Doctor[]> = of([]);

  private _doctorService = inject(DoctorService);
  private _especialidadService = inject(EspecialidadService);
  private _usuarioService = inject(UsuarioService);

  formCrearMedico : FormGroup ;
  formEditarMedico : FormGroup ;

  private _modalCrearElement : any ;
  private _modalCrear : any ;
  private _modalEditarElement : any ;
  private _modalEditar : any ;

  private readonly uuidRolDoctor : string = '0a22c00b-1706-11ef-9a31-0242ac150002';

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.formCrearMedico = this._formBuilder.group({
      rolC: ['', [Validators.required]],
      nombresC: ['', [Validators.required]],
      apellidosC: ['', [Validators.required]],
      emailC: ['', [Validators.required, Validators.email]],
      contraseniaC: ['', Validators.required],
      tipo_documentoC: ['', [Validators.required]],
      numero_documentoC: ['', [Validators.required]],
      especialidadC: ['', Validators.required],
      anios_experianciaC: ['', Validators.required],
      codigo_colegioC: ['', Validators.required],
    });

    this.formCrearMedico.get('rolC')?.setValue(this.uuidRolDoctor);

    this.formEditarMedico = this._formBuilder.group({
      IdMedicoEditar: ['', [Validators.required]],
      especialidadE: ['', [Validators.required, Validators.email]],
      anios_experianciaE: ['', Validators.required],
      codigo_colegioE : ['', Validators.required],
      estadoE:['', Validators.required],
      IdUsuarioEditar : ['',[Validators.required]]
    });
  }
 



  ngOnInit(): void {
    this.obtenerListaDoctores();
    this.obtenerListaEspecialidades();

    this._modalCrearElement = document.getElementById('modalCrear');
    this._modalCrear = new bootstrap.Modal(this._modalCrearElement);
    this._modalEditarElement = document.getElementById('modalEditar');
    this._modalEditar = new bootstrap.Modal(this._modalEditarElement);
  }

  obtenerListaEspecialidades(){
    this.listaEspecialidades$ = this._especialidadService.GetEspecialidades();
  }
  obtenerListaDoctores(){
    this.listaDoctores$ = this._doctorService.GetDoctores();
  }

  abrirModalCrearDoctor(){
    this._modalCrear.show();
  }


  abrirModalEditarDoctor(uuid:string){
     this._modalEditar.show()
    this._doctorService.GetDoctorId(uuid).subscribe({
      next:(res) =>{
        this.formEditarMedico.get('IdMedicoEditar')?.setValue(res.ID_doctor);
        this.formEditarMedico.get('especialidadE')?.setValue(res.especialidad.ID_especialidad);
        this.formEditarMedico.get('codigo_colegioE')?.setValue(res.codigo_colegio);
        this.formEditarMedico.get('anios_experianciaE')?.setValue(res.anios_experiencia);
        this.formEditarMedico.get('estadoE')?.setValue( res.usuario.es_activo == true ? "1" : "0");
        this.formEditarMedico.get('IdUsuarioEditar')?.setValue( res.usuario.ID_usuario );
      },
      error: () => {

      }
    });
  }

  validarNroDocDoctor(){
    let nroDoc = this.formCrearMedico.get('numero_documentoC')?.value;
    this._usuarioService.PostBuscarPorTermino(nroDoc,'').subscribe(
      {
        next : (res)=>{
          if(!res){
            Swal.fire({
              title: 'Error',          
              html: `<p>Numero de documento existente</p>`,
              icon: 'error',          
            });
          }
          
        }
      }
    )
  }

  validarEmailDoctor(){
      let email = this.formCrearMedico.get('emailC')?.value;
      this._usuarioService.PostBuscarPorTermino('',email).subscribe(
        {
          next : (res)=>{
            if(!res){
              Swal.fire({
                title: 'Error',          
                html: `<p>Email existente</p>`,
                icon: 'error',          
              });
            }
          }
        }
      )
  }


  crearDoctor(){
    this.validarNroDocDoctor();
    this.validarEmailDoctor();

      let newUsuario  = {
        nombre: this.formCrearMedico.get('nombresC')?.value,
        apellido : this.formCrearMedico.get('apellidosC')?.value,
        email: this.formCrearMedico.get('emailC')?.value,
        contrasenia: this.formCrearMedico.get('contraseniaC')?.value,
        celular: this.formCrearMedico.get('celularC')?.value,
        id_rol : this.formCrearMedico.get('rolC')?.value,
        numero_documento: this.formCrearMedico.get('numero_documentoC')?.value ,
        tipo_documento: this.formCrearMedico.get('tipo_documentoC')?.value,
        id_especialidad: this.formCrearMedico.get('especialidadC')?.value,
        anios_experiencia: Number(this.formCrearMedico.get('anios_experianciaC')?.value),
        codigo_colegio : this.formCrearMedico.get('codigo_colegioC')?.value,
      }
      //crear doctor desde usuario
      this._usuarioService.PostCrearUsuario(newUsuario).subscribe({  
        next : (response : Usuario) => {
          this._modalCrear.hide();
          Swal.fire({
              title: 'Exito',          
              html: `<p>Medico Registrado Correctamente.</p>`,
              icon: 'success',          
            })
            this.obtenerListaDoctores();  
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
              html: '<p>Medico al registrar paciente</b></p>',
              icon: 'error',          
            });
          }
        },
        complete: ()=>{
          this.formCrearMedico.reset();
      
        }
      });

  }

  eliminarDoctor(uuid : string){
    this._usuarioService.DeleteUsuario(uuid).subscribe( {
      next: (res) => {
        console.log(res)
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Doctor eliminado Correctamente.</p>`,
            icon: 'success',          
          })
          this.obtenerListaDoctores();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al eliminar el doctor</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    });

  }

  editarDoctor(){

    let uuidDoctorEditar = this.formEditarMedico.get('IdMedicoEditar')?.value;
    let editDoctor  = {      
      anios_experiencia: Number(this.formEditarMedico.get('anios_experianciaE')?.value),
      codigo_colegio : this.formEditarMedico.get('codigo_colegioE')?.value ,   
      id_especialidad: this.formEditarMedico.get('especialidadE')?.value,
      es_activo: this.formEditarMedico.get('estadoE')?.value == "1" ? true : false,
      id_usuario : this.formEditarMedico.get('IdUsuarioEditar')?.value,
    }
    console.log(uuidDoctorEditar)
    console.log(editDoctor)

    this._doctorService.PatchEditarDoctor(uuidDoctorEditar,editDoctor).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Doctor editado Correctamente.</p>`,
            icon: 'success',          
          })
          this._modalEditar.hide();
          this.obtenerListaDoctores();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al editar el doctor</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    })
  }

  obtenerFormCrearDoctorError(field: string): string {
    return getFieldStatus(field,this.formCrearMedico)
  }

  obtenerFormEditarDoctorError(field: string): string {
    return getFieldStatus(field,this.formEditarMedico)
  }


}
