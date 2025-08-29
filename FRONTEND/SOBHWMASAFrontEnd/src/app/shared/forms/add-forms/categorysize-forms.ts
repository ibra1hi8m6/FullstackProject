import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export function createCategorySizeForm(fb: FormBuilder): FormGroup {

  return fb.group({


    nameEnglish: [Validators.required],
    nameArabic: [Validators.required],
    status: [true, Validators.required],
    
  })
}
