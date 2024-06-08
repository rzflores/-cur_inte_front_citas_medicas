import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../../Common/models/Rol.model';
import { Observable } from 'rxjs';

@Injectable()
export class RolService {
  private readonly url = "http://localhost:3000/v1/api/rol";

  constructor(
    private _httpClient : HttpClient,  
  ) { }

  GetRoles() : Observable<Rol[]>{
    return this._httpClient.get<Rol[]>(this.url)
  }
}
