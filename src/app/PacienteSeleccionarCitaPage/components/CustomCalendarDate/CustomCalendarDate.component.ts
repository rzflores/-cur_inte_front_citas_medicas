import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  esp: {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Juni', 'Juli', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
};

@Injectable()
export class I18n {
	language = 'esp';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	private _i18n = inject(I18n);

	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES['esp'].weekdays[weekday - 1];
	}
	// getWeekLabel(): string {
	// 	return 'sem';
	// }
	getMonthShortName(month: number): string {
		return I18N_VALUES['esp'].months[month - 1];
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}

@Component({
  selector: 'app-custom-calendar-date',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  templateUrl: './CustomCalendarDate.component.html',
  styleUrl: './CustomCalendarDate.component.css',
})
export class CustomCalendarDateComponent {
  
  today = inject(NgbCalendar).getToday();
	model: NgbDateStruct;
	date: { year: number; month: number };

  constructor() {
    const todayNew = new Date();
    this.model = { ...this.today };
    this.date = { year: todayNew.getFullYear(), month: todayNew.getMonth() + 1 };
    
  }

  
 }
