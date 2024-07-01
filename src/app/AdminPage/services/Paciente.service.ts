import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NestResponse } from '../../Common/models/NestResponse.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PacienteService {


  private readonly url = environment.apiUrl + "/v1/api/paciente";

  constructor(
    private _httpClient : HttpClient,    
  ) {  }

  PostCrearPaciente(paciente : any) : Observable<any>{
    return this._httpClient.post<any>(this.url,paciente)
  }
  

}
