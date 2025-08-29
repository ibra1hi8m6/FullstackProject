import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


export async function saveCategoryIngredientAsync(
  form: any,
  service: CategoryIngredientService
): Promise<void> {
  try {
    const formData = form;
    if (!formData.nameEnglish || !formData.nameArabic || formData.status === null) {
      console.error('Form is missing required fields!');
      return;
    }
    const response = await firstValueFrom(service.addCategoryIngredient(formData));
    console.log('Saved successfully!', response);
    
  } catch (err) {
    console.error('Error saving data:', err);
  }
}
