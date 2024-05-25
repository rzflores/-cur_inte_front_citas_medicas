import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Paciente.component.html',
  styleUrl: './Paciente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacienteComponent { }
