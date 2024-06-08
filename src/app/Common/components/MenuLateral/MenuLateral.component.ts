import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './MenuLateral.component.html',
  styleUrl: './MenuLateral.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLateralComponent { }
