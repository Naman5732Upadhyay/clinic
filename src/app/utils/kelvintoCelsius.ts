import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius',
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(value: number|undefined): string {
    if (!value || isNaN(value) || value < 0) {
      return 'Invalid temperature';
    }
    const celsius = value - 273.15;
    return `${celsius.toFixed(2)} °C`;
  }
}