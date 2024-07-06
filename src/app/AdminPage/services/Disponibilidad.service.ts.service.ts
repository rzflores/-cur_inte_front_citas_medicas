import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Disponibilidad } from '../../Common/models/Disponibilidad.model';

@Injectable()
export class DisponibilidadService {
  private readonly url =  environment.apiUrl +"/v1/api/disponibilidad";
  constructor(
    private _httpClient : HttpClient,  
  ) { }

  GetDisponibilidad() : Observable<Disponibilidad[]>{
    return this._httpClient.get<Disponibilidad[]>(this.url)
  }



  
  PostDisponibilidadPorDoctor(uuid : string) : Observable<Disponibilidad[]>{
    return this._httpClient.post<Disponibilidad[]>(`${this.url}/doctor/${uuid}`,{})
  }

}
