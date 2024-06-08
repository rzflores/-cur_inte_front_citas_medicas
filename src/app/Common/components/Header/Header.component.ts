import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedService } from '../../api/Shared.service';
import { UsuarioLogin } from '../../models/UsuarioLogin.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.css',
  providers: [ SharedService  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  public usuarioLogin! : UsuarioLogin;
  constructor(
    private _sharedService: SharedService,
  ) {
  }

  obtenerUsuarioLogeado(){
    this.usuarioLogin =  this._sharedService.obtenerUsuarioLogin()!

  }
  

 }
