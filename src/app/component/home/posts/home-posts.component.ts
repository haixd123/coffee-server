import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {ShareDataService} from '../../../services/share-data.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss']
})
export class HomePostsComponent implements OnInit, OnChanges {

  searchModel: SearchModelEntity = new SearchModelEntity();
  total: number;
  formSearch: FormGroup;
  PostsId: any;
  data: any[];
  curPage: number;
  isEditPosts = false;
  idPosts: number;


  searchCoffee: string;

  category: string;
  subscription: Subscription;

  PostIdLocalStorage: string;
  userLocalstorage: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private api: Api,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      category: null,
    });
    this.subscription = this.shareDataService.dataCategory$.subscribe((data) => {
      this.category = data;
      if (this.category) {
        this.search(this.category);
      }
      if (!this.category) {
        this.search(null);
      }
    });
    this.PostIdLocalStorage = localStorage.getItem('postsId');
    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
    console.log('userLocalstorage: ', this.userLocalstorage);

  }

  ngOnChanges() {
  }

  ngOnInit(): void {
    //???
    this.activatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log('params: ', params);
      if (this.category) {
        this.search(this.category);
      }
      if (!this.category) {
        this.search(null);
      }
    });
  }

  update(searchModel: SearchModelEntity, reset = false) {
    this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  search(value?) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 15;
    this.formSearch.get('category').setValue(value);
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.update(this.searchModel, true);
  }

  PostsDetail(item: any) {
    this.PostsId = item.id;
    localStorage.setItem('postsId', item.id);
    localStorage.setItem('postsCategory', item.category);
    this.shareDataService.sendDataCategory(item.category);
    // setTimeout(() => {
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 15;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.update(this.searchModel, false);

  }

  handleMoreBtn(item: any) {
    this.idPosts = item.id;
    this.isEditPosts = !this.isEditPosts;
  }

  editPosts(item: any) {
    this.shareDataService.sendDataEditPosts(item);
    this.router.navigate(['/home/write']);
  }

  deletePosts(item: any) {
    this.api.deletePosts(item).subscribe((data: any) => {
      console.log('data: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa đăng thành công');
      } else {
        this.notificationService.showMessage('error', 'Xóa đăng thất bại');
      }
    });
  }
}
