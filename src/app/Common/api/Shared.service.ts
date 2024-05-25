import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioLogin } from '../models/UsuarioLogin.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private usuarioLoginSubject: BehaviorSubject<UsuarioLogin | null>;
  public usuarioLogin$: Observable<UsuarioLogin | null>;


  constructor() { 
    this.usuarioLoginSubject = new BehaviorSubject<UsuarioLogin|null>(null); // Valor inicial
    this.usuarioLogin$ = this.usuarioLoginSubject.asObservable();
  }

  actualizarUsuarioLogin(newValue: UsuarioLogin | null): void {
    this.usuarioLoginSubject.next(newValue);
  }

  obtenerUsuarioLogin(): UsuarioLogin | null {
    return this.usuarioLoginSubject.value;
  }


}
