import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Emfermera } from '../../../Common/models/Emfermera.model';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmfermeraService } from '../../services/Emfermera.service';
import Swal from 'sweetalert2';
import { ClassValidatorResponse } from '../../../Common/models/ClassValidatorResponse.model';
declare var bootstrap: any; 
@Component({
  selector: 'app-emfermera',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers : [  EmfermeraService ],
  templateUrl: './Emfermera.component.html',
  styleUrl: './Emfermera.component.css',
})
export class EmfermeraComponent { 
  listaEmfermeras$ : Observable<Emfermera[]> = of([]);
  private _emfermeraService = inject(EmfermeraService);

  formCrearEmfermera: FormGroup ;
  formEditarEmfermera : FormGroup ;


  private _modalCrearElement : any ;
  private _modalCrear : any ;
  private _modalEditarElement : any ;
  private _modalEditar : any ;
  
  constructor(
    private _formBuilder: FormBuilder,

  ) {
    this.formCrearEmfermera = this._formBuilder.group({
      nombresC: ['', [Validators.required]],
      apellidosC: ['', [Validators.required]],
    });

    this.formEditarEmfermera = this._formBuilder.group({
      IdEmfermeraEditar: ['', [Validators.required]],
      nombresE: ['', [Validators.required]],
      apellidosE: ['', [Validators.required]],
    });


   }

  ngOnInit(): void {
    this.obtenerListaEmfermeras();
    this._modalCrearElement = document.getElementById('modalCrear');
    this._modalCrear = new bootstrap.Modal(this._modalCrearElement);
    this._modalEditarElement = document.getElementById('modalEditar');
    this._modalEditar = new bootstrap.Modal(this._modalEditarElement);
  }

  obtenerListaEmfermeras(){
    this.listaEmfermeras$ = this._emfermeraService.GetEmfemeras();
  }

  abrirModalCrearEmfermera(){
    this._modalCrear.show();
  }

  abrirModalEditarEmfermera(uuid:string){
    this._modalEditar.show()
    this._emfermeraService.GetEmfermeraId(uuid).subscribe({
      next:(res) =>{
        this.formEditarEmfermera.get('IdEmfermeraEditar')?.setValue(res.ID_emfermera);
        this.formEditarEmfermera.get('nombresE')?.setValue(res.nombres);
        this.formEditarEmfermera.get('apellidosE')?.setValue(res.apellidos);
      },
      error: () => {

      }
    });


  }

  crearEmfermera(){
      let newEmfermera  = {
        nombres: this.formCrearEmfermera.get('nombresC')?.value,
        apellidos : this.formCrearEmfermera.get('apellidosC')?.value ,        
      }
      console.log(newEmfermera)
      //crear especialidad
      this._emfermeraService.PostCrearEmfermera(newEmfermera).subscribe({  
        next : (response : Emfermera) => {
          this._modalCrear.hide();
          Swal.fire({
              title: 'Exito',          
              html: `<p>Emfermera Registrada Correctamente.</p>`,
              icon: 'success',          
            })
            this.obtenerListaEmfermeras();  
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
              html: '<p>Error al registrar Emfermera</b></p>',
              icon: 'error',          
            });
          }
        },
        complete: ()=>{
          this.formCrearEmfermera.reset();
      
        }
      });

  }


  eliminarEmfermera(uuid : string){
    this._emfermeraService.DeleteEmfermera(uuid).subscribe( {
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Emfermera eliminada Correctamente.</p>`,
            icon: 'success',          
          })
          this.obtenerListaEmfermeras();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al eliminar Emfermera</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    });

  }


  editarEmfermera(){

    let uuidEspecialidadEditar = this.formEditarEmfermera.get('IdEmfermeraEditar')?.value;
    let editEspecialidad  = {      
      nombres: this.formEditarEmfermera.get('nombresE')?.value,
      apellidos : this.formEditarEmfermera.get('apellidosE')?.value ,   
    }
    console.log(editEspecialidad)

    this._emfermeraService.PatchEditarEmfermera(uuidEspecialidadEditar,editEspecialidad).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Emfermera editada Correctamente.</p>`,
            icon: 'success',          
          })
          this._modalEditar.hide();
          this.obtenerListaEmfermeras();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al editar Emfermera</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    })
  }


}
