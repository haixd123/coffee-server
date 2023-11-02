import {Component, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formAdd: FormGroup;

  isReplyComment = false;
  isLike = true;
  isLike0 = false;
  isLikeNumber: number;
  postsId: number;

  dataPosts: any[];
  dataLikePosts: any[];

  idPostsDetail: string;
  idUser: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formAdd = this.fb.group({
      userId: null,
      postId: null,
      isLikeNumber: null,
      contentCoffee: null,
      commentText: null
    });

    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 30;

    this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      this.dataPosts = data.data;
      console.log('this.dataPosts | posts-detail: ', this.dataPosts);
    });
    // localStorage.setItem('postsId', String(82));
    this.idPostsDetail = localStorage.getItem('postsId');
    this.idUser = JSON.parse(localStorage.getItem('user')).id;


    this.http.post('http://localhost:8080/api/LikePosts/search', this.searchModel).toPromise().then((data: any) => {
      this.dataLikePosts = data.data;
      console.log('this.dataLikePosts | posts-detail: ', data.data);
    });
  }

  ngOnInit(): void {
  }

  handleReplyComment() {
    this.isReplyComment = !this.isReplyComment;
  }

  handleLike() {
    this.isLike = true;
    this.isLike0 = true;
    this.formAdd = this.fb.group({
      userId: JSON.parse(localStorage.getItem('user')).id,
      postId: localStorage.getItem('postsId'),
      isLike: 1
    }, {});
    this.http.post('http://localhost:8080/api/LikePosts/update', this.formAdd.value).subscribe(res => {
      console.log('res | posts-detail: ', res);
    });

  }

  // this.infoUser = JSON.parse(localStorage.getItem('user'));
  handleUnLike() {
    this.isLike0 = false;
    this.isLike = false;
    this.formAdd = this.fb.group({
      userId: JSON.parse(localStorage.getItem('user')).id,
      postId: localStorage.getItem('postsId'),
      isLike: 0
    });
    this.http.post('http://localhost:8080/api/LikePosts/update', this.formAdd.value).subscribe(res => {
      console.log('res | posts-detail: ', res);
    });
  }

  handleComment(value: any) {
    console.log('value: ', value);
  }

  handleSubmitComment() {
    this.formAdd = this.fb.group({
      userId: JSON.parse(localStorage.getItem('user')).id,
      postId: localStorage.getItem('postsId'),
      commentText: this.formAdd.get('commentText').value,
    }, {});
    // this.formAdd.get('commentText').setValue(this.formAdd.get('commentText').value);
    this.http.post('http://localhost:8080/api/comment/create', this.formAdd.value).subscribe(res => {
      console.log('res | comment/create | posts-detail: ', res);
    });
  }
}
