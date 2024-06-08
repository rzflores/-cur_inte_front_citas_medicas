import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from '../Common/components/MenuLateral/MenuLateral.component';
import { HeaderComponent } from '../Common/components/Header/Header.component';
import { PanelPrincipalComponent } from '../Common/components/PanelPrincipal/PanelPrincipal.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule, 
    MenuLateralComponent,
    HeaderComponent,
    PanelPrincipalComponent
  ],
  templateUrl: './AdminPage.component.html',
  styleUrl: './AdminPage.component.css',
  providers: [  ]
})
export class AdminPageComponent { }
