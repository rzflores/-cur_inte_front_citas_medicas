import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Reservacion.component.html',
  styleUrl: './Reservacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservacionComponent { }
