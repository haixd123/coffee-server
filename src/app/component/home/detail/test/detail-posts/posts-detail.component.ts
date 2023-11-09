import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../../../../admin/search-model-entiry';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
  export class PostsDetailComponent implements OnInit {
  @Input() PostsId: any;
  @ViewChild('textareaComment') textareaComment: ElementRef;
  @ViewChild('textareaReply') textareaReply: ElementRef;

  searchModel: SearchModelEntity = new SearchModelEntity();
  formAdd: FormGroup;
  formReply: FormGroup;

  isReplyComment = false;
  isLike = true;
  isLike0 = false;
  postsId: number;

  dataUser: any[];
  dataPosts: any[];
  dataLikePosts: any[];
  dataComment: any[];
  dataInfoUserNotification: any;

  idPostsLocalstorage: string;
  idUserLocalstorage: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formAdd = this.fb.group({
      userId: null,
      postId: null,
      isLikeNumber: null,
      contentCoffee: null,
      commentText: null,
      commentReplyText: null
    });
    this.formReply = this.fb.group({
      name: null
    });
    this.handleSearch();

    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
    this.idPostsLocalstorage = localStorage.getItem('postsId');
  }

  ngOnInit(): void {
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 300;

    this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      this.dataUser = data.data;
    });

    this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      this.dataPosts = data.data;
      console.log('this.dataPost | posts detail: ', this.dataPosts);
    });

    this.http.post('http://localhost:8080/api/LikePosts/search', this.searchModel).toPromise().then((data: any) => {
      this.dataLikePosts = data.data;
    });

    this.http.post('http://localhost:8080/api/comment/search', this.searchModel).toPromise().then((data: any) => {
      this.dataComment = data.data;
      console.log('dataComment: ', data.data);
    });
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
      console.log('res: ', res);
    });
  }

  handleUnLike() {
    this.isLike0 = false;
    this.isLike = false;
    this.formAdd = this.fb.group({
      userId: JSON.parse(localStorage.getItem('user')).id,
      postId: localStorage.getItem('postsId'),
      isLike: 0
    });
    this.http.post('http://localhost:8080/api/LikePosts/update', this.formAdd.value).subscribe(res => {
    });
  }

  handleSubmitComment() {
    this.formAdd = this.fb.group({
      userId: JSON.parse(localStorage.getItem('user')).id,
      postId: localStorage.getItem('postsId'),
      commentText: this.formAdd.get('commentText').value ? this.formAdd.get('commentText').value : this.formAdd.get('commentReplyText').value,
    }, {});
    // this.formAdd.get('commentText').setValue(this.formAdd.get('commentText').value);
    this.http.post('http://localhost:8080/api/comment/create', this.formAdd.value).subscribe(res => {
      console.log('res | comment/create | posts-detail: ', res);
    });
    this.isReplyComment = false;
    this.formAdd.reset();
    setTimeout(() => {
      this.handleSearch();
    }, 500);
  }

  handleReplyComment(itemUser: any) {
    this.isReplyComment = !this.isReplyComment;
    console.log('item: ', itemUser);
    this.dataInfoUserNotification = itemUser;
    //???
    if (!!this.isReplyComment) {
      this.focusTextAriaReplyComment();
    }
  }

  handleSubmitReplyComment() {

  }


  focusTextAriaComment() {
    this.textareaComment.nativeElement.focus();
  }

  focusTextAriaReplyComment() {
    this.textareaReply.nativeElement.focus();
  }

}
