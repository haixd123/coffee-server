import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ShareDataService} from '../../../services/share-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() postDetailCategory: any;

  searchModel: SearchModelEntity = new SearchModelEntity();

  formSearch: FormGroup;

  data: any[];
  total: number;

  category: string;
  subscription: Subscription;

  idPostsLocalstorage: string;

  // categoryPostsLocalstorage: string;

  constructor(
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: Api,
  ) {

    this.handleSearch();
    // this.subscription = this.shareDataService.dataCategory$.subscribe((data) => {
    //   this.category = data;
    // });
    this.idPostsLocalstorage = localStorage.getItem('postsId');
    this.category = localStorage.getItem('postsCategory');
  }

  // findTop5LargestNumbers(arr: number[]): number[] {
  //     arr.sort((a, b) => {
  //         return b - a;
  //     });
  //     return arr;
  // }

  // isLikeTop5() {
  //     // Replace 'data' with your actual data array
  //     this.top5 = this.findTop5LargestNumbers(this.data.map(item => item.like1)).slice(0, 5);
  //     return this.top5;
  // }

  // isSametop5(value) {
  //     const test = this.data.filter(item => value == item.hashTag);
  //     return test;
  // }


  ngOnInit(): void {
    this.activatedRoute.url.subscribe(params => {
      console.log('params2: ', params);
      // this.category = params.get('category');
      // if (this.category) {
      //   this.searchModel.pageIndex = 1;
      //   this.searchModel.pageSize = 150;
      //   this.formSearch.get('category').setValue(this.category);
      //   this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      //   this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      //     this.data = data.data;
      //     // this.total = data.optional;
      //   });
      // }
      // if (!this.category) {
      //   this.searchModel.pageIndex = 1;
      //   this.searchModel.pageSize = 150;
      //   this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      //     this.data = data.data;
      //     // this.total = data.optional;
      //   });
      // }
    });
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;
    this.handleUpdate(this.searchModel, true);
  }

  changeToDetailPosts(item) {
    localStorage.setItem('postsId', item.id);
    this.idPostsLocalstorage = item.id;
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }


}
