import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Emfermera } from '../../Common/models/Emfermera.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmfermeraService {
  private readonly url =  environment.apiUrl +"/v1/api/emfermera";

  constructor(
    private _httpClient : HttpClient,  
  ) { }


  GetEmfemeras() : Observable<Emfermera[]>{
    return this._httpClient.get<Emfermera[]>(this.url)
  }
  PostCrearEmfermera(especialidad : any) : Observable<Emfermera>{
    return this._httpClient.post<Emfermera>(this.url,especialidad)
  }
  GetEmfermeraId(uuid : string): Observable<Emfermera>{
    return this._httpClient.get<Emfermera>(`${this.url}/${uuid}`)
  }
  PatchEditarEmfermera(uuid:string,especialidad:any) : Observable<boolean>{
    console.log(uuid)
    return this._httpClient.patch<boolean>(`${this.url}/${uuid}`,especialidad)
  }
  DeleteEmfermera(uuid : string): Observable<boolean>{
    return this._httpClient.delete<boolean>(`${this.url}/${uuid}`)
  }
}
