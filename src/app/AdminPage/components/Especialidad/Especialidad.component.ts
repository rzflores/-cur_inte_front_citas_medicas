import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Especialidad.component.html',
  styleUrl: './Especialidad.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EspecialidadComponent { }
