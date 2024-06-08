import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../../Common/models/Usuario.model';
import { UsuarioService } from '../../../Common/api/Usuario.service';
import { RolService } from '../../services/Rol.service';
import { Rol } from '../../../Common/models/Rol.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getFieldStatus } from '../../../Common/helpers/UIHelpers.helpers';
import Swal from 'sweetalert2';
import { ClassValidatorResponse } from '../../../Common/models/ClassValidatorResponse.model';

declare var bootstrap: any; 
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './Usuario.component.html',
  styleUrl: './Usuario.component.css',
  providers: [ UsuarioService  , RolService]
})
export class UsuarioComponent {
  listaUsuarios$: Observable<Usuario[]>= of([]);
  listaRoles$ : Observable<Rol[]> = of([]);

  formCrearUsuario : FormGroup ;
  formEditarUsuario : FormGroup ;

  
  private _usuarioService = inject(UsuarioService);
  private _rolService = inject(RolService);
  private _modalCrearElement : any ;
  private _modalCrear : any ;
  private _modalEditarElement : any ;
  private _modalEditar : any ;
  constructor(
    private _formBuilder: FormBuilder,

  ) {
    this.formCrearUsuario = this._formBuilder.group({
      rolC: ['', [Validators.required]],
      nombresC: ['', [Validators.required]],
      apellidosC: ['', [Validators.required]],
      tipo_documentoC: ['', [Validators.required]],
      numero_documentoC: ['', [Validators.required]],
      emailC: ['', [Validators.required, Validators.email]],
      contraseniaC: ['', Validators.required],
      celularC:['', Validators.required],
    });

    this.formEditarUsuario = this._formBuilder.group({
      IdUsuarioEditar: ['', [Validators.required]],
      rolE: ['', [Validators.required]],
      nombresE: ['', [Validators.required]],
      apellidosE: ['', [Validators.required]],
      tipo_documentoE: ['', [Validators.required]],
      numero_documentoE: ['', [Validators.required]],
      emailE: ['', [Validators.required, Validators.email]],
      contraseniaE: ['', Validators.required],
      celularE:['', Validators.required],
    });



    

  }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
    this.obtenerRoles();
    this._modalCrearElement = document.getElementById('modalCrear');
    this._modalCrear = new bootstrap.Modal(this._modalCrearElement);
    this._modalEditarElement = document.getElementById('modalEditar');
    this._modalEditar = new bootstrap.Modal(this._modalEditarElement);
  }

  obtenerListaUsuarios(){
    this.listaUsuarios$ = this._usuarioService.GetUsuario();
  }


  abrirModalCrearUsuario(){
    this._modalCrear.show();
  }

  abrirModalEditarUsuario(uuid:string){
    this._modalEditar.show()
    this._usuarioService.GetUsuarioId(uuid).subscribe({
      next:(res) =>{
        console.log(res)
        this.formEditarUsuario.get('IdUsuarioEditar')?.setValue(res.ID_usuario);
        this.formEditarUsuario.get('rolE')?.setValue(res.rol.ID_rol);
        this.formEditarUsuario.get('nombresE')?.setValue(res.nombre);
        this.formEditarUsuario.get('apellidosE')?.setValue(res.apellido);
        this.formEditarUsuario.get('tipo_documentoE')?.setValue(res.tipo_documento);
        this.formEditarUsuario.get('numero_documentoE')?.setValue(res.numero_documento);
        this.formEditarUsuario.get('emailE')?.setValue(res.email);
        this.formEditarUsuario.get('contraseniaE')?.setValue(res.contrasenia);
        this.formEditarUsuario.get('celularE')?.setValue(res.celular);
      },
      error: () => {

      }
    });


  }

  obtenerRoles(){
    this.listaRoles$ = this._rolService.GetRoles();
  }

  obtenerFormCrearUsuarioError(field: string): string {
    return getFieldStatus(field,this.formCrearUsuario)
  }

  obtenerFormEditarUsuarioError(field: string): string {
    return getFieldStatus(field,this.formEditarUsuario)
  }

  validarNroDocPaciente(){
    let nroDoc = this.formCrearUsuario.get('numero_documento')?.value;
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

  validarEmailPaciente(){
      let email = this.formCrearUsuario.get('email')?.value;
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

  validarEmailEditarUsuario(){
    let email = this.formEditarUsuario.get('emailE')?.value;
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
  validarNroDocEditarUsuario(){
    let nroDoc = this.formEditarUsuario.get('numero_documentoE')?.value;
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




  crearUsuario(){
    this.validarNroDocPaciente();
    this.validarEmailPaciente();


      let newUsuario  = {
        nombre: this.formCrearUsuario.get('nombresC')?.value,
        apellido : this.formCrearUsuario.get('apellidosC')?.value,
        email: this.formCrearUsuario.get('emailC')?.value,
        contrasenia: this.formCrearUsuario.get('contraseniaC')?.value,
        celular: this.formCrearUsuario.get('celularC')?.value,
        id_rol : this.formCrearUsuario.get('rolC')?.value,
        numero_documento: this.formCrearUsuario.get('numero_documentoC')?.value ,
        tipo_documento: this.formCrearUsuario.get('tipo_documentoC')?.value
      }
    
      //crear usuario
      this._usuarioService.PostCrearUsuario(newUsuario).subscribe({  
        next : (response : Usuario) => {
          this._modalCrear.hide();
          Swal.fire({
              title: 'Exito',          
              html: `<p>Usuario Registrado Correctamente.</p>`,
              icon: 'success',          
            })
            this.obtenerListaUsuarios();  
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
              html: '<p>Error al registrar paciente</b></p>',
              icon: 'error',          
            });
          }
        },
        complete: ()=>{
          this.formCrearUsuario.reset();
      
        }
      });

  }


  eliminarUsuario(uuid : string){
    this._usuarioService.DeleteUsuario(uuid).subscribe( {
      next: (res) => {
        console.log(res)
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Usuario eliminado Correctamente.</p>`,
            icon: 'success',          
          })
          this.obtenerListaUsuarios();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al eliminar usuario</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    });

  }


  editarUsuario(){
    // this.validarEmailEditarUsuario();
    // this.validarNroDocEditarUsuario();



    let uuidUsuarioEditar = this.formEditarUsuario.get('IdUsuarioEditar')?.value;
    let editUsuario  = {      
      nombre: this.formEditarUsuario.get('nombresE')?.value,
      apellido : this.formEditarUsuario.get('apellidosE')?.value,
      email: this.formEditarUsuario.get('emailE')?.value,
      contrasenia: this.formEditarUsuario.get('contraseniaE')?.value,
      celular: this.formEditarUsuario.get('celularE')?.value,
      id_rol : this.formEditarUsuario.get('rolE')?.value,
      numero_documento: this.formEditarUsuario.get('numero_documentoE')?.value ,
      tipo_documento: this.formEditarUsuario.get('tipo_documentoE')?.value
    }

    this._usuarioService.PatchEditarUsuario(uuidUsuarioEditar,editUsuario).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Exito',          
            html: `<p>Usuario editado Correctamente.</p>`,
            icon: 'success',          
          })
          this._modalEditar.hide();
          this.obtenerListaUsuarios();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',          
          html: '<p>Error al editar usuario</b></p>',
          icon: 'error',          
        });
      },
      complete: () => {
        
      }
    })
  }

}
