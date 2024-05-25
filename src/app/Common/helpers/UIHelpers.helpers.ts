import { FormGroup } from "@angular/forms";


export const getFieldStatus = (field: string , myForm: FormGroup<any> ): string =>  {
    const control = myForm.get(field);
    if (control?.invalid && (control?.dirty || control?.touched)) {
      return 'Invalid';
    } else if (control?.valid) {
      return 'Valid';
    } else {
      return 'Untouched';
    }
  }