import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) {
      // replace with default image
      return null;
    }
    return `${environment.API_URL}${value}`;
  }

}
