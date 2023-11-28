import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {
  transform(list: any[], column: string, isSort: boolean): any {
    return list.sort((a: any, b: any) => {
      if (isSort) {
        if (a[column] > b[column]) {
          return 1;
        }
        if (a[column] < b[column]) {
          return -1;
        }
        return 0;
      }
      if (!isSort) {
        if (a[column] > b[column]) {
          return -1;
        }
        if (a[column] < b[column]) {
          return 1;
        }
        return 0;
      }
    });
  }
}
