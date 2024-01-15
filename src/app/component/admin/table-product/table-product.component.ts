import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {Api} from '../../../services/api';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent implements OnInit {
  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;

  data: any[];
  dataEdit: any;
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;

  searchValue: string;
  sortValue: string;
  isSort = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
    private api: Api,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      name: null,
      sortPriceDown: null,
      sortPriceUp: null,
      sortDiscountDown: null,
      sortDiscountUp: null,
      sortRemainingDown: null,
      sortRemainingUp: null,
    });
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api.getListProduct(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    if (this.formSearch.get('name').value == '') {
      this.formSearch.get('name').setValue(null);
    }
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, false);
  }

  handleAdd() {
    this.isAdd = true;
  }

  handleEdit(item: any) {
    console.log('item: ', item)
    this.isEdit = true;
    this.dataEdit = item;
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      this.changePage();
    }
  }
  handleDelete(item: any) {
    this.api.deleteProduct(item).subscribe((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa sản phẩm thành công');
        this.isEdit = false;
      } else {
        this.notificationService.showMessage('error', 'Xóa sản phẩm thất bại');
        this.isEdit = false;
      }
      this.changePage();
    });
  }

  handlePriceSort() {
    if (this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(0);
      this.formSearch.get('sortPriceUp').setValue(1);
      this.formSearch.get('sortDiscountDown').setValue(0);
      this.formSearch.get('sortDiscountUp').setValue(0);
      this.formSearch.get('sortRemainingDown').setValue(0);
      this.formSearch.get('sortRemainingUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    if (!this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(1);
      this.formSearch.get('sortPriceUp').setValue(0);
      this.formSearch.get('sortDiscountDown').setValue(0);
      this.formSearch.get('sortDiscountUp').setValue(0);
      this.formSearch.get('sortRemainingDown').setValue(0);
      this.formSearch.get('sortRemainingUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    // this.sortValue = value;
    // this.isSort = !this.isSort;
  }

  handleDiscountSort() {
    if (this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(0);
      this.formSearch.get('sortPriceUp').setValue(0);
      this.formSearch.get('sortDiscountDown').setValue(0);
      this.formSearch.get('sortDiscountUp').setValue(1);
      this.formSearch.get('sortRemainingDown').setValue(0);
      this.formSearch.get('sortRemainingUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    if (!this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(0);
      this.formSearch.get('sortPriceUp').setValue(0);
      this.formSearch.get('sortDiscountDown').setValue(1);
      this.formSearch.get('sortDiscountUp').setValue(0);
      this.formSearch.get('sortRemainingDown').setValue(0);
      this.formSearch.get('sortRemainingUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
  }

  handleRemainingSort() {
    if (this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(0);
      this.formSearch.get('sortPriceUp').setValue(0);
      this.formSearch.get('sortDiscountDown').setValue(0);
      this.formSearch.get('sortDiscountUp').setValue(0);
      this.formSearch.get('sortRemainingDown').setValue(0);
      this.formSearch.get('sortRemainingUp').setValue(1);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    if (!this.isSort) {
      this.formSearch.get('sortPriceDown').setValue(0);
      this.formSearch.get('sortPriceUp').setValue(0);
      this.formSearch.get('sortDiscountDown').setValue(0);
      this.formSearch.get('sortDiscountUp').setValue(0);
      this.formSearch.get('sortRemainingDown').setValue(1);
      this.formSearch.get('sortRemainingUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListProduct(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
  }

}
