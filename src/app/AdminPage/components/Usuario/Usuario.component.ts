import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Usuario.component.html',
  styleUrl: './Usuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioComponent { }
