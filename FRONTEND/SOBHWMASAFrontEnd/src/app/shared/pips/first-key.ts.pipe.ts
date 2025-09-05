import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKeyTs',
  standalone: true
})
export class FirstKeyTsPipe implements PipeTransform {

  transform(value: any): string | null {
    if (!value || typeof value !== 'object') return null;

    const keys = Object.keys(value);
    return keys.length > 0 ? keys[0] : null;
  }

}
