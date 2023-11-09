import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../admin/search-model-entiry';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;

  searchCoffee: any;

  infoUser: any;

  data: any[];
  total: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.formSearch = this.fb.group({
      name: null
    }, {});


    this.infoUser = JSON.parse(localStorage.getItem('user'));
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    // this.formSearch.get('name').setValue(this.formSearch.get('nameSearch').value);
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  handleSearchInput() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 50;
    // this.searchCoffee = this.formSearch.get('name').value;
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.http.post('http://localhost:8080/api/coffee/search', this.searchModel).toPromise().then((data: any) => {
      this.searchCoffee = data.data;
      // console.log('data search coffee | home: ', this.searchCoffee);
      // this.total = data.optional;
    });
  }

}
