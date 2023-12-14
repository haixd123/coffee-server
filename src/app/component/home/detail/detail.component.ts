import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ShareDataService} from '../../../services/share-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';
import {WebsocketService} from '../../../services/Websocket.service';

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
  dataIdPost: any;

  // categoryPostsLocalstorage: string;

  constructor(
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: Api,
    private websocketService: WebsocketService,
  ) {

    this.handleSearch();
    this.subscription = this.shareDataService.dataCategory$.subscribe((data) => {
      this.category = data;
    });
    // this.websocketService.receiveComment().subscribe((comment: any) => {
    //   this.handleSearch();
    // });

    this.idPostsLocalstorage = localStorage.getItem('postsId');
    this.category = localStorage.getItem('postsCategory');

    this.subscription = this.shareDataService.dataIdPost$.subscribe(data => {
      this.dataIdPost = data;
      localStorage.setItem('postsId', this.dataIdPost);
      this.idPostsLocalstorage = this.dataIdPost;
    });
  }

  ngOnInit(): void {
    // this.activatedRoute.url.subscribe(params => {
    //   console.log('params2: ', params);
    // });
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
