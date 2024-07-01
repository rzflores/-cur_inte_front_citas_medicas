import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../../Common/models/Rol.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RolService {
  private readonly url =  environment.apiUrl + "/v1/api/rol";

  constructor(
    private _httpClient : HttpClient,  
  ) { }

  GetRoles() : Observable<Rol[]>{
    return this._httpClient.get<Rol[]>(this.url)
  }
}
