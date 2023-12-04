import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], searchValue: string): any {
    if (!list || !searchValue) {
      return list;
    }
    return list.filter(item => {
      return item.userName?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          // || item.email?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          || item.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          || item.phoneNumber?.toString().includes(searchValue)
          || item.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }
    );

  }
}
