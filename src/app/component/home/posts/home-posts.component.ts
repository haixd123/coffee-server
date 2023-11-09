import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchModelEntity} from '../../admin/search-model-entiry';

@Component({
  selector: 'app-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss']
})
export class HomePostsComponent implements OnInit {

  searchModel: SearchModelEntity = new SearchModelEntity();
  total: number;

  PostsId: any;
  data: any[];
  curPage: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.search();
  }

  ngOnInit(): void {
  }

  update(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
      console.log('data.post: ', data);
    });
  }

  search() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 15;
    this.update(this.searchModel, true);
  }

  PostsDetail(item: any) {
    this.PostsId = item.id;
    localStorage.setItem('postsId', item.id);
    // setTimeout(() => {
    this.router.navigate(['/home/detail/posts']);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 15;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.update(this.searchModel, false);

  }
}
