import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Doctor.component.html',
  styleUrl: './Doctor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorComponent { }
