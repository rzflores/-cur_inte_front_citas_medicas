import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EspecialidadService } from '../../services/Especialidad.service';
import { Observable, of } from 'rxjs';
import { Especialidad } from '../../../Common/models/Especialidad.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClassValidatorResponse } from '../../../Common/models/ClassValidatorResponse.model';
declare var bootstrap: any; 
@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './Especialidad.component.html',
  styleUrl: './Especialidad.component.css',
  providers: [EspecialidadService]
})
export class EspecialidadComponent {
  listaEspecialidades$ : Observable<Especialidad[]> = of([]);
  private _especialidadService = inject(EspecialidadService);

  formCrearEspecialidad : FormGroup ;
  formEditarEspecialidad : FormGroup ;


  private _modalCrearElement : any ;
  private _modalCrear : any ;
  private _modalEditarElement : any ;
  private _modalEditar : any ;
  
  constructor(
    private _formBuilder: FormBuilder,

  ) {
    this.formCrearEspecialidad = this._formBuilder.group({
      nombre_especialidadC: ['', [Validators.required]],
      precio_especialidadC: ['', [Validators.required , Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
    });

    this.formEditarEspecialidad = this._formBuilder.group({
      IdEspecialidadEditar: ['', [Validators.required]],
      nombre_especialidadE: ['', [Validators.required]],
      precio_especialidadE: ['', [Validators.required]],
      estadoE: ['', [Validators.required]],
    });


   }

  ngOnInit(): void {
    this.obtenerListaEspecialidades();
    this._modalCrearElement = document.getElementById('modalCrear');
    this._modalCrear = new bootstrap.Modal(this._modalCrearElement);
    this._modalEditarElement = document.getElementById('modalEditar');
    this._modalEditar = new bootstrap.Modal(this._modalEditarElement);
  }

  obtenerListaEspecialidades(){
    this.listaEspecialidades$ = this._especialidadService.GetEspecialidades();
  }

  abrirModalCrearEspecialidad(){
    this._modalCrear.show();
  }

  abrirModalEditarEspecialidad(uuid:string){
    this._modalEditar.show()
    this._especialidadService.GetEspecialidadId(uuid).subscribe({
      next:(res) =>{
        this.formEditarEspecialidad.get('IdEspecialidadEditar')?.setValue(res.ID_especialidad);
        this.formEditarEspecialidad.get('nombre_especialidadE')?.setValue(res.nombre_especialidad);
        this.formEditarEspecialidad.get('precio_especialidadE')?.setValue(res.precio_especialidad);
        this.formEditarEspecialidad.get('estadoE')?.setValue( res.es_activo == true ? "1" : "0");
      },
      error: () => {

      }
    });


  }

  crearEspecialidad(){
      let newEspecialidad  = {
        nombre_especialidad: this.formCrearEspecialidad.get('nombre_especialidadC')?.value,
        precio_especialidad : this.formCrearEspecialidad.get('precio_especialidadC')?.value ,        
      }
      console.log(newEspecialidad)
      //crear especialidad
      this._especialidadService.PostCrearEspecialidad(newEspecialidad).subscribe({  
        next : (response : Especialidad) => {
          this._modalCrear.hide();
          Swal.fire({
              title: 'Exito',          
              html: `<p>Especialidad Registrada Correctamente.</p>`,
              icon: 'success',          
            })
            this.obtenerListaEspecialidades();  
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
              html: '<p>Error al registrar Especialidad</b></p>',
              icon: 'error',          
            });
          }
        },
        complete: ()=>{
          this.formCrearEspecialidad.reset();
      
        }
      });

  }


  eliminarEspecialidad(uuid : string){
    this._especialidadService.DeleteEspecialidad(uuid).subscribe( {
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Especialidad eliminada Correctamente.</p>`,
            icon: 'success',          
          })
          this.obtenerListaEspecialidades();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al eliminar especialidad</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    });

  }


  editarEspecialidad(){

    let uuidEspecialidadEditar = this.formEditarEspecialidad.get('IdEspecialidadEditar')?.value;
    let editEspecialidad  = {      
      nombre_especialidad: this.formEditarEspecialidad.get('nombre_especialidadE')?.value,
      precio_especialidad : this.formEditarEspecialidad.get('precio_especialidadE')?.value ,   
      es_activo: this.formEditarEspecialidad.get('estadoE')?.value == "1" ? true : false,
    }
    console.log(editEspecialidad)

    this._especialidadService.PatchEditarEspecialidad(uuidEspecialidadEditar,editEspecialidad).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Especialidad editada Correctamente.</p>`,
            icon: 'success',          
          })
          this._modalEditar.hide();
          this.obtenerListaEspecialidades();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al editar especialidad</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    })
  }

 }
