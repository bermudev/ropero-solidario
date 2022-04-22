import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Pipe({
  name: 'catname',
})
export class CatnamePipe implements PipeTransform {
  transform(categoryID: number, categoriesList: Category[]): unknown {
    const category = categoriesList.find((d) => d.id === categoryID);
    return category?.name;
  }
}
