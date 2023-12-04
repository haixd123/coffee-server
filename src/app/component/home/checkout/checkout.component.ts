import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItem: any;
  totalQuantity = 0;
  totalPrice = 0;

  constructor() {
  }

  radioValue = 'A';


  ngOnInit(): void {
    this.cartItem = JSON.parse(localStorage.getItem('cartItems'));
    for (const item of this.cartItem) {
      this.totalQuantity += item.quantity;
      this.totalPrice += (item.price - item.price * item.discount / 100) * item.quantity;
    }
    console.log('this.cartItem: ', this.cartItem);
    console.log('this.totalQuantity: ', this.totalQuantity);
  }

}
