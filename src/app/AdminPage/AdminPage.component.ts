import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ 
    CommonModule,RouterModule
  ],
  templateUrl: './AdminPage.component.html',
  styleUrl: './AdminPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent { }
