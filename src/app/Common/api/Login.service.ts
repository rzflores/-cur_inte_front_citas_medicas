import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NestResponse } from '../models/NestResponse.model';
import { SharedService } from './Shared.service';
import { UsuarioLogin } from '../models/UsuarioLogin.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  private readonly url = environment.apiUrl + "/v1/api/seguridad";

  constructor(
    private _httpClient : HttpClient,    
  ) { }



  PostLogin(usuarioLogin : any) : Observable<NestResponse | UsuarioLogin> {
    return this._httpClient.post<NestResponse | UsuarioLogin>(this.url, usuarioLogin );
  }

}
