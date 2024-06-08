import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RolService } from '../../services/Rol.service';
import { Rol } from '../../../Common/models/Rol.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Rol.component.html',
  styleUrl: './Rol.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[ RolService ]
})
export class RolComponent implements OnInit {
  listaRoles$ : Observable<Rol[]> = of([]);

  private _rolService = inject(RolService);
  constructor(
  ) {
    
  }
  ngOnInit(): void {
    this.obtenerListaRoles();
  }

  obtenerListaRoles(){
    this.listaRoles$ = this._rolService.GetRoles();
  }

}
