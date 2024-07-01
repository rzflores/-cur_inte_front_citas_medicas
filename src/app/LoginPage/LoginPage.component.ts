import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { LoginService } from '../Common/api/Login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../Common/api/Shared.service';
import { UsuarioLogin } from '../Common/models/UsuarioLogin.model';
import { NestResponse } from '../Common/models/NestResponse.model';
import { getFieldStatus } from '../Common/helpers/UIHelpers.helpers';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,  
    RouterModule, 
    ReactiveFormsModule 
  ],
  providers: [ LoginService  ],
  templateUrl: './LoginPage.component.html',
  styleUrl: './LoginPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {


  formLogin : FormGroup ;

  private readonly _loginService = inject(LoginService) 


  constructor(
    private _formBuilder: FormBuilder,
    private _sharedService: SharedService,
    private _router: Router
  ) {

    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });

  }


ngOnInit(): void {
 
  
} 
  

logearUsuario(){
  this._loginService.PostLogin(this.formLogin.value).subscribe({
    next : (response : NestResponse | UsuarioLogin) => {
      if( 'status' in response ){
        if(response.status == 404){
          Swal.fire({
            title: 'Error',          
            html: `<p>${response.message}</p>`,
            icon: 'error',          
          });
          this.formLogin.reset();
          return;
        }
      }else{
        let usuarioLogin : UsuarioLogin = response;
        this._sharedService.actualizarUsuarioLogin(usuarioLogin);
        if(usuarioLogin.rol.nombre == "Paciente"){
          this._router.navigate(['/paciente']);
        }else{
          this._router.navigate(['/admin']);
        }
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
    }


    })
  
}

obtenerFormLoginError(field: string): string {
  return getFieldStatus(field,this.formLogin)
}


}