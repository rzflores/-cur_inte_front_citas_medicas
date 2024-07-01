import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../Common/models/Doctor.model';
import { Observable } from 'rxjs';
import { NestResponse } from '../../Common/models/NestResponse.model';
import { environment } from '../../../environments/environment';

@Injectable(
)
export class DoctorService {
  private readonly url = environment.apiUrl + "/v1/api/doctor";
  constructor(
    private _httpClient : HttpClient,  
  ) { }


  GetDoctores() : Observable<Doctor[]>{
    return this._httpClient.get<Doctor[]>(this.url)
  }

  PostCrearDoctor(doctor : any) : Observable<Doctor>{
    return this._httpClient.post<Doctor>(this.url,doctor)
  }
  GetDoctorId(uuid : string): Observable<Doctor>{
    return this._httpClient.get<Doctor>(`${this.url}/${uuid}`)
  }
  PatchEditarDoctor(uuid:string,doctor:any) : Observable<boolean>{
    return this._httpClient.patch<boolean>(`${this.url}/${uuid}`,doctor)
  }
  DeleteDoctor(uuid : string): Observable<boolean>{
    return this._httpClient.delete<boolean>(`${this.url}/${uuid}`)
  }

  GetDoctoresPorEspecialidad(uuid:string): Observable< NestResponse | Doctor[]>{
    return this._httpClient.post<NestResponse | Doctor[]>(`${this.url}/especialidad/${uuid}`,{})
  }
}
