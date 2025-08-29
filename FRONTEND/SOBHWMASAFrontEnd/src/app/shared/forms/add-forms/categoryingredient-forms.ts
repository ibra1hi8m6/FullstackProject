import {FormBuilder, FormGroup, Validators} from '@angular/forms';



export function createCategoryIngredientGroup(fb: FormBuilder): FormGroup {
  return fb.group({
    categoryingredientId: [null],
    nameEnglish: ['', Validators.required],
    nameArabic: ['', Validators.required],
    status: [null]
  });
}
export interface CategoryIngredient {

  nameEnglish: string;
  nameArabic: string;
  status: boolean;
}
