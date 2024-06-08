import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario.model';
import { NestResponse } from '../models/NestResponse.model';
import { ClassValidatorResponse } from '../models/ClassValidatorResponse.model';

@Injectable()
export class UsuarioService {

  private readonly url = "http://localhost:3000/v1/api/usuario";

  constructor(
    private _httpClient : HttpClient,    
  ) { }

  PostBuscarPorTermino(nrodoc : string , email : string) : Observable<boolean> {
    let queryUrl = `${this.url}/busqueda-termino?nrodoc=${nrodoc}&email=${email}`
    return this._httpClient.post<boolean>(queryUrl,{});
  }

  PostCrearUsuario(usuario : any) : Observable<Usuario>{
    return this._httpClient.post<Usuario>(this.url,usuario)
  }

  GetUsuario(): Observable<Usuario[]>{
    return this._httpClient.get<Usuario[]>(this.url)
  }
  GetUsuarioId(uuid : string): Observable<Usuario>{
    return this._httpClient.get<Usuario>(`${this.url}/${uuid}`)
  }
  PatchEditarUsuario(uuid:string,usuario:any) : Observable<boolean>{
    return this._httpClient.patch<boolean>(`${this.url}/${uuid}`,usuario)
  }
  DeleteUsuario(uuid : string): Observable<boolean>{
    return this._httpClient.delete<boolean>(`${this.url}/${uuid}`)
  }
  

}
