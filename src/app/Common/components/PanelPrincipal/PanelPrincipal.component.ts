import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-principal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './PanelPrincipal.component.html',
  styleUrl: './PanelPrincipal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelPrincipalComponent { }
