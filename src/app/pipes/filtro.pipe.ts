import { Pipe, PipeTransform } from '@angular/core';
import { note } from '../model/note';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(data: note[], title: string): note[] {
    if (title.length == 0) { return data; }
    title = title.toLocaleLowerCase();
    return data.filter((data) => {
      if (data.title.includes(title)) {
        return data.title.includes(title);
      }
    });

  }

}
