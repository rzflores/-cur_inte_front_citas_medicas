import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Rol.component.html',
  styleUrl: './Rol.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolComponent { }
