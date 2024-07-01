import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultorio } from '../../Common/models/Consultorio.model';
import { NestResponse } from '../../Common/models/NestResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {
  private readonly url = "http://localhost:3000/v1/api/consultorio";
  constructor(
    private _httpClient : HttpClient,  
  ) { }

  GetConsultorio() : Observable<Consultorio[]>{
    return this._httpClient.get<Consultorio[]>(this.url)
  }

  PostCrearConsultorio(doctor : any) : Observable<Consultorio>{
    return this._httpClient.post<Consultorio>(this.url,doctor)
  }
  GetConsultorioId(uuid : string): Observable<Consultorio>{
    return this._httpClient.get<Consultorio>(`${this.url}/${uuid}`)
  }
  PatchEditarConsultorio(uuid:string,consultorio:any) : Observable<Consultorio>{
    return this._httpClient.patch<Consultorio>(`${this.url}/${uuid}`,consultorio)
  }
  DeleteConsultorio(uuid : string): Observable<boolean>{
    return this._httpClient.delete<boolean>(`${this.url}/${uuid}`)
  }
  PostConsultorioPorDoctor(uuid : string): Observable<Consultorio>{
    return this._httpClient.post<Consultorio>(`${this.url}/doctor/${uuid}`,'')
  }
}
