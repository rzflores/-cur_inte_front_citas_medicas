import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../../Common/models/Especialidad.model';

@Injectable(
)
export class EspecialidadService {
  private readonly url = "http://localhost:3000/v1/api/especialidad";

  constructor(
    private _httpClient : HttpClient,  
  ) { }

  GetEspecialidades() : Observable<Especialidad[]>{
    return this._httpClient.get<Especialidad[]>(this.url)
  }
  PostCrearEspecialidad(especialidad : any) : Observable<Especialidad>{
    return this._httpClient.post<Especialidad>(this.url,especialidad)
  }
  GetEspecialidadId(uuid : string): Observable<Especialidad>{
    return this._httpClient.get<Especialidad>(`${this.url}/${uuid}`)
  }
  PatchEditarEspecialidad(uuid:string,especialidad:any) : Observable<boolean>{
    console.log(uuid)
    return this._httpClient.patch<boolean>(`${this.url}/${uuid}`,especialidad)
  }
  DeleteEspecialidad(uuid : string): Observable<boolean>{
    return this._httpClient.delete<boolean>(`${this.url}/${uuid}`)
  }
}
