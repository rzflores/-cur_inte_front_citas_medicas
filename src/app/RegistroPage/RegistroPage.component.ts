import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getFieldStatus } from '../Common/helpers/UIHelpers.helpers';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../Common/api/Usuario.service';
import Swal from 'sweetalert2';
import { PacienteService } from '../AdminPage/services/Paciente.service';
import { Usuario } from '../Common/models/Usuario.model';
import { firstValueFrom } from 'rxjs';
import { NestResponse } from '../Common/models/NestResponse.model';
import { ClassValidatorResponse } from '../Common/models/ClassValidatorResponse.model';
@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './RegistroPage.component.html',
  styleUrl: './RegistroPage.component.css',
  providers: [ UsuarioService , PacienteService]
})
export class RegistroPageComponent {

  formRegistroPaciente : FormGroup ;

  private readonly _usuarioService = inject(UsuarioService) 
  private readonly _pacienteService = inject(PacienteService) 

  private readonly _idRolPaciente : string = "fe6ae855-1705-11ef-9a31-0242ac150002";

  public usuarioRegistrado!: Usuario  ;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router

  ) {
    this.formRegistroPaciente = this._formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      rol : ['',Validators.required],
      numero_documento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      celular:['', Validators.required],
    });

    
  }



  obtenerFormRegistroPacienteError(field: string): string {
    return getFieldStatus(field,this.formRegistroPaciente)
  }
  

  validarNroDocPaciente(){
        let nroDoc = this.formRegistroPaciente.get('numero_documento')?.value;
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
    let email = this.formRegistroPaciente.get('email')?.value;
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
  registrarUsuarioPaciente(){
    this.validarNroDocPaciente();
    this.validarEmailPaciente();


      let newUsuario  = {
        nombre: this.formRegistroPaciente.get('nombres')?.value,
        apellido : this.formRegistroPaciente.get('apellidos')?.value,
        email: this.formRegistroPaciente.get('email')?.value,
        contrasenia: this.formRegistroPaciente.get('contrasenia')?.value,
        celular: this.formRegistroPaciente.get('celular')?.value,
        id_rol :this.formRegistroPaciente.get('rol')?.value,
        numero_documento: this.formRegistroPaciente.get('numero_documento')?.value ,
        tipo_documento: this.formRegistroPaciente.get('tipo_documento')?.value
      }
      console.log(newUsuario)
     
      //crear usuario
      this._usuarioService.PostCrearUsuario(newUsuario).subscribe({  
        next : (response : Usuario) => {
            console.log(response)
            Swal.fire({
              title: 'Exito',          
              html: `<p>Usuario Registrado Correctamente.</p>`,
              icon: 'success',          
            }).then((result) => {
              if (result.isConfirmed) {
                this._router.navigate(['/login']);
              }
            });
           
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
          this.formRegistroPaciente.reset();
          

        }
      });

  }
 }
