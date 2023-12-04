import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReducerService {
  reduceArray(data: any, quantity: number) {
    return data.reduce((accumulator, currentValue) => {
      return accumulator + (Number(currentValue.price) - Number(currentValue.price) * Number(currentValue.discount) / 100) * Number(currentValue.quantity);
    }, 0);
  }
}
