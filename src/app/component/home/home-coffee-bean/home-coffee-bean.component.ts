import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-coffee-bean',
  templateUrl: './home-coffee-bean.component.html',
  styleUrls: ['./home-coffee-bean.component.scss']
})
export class HomeCoffeeBeanComponent implements OnInit {

  searchModel: SearchModelEntity = new SearchModelEntity();

  cofeeBeanId: any;
  data: any[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.http.post('http://localhost:8080/api/coffee/search', this.searchModel).toPromise().then((data: any) => {
      console.log('1: ', data);
      this.data = data.data;
      // this.total = data.optional;
    });
  }

  ngOnInit(): void {
  }

  updatecofeeBeanId(item: any) {
    this.cofeeBeanId = item.id;
    localStorage.setItem('cofeeBeanId', item.id);
    // setTimeout(() => {
    this.router.navigate(['/home/coffee-bean/detail']);
    // }, 100);
    // this.router.navigate(['/home/test']);
  }

}
