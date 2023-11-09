import {Component, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  searchModel: SearchModelEntity = new SearchModelEntity();

  data: any[];
  total: number;
  PostsId: any;
  myPostsUserId: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.handleSearch();
    this.myPostsUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      console.log('dataPosts: ', this.data);
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;

    this.handleUpdate(this.searchModel, true);
  }

  PostsDetail(item: any) {
    this.PostsId = item.id;
    localStorage.setItem('postsId', item.id);
    // setTimeout(() => {
    this.router.navigate(['/home/detail/posts']);
  }

}
