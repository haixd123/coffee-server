import {Injectable} from '@angular/core';
import {IdService} from './id.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor(
    private idService: IdService,
  ) { }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getRowIndex(index, pageIndex, pageSize) {
    return index + 1 + pageSize * (pageIndex - 1);
  }
  guidGenerator() {
    return this.idService.generate();
  }

  _keyPressPercent(event: any, checkLengthAfterDot = false) {
    const inputValue = (event.target as HTMLInputElement).value;
    const pattern = /^[0-9]*\.?[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (checkLengthAfterDot === true && inputValue.includes('.') && inputValue.split('.')[1].length >= 2) {
      event.preventDefault();
    }
  }
}
