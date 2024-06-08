import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Consultorio } from '../../../Common/models/Consultorio.model';
import { Especialidad } from '../../../Common/models/Especialidad.model';
import { Observable, of } from 'rxjs';
import { ConsultorioService } from '../../services/Consultorio.service';
import { EspecialidadService } from '../../services/Especialidad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getFieldStatus } from '../../../Common/helpers/UIHelpers.helpers';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/Doctor.service';
import { NestResponse } from '../../../Common/models/NestResponse.model';
import { Doctor } from '../../../Common/models/Doctor.model';
import { ClassValidatorResponse } from '../../../Common/models/ClassValidatorResponse.model';
declare var bootstrap: any; 

@Component({
  selector: 'app-consultorio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ ConsultorioService , EspecialidadService , DoctorService ],
  templateUrl: './Consultorio.component.html',
  styleUrl: './Consultorio.component.css',
})
export class ConsultorioComponent {
  listaEspecialidades$ : Observable<Especialidad[]> = of([]);
  listaConsultorios$ : Observable<Consultorio[]> = of([]);
  listaDoctores : Doctor[] = [];


  private _consultorioService = inject(ConsultorioService);
  private _especialidadService = inject(EspecialidadService);
  private _doctorService = inject(DoctorService);


  formCrearConsultorio : FormGroup ;
  formEditarConsultorio : FormGroup ;

  private _modalCrearElement : any ;
  private _modalCrear : any ;
  private _modalEditarElement : any ;
  private _modalEditar : any ;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.formCrearConsultorio = this._formBuilder.group({
      ubicacionC: ['', [Validators.required]],
      especialidadC: ['', [Validators.required]],
      doctorC: ['', [Validators.required]],
    });


    this.formEditarConsultorio = this._formBuilder.group({
      IdConsultorioEditar: ['', [Validators.required]],
      ubicacionE: ['', [Validators.required, Validators.email]],
      especialidadE: ['', Validators.required],
      doctorE : ['', Validators.required],
      estadoE:['', Validators.required],
    });

  }
  ngOnInit(): void {
   
    this.obtenerListaConsultorios();
    this.obtenerListaEspecialidades();

    this._modalCrearElement = document.getElementById('modalCrear');
    this._modalCrear = new bootstrap.Modal(this._modalCrearElement);
    this._modalEditarElement = document.getElementById('modalEditar');
    this._modalEditar = new bootstrap.Modal(this._modalEditarElement);
    if(this.listaDoctores.length == 0){
      this.formCrearConsultorio.get('doctorC')?.disable()
    }
  }

  obtenerListaEspecialidades(){
    this.listaEspecialidades$ = this._especialidadService.GetEspecialidades();
  }
  obtenerListaConsultorios(){
    this.listaConsultorios$ = this._consultorioService.GetConsultorio();
  }
  abrirModalCrearConsultorio(){
    this._modalCrear.show();
  }
  abrirModalEditarConsultorio(uuid:string){
    this._modalEditar.show()
    this._consultorioService.GetConsultorioId(uuid).subscribe({
      next:(res) =>{
        this.formEditarConsultorio.get('IdConsultorioEditar')?.setValue(res.ID_consultorio);
        this.formEditarConsultorio.get('ubicacionE')?.setValue(res.ubicacion);
        this.formEditarConsultorio.get('especialidadE')?.setValue(res.especialidad.ID_especialidad);
        this.obtenerDoctoresPorEspecialidad('Editar')
        this.formEditarConsultorio.get('doctorE')?.setValue(res.doctor.ID_doctor);
        this.formEditarConsultorio.get('estadoE')?.setValue( res.es_activo == true ? "1" : "0");
      },
      error: () => {

      }
    });
  }

  eliminarConsultorio(uuid : string){
    this._consultorioService.DeleteConsultorio(uuid).subscribe( {
      next: (res) => {
        console.log(res)
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Consultorio eliminado Correctamente.</p>`,
            icon: 'success',          
          })
          this.obtenerListaConsultorios();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>No se puedo eliminar el doctor</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    });

  }

  obtenerDoctoresPorEspecialidad(tipoComando : string){
    let valorEspecialidadSelected = '';
    if(tipoComando === 'Crear'){
      valorEspecialidadSelected = this.formCrearConsultorio.get('especialidadC')?.value
    }else{
      valorEspecialidadSelected = this.formEditarConsultorio.get('especialidadE')?.value
    }
    this._doctorService.GetDoctoresPorEspecialidad(valorEspecialidadSelected).subscribe({
      next : (response : NestResponse | Doctor[]) => {
        console.log(response)
        if( 'status' in response ){
          if(response.status == 404){
            Swal.fire({
              title: 'Error',          
              html: `<p>${response.message}</p>`,
              icon: 'error',          
            });
            this.formCrearConsultorio.get('doctorC')?.disable();
            return;
          }
        }else{
          this.listaDoctores = response;
          this.formCrearConsultorio.get('doctorC')?.enable();
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
        this.formCrearConsultorio.get('doctorC')?.disable();
      }
    })
  }
  crearConsultorio(){

      let newConsultorio  = {
        ubicacion: this.formCrearConsultorio.get('ubicacionC')?.value,
        id_doctor : this.formCrearConsultorio.get('doctorC')?.value,
        id_especialidad : this.formCrearConsultorio.get('especialidadC')?.value,
      }
      console.log(newConsultorio)
      //crear consultorio
      this._consultorioService.PostCrearConsultorio(newConsultorio).subscribe({  
        next : (response : Consultorio | NestResponse ) => {
          console.log(response)
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
            Swal.fire({
              title: 'Exito',          
              html: `<p>Consultorio Registrado Correctamente.</p>`,
              icon: 'success',          
            })
            this._modalCrear.hide();
            this.obtenerListaConsultorios();
            this.formCrearConsultorio.reset();
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
          this.formCrearConsultorio.reset();
        },
        complete: ()=>{
         
        }
      });

  }

  editarConsultorio(){
    let uuidConsultorioEditar = this.formEditarConsultorio.get('IdConsultorioEditar')?.value;
    let editConsultorio  = {      
      ubicacion: this.formEditarConsultorio.get('ubicacionE')?.value,
      id_doctor : this.formEditarConsultorio.get('doctorE')?.value ,   
      id_especialidad: this.formEditarConsultorio.get('especialidadE')?.value,
      es_activo: this.formEditarConsultorio.get('estadoE')?.value == "1" ? true : false,
    }
    this._consultorioService.PatchEditarConsultorio(uuidConsultorioEditar,editConsultorio).subscribe({
      next : (response : Consultorio | NestResponse ) => {
        console.log(response)
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
          Swal.fire({
            title: 'Exito',          
            html: `<p>Consultorio Editado Correctamente.</p>`,
            icon: 'success',          
          })
          this._modalCrear.hide();
          this.obtenerListaConsultorios();
          this.formEditarConsultorio.reset();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al editar el consultorio</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    })
  }


  obtenerFormCrearConsultorioError(field: string): string {
    return getFieldStatus(field,this.formCrearConsultorio)
  }

  obtenerFormEditarConsultorioError(field: string): string {
    return getFieldStatus(field,this.formEditarConsultorio)
  }


 }
