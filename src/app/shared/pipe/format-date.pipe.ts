import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class FormatDatePipe extends DatePipe implements PipeTransform {
  constructor() {
    super('en-US');
  }
  transform(value: any, args?: any): any {
    return super.transform(value, args ? args : 'dd/MM/yyyy');
  }
}
