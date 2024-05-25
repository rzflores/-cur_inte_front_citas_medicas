import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NestResponse } from '../../Common/models/NestResponse.model';

@Injectable()
export class PacienteService {


  private readonly url = "http://localhost:3000/v1/api/paciente";

  constructor(
    private _httpClient : HttpClient,    
  ) {  }

  PostCrearPaciente(paciente : any) : Observable<any>{
    return this._httpClient.post<any>(this.url,paciente)
  }
  

}
