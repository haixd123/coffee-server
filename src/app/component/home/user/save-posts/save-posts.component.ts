import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchModelEntity} from '../../../admin/search-model-entiry';
import {Api} from '../../../../services/api';

@Component({
  selector: 'app-save-posts',
  templateUrl: './save-posts.component.html',
  styleUrls: ['./save-posts.component.scss']
})
export class SavePostsComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();

  dataDetailPost = [];
  dataSavePost = [];
  total: number;
  p = 1; // Trang hiện tại
  PostsId: any;
  savePostsUserId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: Api,

  ) {
    this.handleSearch();
    this.savePostsUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
  }

  async handleUpdate(searchModel: SearchModelEntity, reset = false) {


    await this.api.getListSavePosts(this.searchModel).toPromise().then((data: any) => {
      for (const i of data.data) {
        if (i.userId == this.savePostsUserId) {
          this.dataSavePost.push(i.postId);
        }
      }
      // console.log('this.dataSavePost: ', this.dataSavePost);
      this.total = data.optional;
    });

    await this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      for (const i of data.data) {
        for (const item of this.dataSavePost) {
          if (i.id == item) {
            this.dataDetailPost.push(i);
          }
        }
      }
      // this.dataDetailPost = data.data;
      this.total = this.dataSavePost.length;
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
    localStorage.setItem('postsCategory', item.category);

    // setTimeout(() => {
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }

}
