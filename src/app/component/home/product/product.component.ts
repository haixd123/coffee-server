import {Component, OnChanges, OnInit} from '@angular/core';
import {Api} from '../../../services/api';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {ReducerService} from '../../../services/reducer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  };

  searchModel: SearchModelEntity = new SearchModelEntity();
  formUpdateQuantity: FormGroup;

  data: any[];
  isOpenDrawer = false;
  demoValue = 1;
  dataCart = [];
  dataCartLocalStorage = [];
  totalMoneyCart: number;
  found = false;
  isVisible = false;
  detailProduct: any;

  constructor(
    private api: Api,
    private fb: FormBuilder,
    private reducerService: ReducerService,
    private router: Router,
  ) {
    this.api.getListProduct(this.searchModel).subscribe((data: any) => {
      this.data = data.data;
    });

    this.formUpdateQuantity = this.fb.group({
      quantity: null,
    });
    this.formUpdateQuantity.patchValue({
      quantity: JSON.parse(localStorage.getItem('cartItems'))?.quantity,
    });
  }

  ngOnInit(): void {
  }

  addItemCart(value: any) {
    this.detailProduct = value;
    this.isVisible = false;
    console.log('value: ', value);
    this.found = false;
    const isCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (this.dataCart.length === 0 && isCartItems) {
      this.dataCart = JSON.parse(localStorage.getItem('cartItems'));
    }

    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name) {
        this.found = true;
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });

    if (!this.found) {
      value.quantity = 1;
      this.dataCart.push(value);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    // this.dataCart = JSON.parse(localStorage.getItem('cartItems'));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);
    this.isOpenDrawer = true;

  }

  minusItemCart(value: any) {
    const newList = this.dataCart.filter((item: any) => {
      return item.id !== value.id;
    });
    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    if (value.quantity == 1) {
      this.dataCart = newList;
    }

    if (this.dataCart.length == 0) {
      this.isOpenDrawer = false;
    }
    console.log('this.dataCart: ', this.dataCart);
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
  }


  plusItemCart(value: any) {
    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
  }

  removeItemCart(value: any) {
    const newList = this.dataCart.filter((item: any) => {
      return item.id !== value.id;
    });
    this.dataCart = newList;
    if (this.dataCart.length == 0) {
      this.isOpenDrawer = false;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));

  }

  open(): void {
    this.isOpenDrawer = false;
    this.router.navigate(['/home/checkout']);
  }

  close(): void {
    this.isOpenDrawer = false;
  }

  showModal(value: any): void {
    this.detailProduct = value;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
