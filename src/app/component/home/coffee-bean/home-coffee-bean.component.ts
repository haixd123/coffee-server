import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home-coffee-bean',
  templateUrl: './home-coffee-bean.component.html',
  styleUrls: ['./home-coffee-bean.component.scss']
})
export class HomeCoffeeBeanComponent implements OnInit, OnChanges {
  @Input() searchValue: any;

  formSearch: FormGroup;
  searchModel: SearchModelEntity = new SearchModelEntity();
  total: number;

  cofeeBeanId: any;
  data: any[];
  curPage: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.search();
  }

  ngOnChanges() {
    // this.formSearch = this.fb.group({
    //   name: this.searchValue[0].name,
    // }, {});
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // console.log('this.searchModel | onChanges: ', this.searchModel);

    // this.data = this.searchValue;
    this.data = Object.assign([], this.searchModel, this.searchValue);
    this.update(this.searchModel, true);

  }

  ngOnInit(): void {
  }

  updatecofeeBeanId(item: any) {
    this.cofeeBeanId = item.id;
    localStorage.setItem('cofeeBeanId', item.id);
    // setTimeout(() => {
    this.router.navigate([`/home/detail/coffee-bean`]);
    // }, 100);
    // this.router.navigate(['/home/test']);
  }

  update(searchModel: SearchModelEntity, reset: boolean) {
    this.http.post('http://localhost:8080/api/coffee/search', this.searchModel).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.optional;
      console.log('data home-coffee-bean: ', data);
    });
  }

  search() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 12;
    // this.formSearch.get('name').setValue(this.searchValue);
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch);
    console.log('this.searchModel: | coffee: ', this.searchModel);
    this.update(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 12;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // console.log('this.searchModel: ', this.searchModel);
    this.update(this.searchModel, false);

  }

}
