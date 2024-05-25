import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-consultorio',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Consultorio.component.html',
  styleUrl: './Consultorio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultorioComponent { }
