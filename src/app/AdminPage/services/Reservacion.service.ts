import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservacion } from '../../Common/models/Reservacion.model';
import { NestResponse } from '../../Common/models/NestResponse.model';

@Injectable()
export class ReservacionService {
  private readonly url =  environment.apiUrl +"/v1/api/reservacion";
  constructor(
    private _httpClient : HttpClient,  
  ) { }
  GetReservaciones(uuidUsuario : string) : Observable<Reservacion[]>{
    return this._httpClient.post<Reservacion[]>(`${this.url}/filter/${uuidUsuario}`,{})
  }

  PostCrearReservacion(reservacion : any) : Observable<Reservacion|NestResponse>{
    return this._httpClient.post<Reservacion|NestResponse>(this.url,reservacion)
  }


  PostObtenerReservacionPorPaciente(uuidPaciente : any) :  Observable<Reservacion[]>{
    return this._httpClient.post<Reservacion[]>(`${this.url}/paciente/${uuidPaciente}`,{})
  }

  PostChangeStateReservacion(uuidReservacion:string) :  Observable<Reservacion>{
    return this._httpClient.post<Reservacion>(`${this.url}/changeState/${uuidReservacion}`,{})
  }
}
