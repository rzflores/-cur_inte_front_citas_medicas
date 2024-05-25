import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paciente-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './PacientePage.component.html',
  styleUrl: './PacientePage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacientePageComponent { }
