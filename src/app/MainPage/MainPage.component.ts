import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './MainPage.component.html',
  styleUrl: './MainPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent { 


  
}
